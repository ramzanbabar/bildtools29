'use client';

import { useState, useCallback, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Download, RotateCcw, Loader2, AlertCircle, Move } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { loadImage, cropImage, formatFileSize, isHeicFile } from '@/lib/image-utils';

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

const aspectRatios = [
  { value: 'free', label: 'Frei' },
  { value: '1:1', label: '1:1 (Quadrat)' },
  { value: '4:3', label: '4:3' },
  { value: '16:9', label: '16:9' },
  { value: '3:2', label: '3:2' },
  { value: '2:3', label: '2:3 (Portrait)' },
];

export function ImageCropper() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [aspectRatio, setAspectRatio] = useState('free');
  const [cropArea, setCropArea] = useState<CropArea>({ x: 0, y: 0, width: 100, height: 100 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isHeic, setIsHeic] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFile = useCallback(async (selectedFile: File) => {
    // Check if it's a valid image file (including HEIC)
    const isValidImage = selectedFile.type.startsWith('image/') || isHeicFile(selectedFile);
    if (!isValidImage) {
      setError('Bitte wählen Sie eine Bilddatei aus.');
      return;
    }

    setFile(selectedFile);
    setError(null);
    setResult(null);
    setResultBlob(null);
    setIsHeic(isHeicFile(selectedFile));
    setLoading(true);

    try {
      // Load image (handles HEIC conversion internally)
      const img = await loadImage(selectedFile);
      setImageSize({ width: img.width, height: img.height });
      setCropArea({ x: 0, y: 0, width: img.width, height: img.height });
      
      // Create preview from the loaded image
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        setPreview(canvas.toDataURL('image/jpeg', 0.9));
      }
    } catch (err) {
      setError('Fehler beim Laden des Bildes. Bitte versuchen Sie eine andere Datei.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFile(droppedFile);
  }, [handleFile]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * imageSize.width;
    const y = ((e.clientY - rect.top) / rect.height) * imageSize.height;
    setDragStart({ x, y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * imageSize.width;
    const y = ((e.clientY - rect.top) / rect.height) * imageSize.height;
    
    const newCrop: CropArea = {
      x: Math.min(dragStart.x, x),
      y: Math.min(dragStart.y, y),
      width: Math.abs(x - dragStart.x),
      height: Math.abs(y - dragStart.y),
    };
    
    if (aspectRatio !== 'free') {
      const [w, h] = aspectRatio.split(':').map(Number);
      newCrop.height = newCrop.width * (h / w);
    }
    
    setCropArea(newCrop);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleCrop = async () => {
    if (!file || cropArea.width <= 0 || cropArea.height <= 0) return;

    setLoading(true);
    setError(null);

    try {
      const processed = await cropImage(
        file,
        Math.round(cropArea.x),
        Math.round(cropArea.y),
        Math.round(cropArea.width),
        Math.round(cropArea.height)
      );
      setResult(processed.dataUrl);
      setResultBlob(processed.blob);
    } catch (err) {
      setError('Fehler beim Zuschneiden. Bitte versuchen Sie es erneut.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!resultBlob) return;
    
    const ext = file?.name?.split('.').pop() || 'png';
    const originalName = file?.name?.replace(/\.[^/.]+$/, '') || 'image';
    const filename = `${originalName}-cropped.${ext}`;
    
    const url = URL.createObjectURL(resultBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setResultBlob(null);
    setError(null);
    setCropArea({ x: 0, y: 0, width: 100, height: 100 });
    setIsHeic(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        {!file ? (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
              dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'
            }`}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">Bild hochladen</p>
            <p className="text-sm text-muted-foreground mb-4">
              Ziehen Sie ein Bild hierher oder klicken Sie zum Auswählen
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.heic,.heif"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              className="hidden"
            />
            <Button variant="outline" type="button" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
              Datei auswählen
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  Original (Zuschneidebereich ziehen) {isHeic && <span className="text-primary">(HEIC)</span>}
                </p>
                <div 
                  ref={containerRef}
                  className="aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center relative cursor-crosshair"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  {loading ? (
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <span className="text-sm text-muted-foreground">
                        {isHeic ? 'Konvertiere HEIC...' : 'Laden...'}
                      </span>
                    </div>
                  ) : preview ? (
                    <img src={preview} alt="Original" className="max-w-full max-h-full object-contain" />
                  ) : null}
                  {cropArea.width > 0 && cropArea.height > 0 && (
                    <div 
                      className="absolute border-2 border-primary bg-primary/10 pointer-events-none"
                      style={{
                        left: `${(cropArea.x / imageSize.width) * 100}%`,
                        top: `${(cropArea.y / imageSize.height) * 100}%`,
                        width: `${(cropArea.width / imageSize.width) * 100}%`,
                        height: `${(cropArea.height / imageSize.height) * 100}%`,
                      }}
                    />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {imageSize.width} × {imageSize.height} px • {formatFileSize(file.size)}
                </p>
              </div>
              
              {result && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Zugeschnitten</p>
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                    <img src={result} alt="Result" className="max-w-full max-h-full object-contain" />
                  </div>
                  {resultBlob && (
                    <p className="text-xs text-muted-foreground">
                      {Math.round(cropArea.width)} × {Math.round(cropArea.height)} px • {formatFileSize(resultBlob.size)}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Seitenverhältnis</Label>
                <Select value={aspectRatio} onValueChange={setAspectRatio}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {aspectRatios.map((ratio) => (
                      <SelectItem key={ratio.value} value={ratio.value}>
                        {ratio.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <Move className="h-4 w-4" />
                Klicken und ziehen Sie im Bild, um den Zuschneidebereich zu wählen
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex flex-wrap gap-3">
              <Button onClick={handleCrop} disabled={loading || cropArea.width <= 0 || cropArea.height <= 0}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Schneide zu...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Zuschneiden
                  </>
                )}
              </Button>
              
              {result && (
                <Button variant="default" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Herunterladen
                </Button>
              )}
              
              <Button variant="outline" onClick={handleReset}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Zurücksetzen
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
