'use client';

import { useState, useCallback, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, Download, RotateCcw, AlertCircle, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { loadImage, resizeImage, formatFileSize, isHeicFile } from '@/lib/image-utils';

export function FaviconGenerator() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isHeic, setIsHeic] = useState(false);
  const [generatedSizes, setGeneratedSizes] = useState<{ size: number; url: string }[]>([]);
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
    setGeneratedSizes([]);
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

  const generateFavicons = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const sizes = [16, 32, 48, 64, 180, 192, 512];
      const generated: { size: number; url: string }[] = [];

      for (const size of sizes) {
        const result = await resizeImage(file, size, size, true, 'image/png', 1);
        generated.push({ size, url: result.dataUrl });
      }

      setGeneratedSizes(generated);
    } catch (err) {
      setError('Fehler beim Generieren der Favicons.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadAll = () => {
    generatedSizes.forEach(({ size, url }) => {
      const a = document.createElement('a');
      a.href = url;
      a.download = size === 180 ? 'apple-touch-icon.png' : `favicon-${size}x${size}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  };

  const copyHtmlCode = () => {
    const html = `<!-- Favicon -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#ffffff">`;
    navigator.clipboard.writeText(html);
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setGeneratedSizes([]);
    setError(null);
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
            <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">Logo oder Bild hochladen</p>
            <p className="text-sm text-muted-foreground mb-4">
              Empfohlen: Quadratisches Bild, mindestens 512x512 Pixel
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
                <div className="aspect-square max-w-xs bg-muted rounded-lg overflow-hidden flex items-center justify-center">
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
                </div>
                <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
              </div>

              {generatedSizes.length > 0 && (
                <div className="space-y-4">
                  <p className="text-sm font-medium">Generierte Größen</p>
                  <div className="grid grid-cols-4 gap-4">
                    {generatedSizes.map(({ size, url }) => (
                      <div key={size} className="text-center">
                        <div className="aspect-square bg-muted rounded-lg overflow-hidden flex items-center justify-center p-2">
                          <img src={url} alt={`${size}x${size}`} className="max-w-full max-h-full" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{size}px</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button onClick={generateFavicons} disabled={loading}>
                {loading ? 'Generiere...' : 'Favicons generieren'}
              </Button>
              {generatedSizes.length > 0 && (
                <>
                  <Button variant="default" onClick={downloadAll}>
                    <Download className="h-4 w-4 mr-2" />
                    Alle herunterladen
                  </Button>
                  <Button variant="outline" onClick={copyHtmlCode}>
                    HTML-Code kopieren
                  </Button>
                </>
              )}
              <Button variant="outline" onClick={handleReset}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Zurücksetzen
              </Button>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
