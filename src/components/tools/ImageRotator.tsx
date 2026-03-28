'use client';

import { useState, useCallback, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Upload, Download, RotateCcw, Loader2, AlertCircle, RotateCw, FlipHorizontal, FlipVertical } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { loadImage, rotateImage, flipImage, formatFileSize, isHeicFile } from '@/lib/image-utils';

export function ImageRotator() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [isHeic, setIsHeic] = useState(false);
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
    setResult(null);
    setResultBlob(null);
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
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

  const handleTransform = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      let processed;
      
      if (rotation !== 0) {
        processed = await rotateImage(file, rotation);
        if (processed.blob) {
          const newFile = new File([processed.blob], file.name, { type: file.type });
          if (flipH || flipV) {
            processed = await flipImage(newFile, flipH, flipV);
          }
        }
      } else if (flipH || flipV) {
        processed = await flipImage(file, flipH, flipV);
      } else {
        // No transformation, just use original
        const reader = new FileReader();
        const dataUrl = await new Promise<string>((resolve) => {
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(file);
        });
        processed = { dataUrl, blob: file, dimensions: { width: 0, height: 0 }, size: file.size };
      }
      
      setResult(processed.dataUrl);
      setResultBlob(processed.blob);
    } catch (err) {
      setError('Fehler bei der Transformation. Bitte versuchen Sie es erneut.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!resultBlob) return;
    
    const ext = file?.name?.split('.').pop() || 'png';
    const originalName = file?.name?.replace(/\.[^/.]+$/, '') || 'image';
    const filename = `${originalName}-transformed.${ext}`;
    
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
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
    setIsHeic(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const quickRotate = (degrees: number) => {
    setRotation((prev) => (prev + degrees) % 360);
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
                  Original {isHeic && <span className="text-primary">(HEIC)</span>}
                </p>
                <div className="aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                  {loading ? (
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <span className="text-sm text-muted-foreground">
                        {isHeic ? 'Konvertiere HEIC...' : 'Laden...'}
                      </span>
                    </div>
                  ) : preview ? (
                    <img 
                      src={preview} 
                      alt="Original" 
                      className="max-w-full max-h-full object-contain"
                      style={{
                        transform: `rotate(${rotation}deg) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})`
                      }}
                    />
                  ) : null}
                </div>
                <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
              </div>
              
              {result && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Transformiert</p>
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                    <img src={result} alt="Result" className="max-w-full max-h-full object-contain" />
                  </div>
                  {resultBlob && (
                    <p className="text-xs text-muted-foreground">{formatFileSize(resultBlob.size)}</p>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Drehung: {rotation}°</Label>
                <Slider
                  value={[rotation]}
                  onValueChange={([v]) => setRotation(v)}
                  min={0}
                  max={360}
                  step={1}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => quickRotate(90)}>
                  <RotateCw className="h-4 w-4 mr-1" />
                  +90°
                </Button>
                <Button variant="outline" size="sm" onClick={() => quickRotate(-90)}>
                  <RotateCw className="h-4 w-4 mr-1 scale-x-[-1]" />
                  -90°
                </Button>
                <Button variant="outline" size="sm" onClick={() => setRotation(180)}>180°</Button>
                <Button variant="outline" size="sm" onClick={() => setRotation(0)}>Zurücksetzen</Button>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button variant={flipH ? 'default' : 'outline'} onClick={() => setFlipH(!flipH)}>
                  <FlipHorizontal className="h-4 w-4 mr-2" />
                  Horizontal spiegeln
                </Button>
                <Button variant={flipV ? 'default' : 'outline'} onClick={() => setFlipV(!flipV)}>
                  <FlipVertical className="h-4 w-4 mr-2" />
                  Vertikal spiegeln
                </Button>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex flex-wrap gap-3">
              <Button onClick={handleTransform} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Transformiere...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Anwenden
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
