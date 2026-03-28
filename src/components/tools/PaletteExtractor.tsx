'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Upload, Download, RotateCcw, AlertCircle, Palette, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { loadImage, extractColors, formatFileSize, isHeicFile } from '@/lib/image-utils';

interface ExtractedColor {
  hex: string;
  percentage: number;
}

export function PaletteExtractor() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [colors, setColors] = useState<ExtractedColor[]>([]);
  const [colorCount, setColorCount] = useState(6);
  const [loading, setLoading] = useState(false);
  const [isHeic, setIsHeic] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (selectedFile: File) => {
    // Check if it's a valid image file (including HEIC)
    const isValidImage = selectedFile.type.startsWith('image/') || isHeicFile(selectedFile);
    if (!isValidImage) {
      setError('Bitte wählen Sie eine Bilddatei aus.');
      return;
    }

    setFile(selectedFile);
    setError(null);
    setColors([]);
    setIsHeic(isHeicFile(selectedFile));
    setLoading(true);

    try {
      // Load image (handles HEIC conversion internally)
      const img = await loadImage(selectedFile);
      
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

  const handleExtract = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const extractedColors = await extractColors(file, colorCount);
      setColors(extractedColors.map((hex, i) => ({
        hex,
        percentage: Math.round(100 / colorCount)
      })));
    } catch (err) {
      setError('Fehler beim Extrahieren der Farben.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyPalette = () => {
    const css = colors.map((c, i) => `--color-${i + 1}: ${c.hex};`).join('\n');
    navigator.clipboard.writeText(css);
    setCopied('css');
    setTimeout(() => setCopied(null), 2000);
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setError(null);
    setColors([]);
    setIsHeic(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const downloadPalette = () => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${colors.length * 100}" height="100">
      ${colors.map((c, i) => `<rect x="${i * 100}" y="0" width="100" height="100" fill="${c.hex}"/>`).join('')}
    </svg>`;
    
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'palette.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (preview && canvasRef.current) {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (canvas) {
          const maxWidth = 600;
          const scale = Math.min(1, maxWidth / img.width);
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          }
        }
      };
      img.src = preview;
    }
  }, [preview]);

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
            <Palette className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">Bild hochladen</p>
            <p className="text-sm text-muted-foreground mb-4">
              Extrahieren Sie dominante Farben aus Ihrem Bild
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
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  Original {isHeic && <span className="text-primary">(HEIC)</span>}
                </p>
                <div className="border rounded-lg overflow-hidden">
                  {loading ? (
                    <div className="aspect-video bg-muted flex items-center justify-center">
                      <div className="flex flex-col items-center gap-2">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <span className="text-sm text-muted-foreground">
                          {isHeic ? 'Konvertiere HEIC...' : 'Laden...'}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <canvas ref={canvasRef} className="max-w-full h-auto" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Anzahl der Farben: {colorCount}</Label>
                  <Input
                    type="range"
                    min={3}
                    max={10}
                    value={colorCount}
                    onChange={(e) => setColorCount(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <Button onClick={handleExtract} disabled={loading} className="w-full">
                  <Palette className="h-4 w-4 mr-2" />
                  {loading ? 'Extrahiere...' : 'Farben extrahieren'}
                </Button>

                {colors.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex h-12 rounded-lg overflow-hidden">
                      {colors.map((color, i) => (
                        <div
                          key={i}
                          className="flex-1"
                          style={{ backgroundColor: color.hex }}
                          title={color.hex}
                        />
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {colors.map((color, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 p-2 bg-muted rounded cursor-pointer hover:bg-muted/80"
                          onClick={() => {
                            navigator.clipboard.writeText(color.hex);
                            setCopied(color.hex);
                            setTimeout(() => setCopied(null), 2000);
                          }}
                        >
                          <div
                            className="w-8 h-8 rounded border"
                            style={{ backgroundColor: color.hex }}
                          />
                          <code className="text-sm">{color.hex}</code>
                          {copied === color.hex && (
                            <span className="text-xs text-green-600">Kopiert!</span>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" onClick={copyPalette} className="flex-1">
                        CSS kopieren
                      </Button>
                      <Button variant="outline" onClick={downloadPalette} className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Zurücksetzen
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
