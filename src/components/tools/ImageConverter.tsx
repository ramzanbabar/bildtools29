'use client';

import { useState, useCallback, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Upload, Download, RotateCcw, Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  loadImage, 
  convertImage, 
  formatFileSize, 
  isHeicFile,
  type ImageDimensions 
} from '@/lib/image-utils';

interface ImageConverterProps {
  defaultTargetFormat?: string;
}

const formatOptions = [
  { value: 'image/png', label: 'PNG' },
  { value: 'image/jpeg', label: 'JPG' },
  { value: 'image/webp', label: 'WebP' },
  { value: 'image/gif', label: 'GIF' },
  { value: 'image/bmp', label: 'BMP' },
];

export function ImageConverter({ defaultTargetFormat = 'image/png' }: ImageConverterProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [dimensions, setDimensions] = useState<ImageDimensions | null>(null);
  const [targetFormat, setTargetFormat] = useState(defaultTargetFormat);
  const [quality, setQuality] = useState(92);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
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
    setIsHeic(isHeicFile(selectedFile));
    setLoading(true);

    try {
      // Load image (handles HEIC conversion internally)
      const img = await loadImage(selectedFile);
      setDimensions({ width: img.width, height: img.height });
      
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFile(droppedFile);
  }, [handleFile]);

  const handleConvert = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const processed = await convertImage(file, targetFormat, quality / 100);
      setResult(processed.dataUrl);
      setResultBlob(processed.blob);
    } catch (err) {
      setError('Fehler bei der Konvertierung. Bitte versuchen Sie es erneut.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!resultBlob) return;
    
    const extMap: Record<string, string> = {
      'image/png': 'png',
      'image/jpeg': 'jpg',
      'image/webp': 'webp',
      'image/gif': 'gif',
      'image/bmp': 'bmp',
    };
    const ext = extMap[targetFormat] || 'png';
    const originalName = file?.name?.replace(/\.[^/.]+$/, '') || 'image';
    const filename = `${originalName}.${ext}`;
    
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
    setDimensions(null);
    setError(null);
    setIsHeic(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const needsTransparency = targetFormat === 'image/jpeg' || targetFormat === 'image/bmp';

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        {/* Upload Area */}
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
              onChange={handleFileChange}
              className="hidden"
            />
            <Button variant="outline" type="button" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
              Datei auswählen
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Preview */}
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
                    <img src={preview} alt="Original" className="max-w-full max-h-full object-contain" />
                  ) : null}
                </div>
                {dimensions && (
                  <p className="text-xs text-muted-foreground">
                    {dimensions.width} × {dimensions.height} px • {formatFileSize(file.size)}
                  </p>
                )}
              </div>
              
              {result && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Konvertiert</p>
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                    <img src={result} alt="Result" className="max-w-full max-h-full object-contain" />
                  </div>
                  {resultBlob && (
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(resultBlob.size)}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Settings */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Zielformat</Label>
                <Select value={targetFormat} onValueChange={setTargetFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {formatOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {(targetFormat === 'image/jpeg' || targetFormat === 'image/webp') && (
                <div className="space-y-2">
                  <Label>Qualität: {quality}%</Label>
                  <Slider
                    value={[quality]}
                    onValueChange={([v]) => setQuality(v)}
                    min={10}
                    max={100}
                    step={1}
                  />
                </div>
              )}
            </div>

            {needsTransparency && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {targetFormat === 'image/jpeg' ? 'JPG' : 'BMP'} unterstützt keine Transparenz. Transparente Bereiche werden weiß.
                </AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleConvert} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Konvertiere...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Konvertieren
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
