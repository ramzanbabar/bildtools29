// Image Processing Utilities for BildTools
// All processing happens client-side using Canvas API

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface ProcessedImage {
  blob: Blob;
  dataUrl: string;
  dimensions: ImageDimensions;
  size: number;
}

/**
 * Check if file is HEIC/HEIF format
 */
export function isHeicFile(file: File): boolean {
  const heicTypes = ['image/heic', 'image/heif', 'image/heic-sequence', 'image/heif-sequence'];
  return heicTypes.includes(file.type.toLowerCase()) || 
         file.name.toLowerCase().endsWith('.heic') ||
         file.name.toLowerCase().endsWith('.heif');
}

/**
 * Convert HEIC to JPEG/PNG (client-side only)
 */
async function convertHeicToSupported(file: File): Promise<File> {
  // Dynamic import to avoid SSR issues
  const heic2any = (await import('heic2any')).default;
  
  try {
    const convertedBlob = await heic2any({
      blob: file,
      toType: 'image/jpeg',
      quality: 0.95
    });
    
    const newName = file.name.replace(/\.(heic|heif)$/i, '.jpg');
    return new File([convertedBlob], newName, { type: 'image/jpeg' });
  } catch (error) {
    console.error('HEIC conversion failed:', error);
    throw new Error('HEIC-Konvertierung fehlgeschlagen. Bitte versuchen Sie eine andere Datei.');
  }
}

/**
 * Load an image file and return Image element
 * Handles HEIC files by converting them first
 */
export async function loadImage(file: File): Promise<HTMLImageElement> {
  // Convert HEIC files first (client-side only)
  let processedFile = file;
  if (typeof window !== 'undefined' && isHeicFile(file)) {
    processedFile = await convertHeicToSupported(file);
  }
  
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(processedFile);
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };
    
    img.src = url;
  });
}

/**
 * Get image dimensions
 */
export async function getImageDimensions(file: File): Promise<ImageDimensions> {
  const img = await loadImage(file);
  return { width: img.width, height: img.height };
}

/**
 * Convert canvas to blob
 */
export function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality = 0.92): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Failed to convert canvas to blob'));
      },
      type,
      quality
    );
  });
}

/**
 * Create canvas with image
 */
export function createCanvasFromImage(img: HTMLImageElement): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get canvas context');
  
  ctx.drawImage(img, 0, 0);
  return canvas;
}

/**
 * Convert image to different format
 */
export async function convertImage(
  file: File,
  targetType: string,
  quality = 0.92,
  backgroundColor = '#ffffff'
): Promise<ProcessedImage> {
  const img = await loadImage(file);
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get canvas context');
  
  // Fill background for formats that don't support transparency
  if (targetType === 'image/jpeg' || targetType === 'image/bmp') {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  
  ctx.drawImage(img, 0, 0);
  
  const dataUrl = canvas.toDataURL(targetType, quality);
  const blob = await canvasToBlob(canvas, targetType, quality);
  
  return {
    blob,
    dataUrl,
    dimensions: { width: img.width, height: img.height },
    size: blob.size
  };
}

/**
 * Resize image
 */
export async function resizeImage(
  file: File,
  targetWidth: number,
  targetHeight: number,
  maintainAspectRatio = true,
  targetType?: string,
  quality = 0.92
): Promise<ProcessedImage> {
  const img = await loadImage(file);
  
  let newWidth = targetWidth;
  let newHeight = targetHeight;
  
  if (maintainAspectRatio) {
    const aspectRatio = img.width / img.height;
    if (targetWidth / targetHeight > aspectRatio) {
      newWidth = targetHeight * aspectRatio;
    } else {
      newHeight = targetWidth / aspectRatio;
    }
  }
  
  newWidth = Math.round(newWidth);
  newHeight = Math.round(newHeight);
  
  const canvas = document.createElement('canvas');
  canvas.width = newWidth;
  canvas.height = newHeight;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get canvas context');
  
  // Use high-quality image smoothing
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  
  ctx.drawImage(img, 0, 0, newWidth, newHeight);
  
  const outputType = targetType || file.type || 'image/png';
  const dataUrl = canvas.toDataURL(outputType, quality);
  const blob = await canvasToBlob(canvas, outputType, quality);
  
  return {
    blob,
    dataUrl,
    dimensions: { width: newWidth, height: newHeight },
    size: blob.size
  };
}

/**
 * Compress image
 */
export async function compressImage(
  file: File,
  quality = 0.8,
  maxDimensions?: { width: number; height: number }
): Promise<ProcessedImage> {
  const img = await loadImage(file);
  
  let targetWidth = img.width;
  let targetHeight = img.height;
  
  if (maxDimensions) {
    if (img.width > maxDimensions.width || img.height > maxDimensions.height) {
      const aspectRatio = img.width / img.height;
      if (img.width > maxDimensions.width) {
        targetWidth = maxDimensions.width;
        targetHeight = maxDimensions.width / aspectRatio;
      }
      if (targetHeight > maxDimensions.height) {
        targetHeight = maxDimensions.height;
        targetWidth = maxDimensions.height * aspectRatio;
      }
    }
  }
  
  targetWidth = Math.round(targetWidth);
  targetHeight = Math.round(targetHeight);
  
  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get canvas context');
  
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
  
  // Use appropriate output type
  const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
  const dataUrl = canvas.toDataURL(outputType, quality);
  const blob = await canvasToBlob(canvas, outputType, quality);
  
  return {
    blob,
    dataUrl,
    dimensions: { width: targetWidth, height: targetHeight },
    size: blob.size
  };
}

/**
 * Crop image
 */
export async function cropImage(
  file: File,
  x: number,
  y: number,
  width: number,
  height: number,
  targetType?: string,
  quality = 0.92
): Promise<ProcessedImage> {
  const img = await loadImage(file);
  
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get canvas context');
  
  ctx.drawImage(img, x, y, width, height, 0, 0, width, height);
  
  const outputType = targetType || file.type || 'image/png';
  const dataUrl = canvas.toDataURL(outputType, quality);
  const blob = await canvasToBlob(canvas, outputType, quality);
  
  return {
    blob,
    dataUrl,
    dimensions: { width, height },
    size: blob.size
  };
}

/**
 * Rotate image
 */
export async function rotateImage(
  file: File,
  angle: number,
  backgroundColor = '#ffffff',
  targetType?: string,
  quality = 0.92
): Promise<ProcessedImage> {
  const img = await loadImage(file);
  
  const radians = (angle * Math.PI) / 180;
  const sin = Math.abs(Math.sin(radians));
  const cos = Math.abs(Math.cos(radians));
  
  const newWidth = Math.round(img.width * cos + img.height * sin);
  const newHeight = Math.round(img.width * sin + img.height * cos);
  
  const canvas = document.createElement('canvas');
  canvas.width = newWidth;
  canvas.height = newHeight;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get canvas context');
  
  // Fill background
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, newWidth, newHeight);
  
  // Rotate around center
  ctx.translate(newWidth / 2, newHeight / 2);
  ctx.rotate(radians);
  ctx.drawImage(img, -img.width / 2, -img.height / 2);
  
  const outputType = targetType || file.type || 'image/png';
  const dataUrl = canvas.toDataURL(outputType, quality);
  const blob = await canvasToBlob(canvas, outputType, quality);
  
  return {
    blob,
    dataUrl,
    dimensions: { width: newWidth, height: newHeight },
    size: blob.size
  };
}

/**
 * Flip image
 */
export async function flipImage(
  file: File,
  horizontal: boolean,
  vertical: boolean,
  targetType?: string,
  quality = 0.92
): Promise<ProcessedImage> {
  const img = await loadImage(file);
  
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get canvas context');
  
  // Apply transformations
  ctx.translate(
    horizontal ? img.width : 0,
    vertical ? img.height : 0
  );
  ctx.scale(
    horizontal ? -1 : 1,
    vertical ? -1 : 1
  );
  
  ctx.drawImage(img, 0, 0);
  
  const outputType = targetType || file.type || 'image/png';
  const dataUrl = canvas.toDataURL(outputType, quality);
  const blob = await canvasToBlob(canvas, outputType, quality);
  
  return {
    blob,
    dataUrl,
    dimensions: { width: img.width, height: img.height },
    size: blob.size
  };
}

/**
 * Extract colors from image
 */
export async function extractColors(file: File, colorCount = 5): Promise<string[]> {
  const img = await loadImage(file);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) throw new Error('Failed to get canvas context');
  
  // Use small canvas for performance
  const sampleSize = 100;
  canvas.width = sampleSize;
  canvas.height = sampleSize;
  ctx.drawImage(img, 0, 0, sampleSize, sampleSize);
  
  const imageData = ctx.getImageData(0, 0, sampleSize, sampleSize);
  const pixels = imageData.data;
  
  // Simple color clustering
  const colorMap = new Map<string, number>();
  
  for (let i = 0; i < pixels.length; i += 4) {
    // Quantize colors
    const r = Math.round(pixels[i] / 32) * 32;
    const g = Math.round(pixels[i + 1] / 32) * 32;
    const b = Math.round(pixels[i + 2] / 32) * 32;
    const key = `${r},${g},${b}`;
    colorMap.set(key, (colorMap.get(key) || 0) + 1);
  }
  
  // Sort by frequency and return top colors
  const sortedColors = [...colorMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, colorCount)
    .map(([key]) => {
      const [r, g, b] = key.split(',').map(Number);
      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    });
  
  return sortedColors;
}

/**
 * Parse SVG to canvas
 */
export async function svgToCanvas(file: File, width?: number, height?: number): Promise<HTMLCanvasElement> {
  const text = await file.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, 'image/svg+xml');
  const svg = doc.querySelector('svg');
  
  if (!svg) throw new Error('Invalid SVG file');
  
  // Get dimensions
  const viewBox = svg.getAttribute('viewBox');
  let svgWidth = width || parseInt(svg.getAttribute('width') || '100');
  let svgHeight = height || parseInt(svg.getAttribute('height') || '100');
  
  if (viewBox) {
    const parts = viewBox.split(' ').map(Number);
    if (parts.length === 4) {
      const aspectRatio = (parts[2] - parts[0]) / (parts[3] - parts[1]);
      if (width && !height) {
        svgHeight = width / aspectRatio;
      } else if (height && !width) {
        svgWidth = height * aspectRatio;
      }
    }
  }
  
  // Create image from SVG
  const svgBlob = new Blob([text], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);
  
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      
      const canvas = document.createElement('canvas');
      canvas.width = svgWidth;
      canvas.height = svgHeight;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }
      
      ctx.drawImage(img, 0, 0, svgWidth, svgHeight);
      resolve(canvas);
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load SVG'));
    };
    
    img.src = url;
  });
}

/**
 * Convert SVG to image
 */
export async function svgToImage(
  file: File,
  targetType: string,
  width?: number,
  height?: number,
  quality = 0.92,
  backgroundColor?: string
): Promise<ProcessedImage> {
  const canvas = await svgToCanvas(file, width, height);
  
  // Add background if needed
  if (backgroundColor && targetType === 'image/jpeg') {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.putImageData(imageData, 0, 0);
    }
  }
  
  const dataUrl = canvas.toDataURL(targetType, quality);
  const blob = await canvasToBlob(canvas, targetType, quality);
  
  return {
    blob,
    dataUrl,
    dimensions: { width: canvas.width, height: canvas.height },
    size: blob.size
  };
}

/**
 * Optimize SVG
 */
export async function optimizeSvg(file: File): Promise<{ content: string; originalSize: number; optimizedSize: number }> {
  const content = await file.text();
  const originalSize = content.length;
  
  // Basic SVG optimizations
  let optimized = content
    // Remove comments
    .replace(/<!--[\s\S]*?-->/g, '')
    // Remove XML declaration
    .replace(/<\?xml[\s\S]*?\?>/g, '')
    // Remove doctype
    .replace(/<!DOCTYPE[\s\S]*?>/g, '')
    // Remove unnecessary whitespace
    .replace(/\s+/g, ' ')
    // Remove spaces around tags
    .replace(/>\s+</g, '><')
    // Remove unnecessary namespace declarations
    .replace(/\sxmlns:xlink="[^"]*"/g, '')
    // Simplify paths (basic)
    .replace(/\s+/g, ' ')
    .trim();
  
  return {
    content: optimized,
    originalSize,
    optimizedSize: optimized.length
  };
}

/**
 * Format file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Get file extension from type
 */
export function getExtensionFromType(type: string): string {
  const map: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
    'image/svg+xml': 'svg',
    'image/bmp': 'bmp',
    'image/tiff': 'tiff'
  };
  return map[type] || 'png';
}
