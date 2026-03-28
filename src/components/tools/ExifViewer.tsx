'use client';

import { useState, useCallback, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, RotateCcw, AlertCircle, FileText } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { formatFileSize } from '@/lib/image-utils';

interface ExifData {
  [key: string]: {
    [key: string]: string;
  };
}

export function ExifViewer() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [exifData, setExifData] = useState<ExifData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/')) {
      setError('Bitte wählen Sie eine Bilddatei aus.');
      return;
    }

    setFile(selectedFile);
    setError(null);
    setExifData(null);

    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(selectedFile);

    // Read EXIF data (simplified - in production use exif-js library)
    try {
      const buffer = await selectedFile.arrayBuffer();
      const view = new DataView(buffer);
      
      // Check for JPEG
      if (view.getUint16(0) !== 0xFFD8) {
        setExifData({
          'Datei-Informationen': {
            'Dateiname': selectedFile.name,
            'Dateigröße': formatFileSize(selectedFile.size),
            'Dateityp': selectedFile.type,
            'Zuletzt geändert': new Date(selectedFile.lastModified).toLocaleString('de-DE')
          }
        });
        return;
      }

      // Parse basic EXIF (simplified)
      const data: ExifData = {
        'Datei-Informationen': {
          'Dateiname': selectedFile.name,
          'Dateigröße': formatFileSize(selectedFile.size),
          'Dateityp': selectedFile.type,
          'Zuletzt geändert': new Date(selectedFile.lastModified).toLocaleString('de-DE')
        }
      };

      // Look for EXIF marker
      let offset = 2;
      while (offset < view.byteLength) {
        if (view.getUint16(offset) === 0xFFE1) {
          // Found APP1 marker (EXIF)
          data['Hinweis'] = {
            'Info': 'EXIF-Daten gefunden. Für vollständige Anzeige wird eine EXIF-Bibliothek benötigt.'
          };
          break;
        }
        offset += 2 + view.getUint16(offset + 2);
      }

      setExifData(data);
    } catch (err) {
      setError('Fehler beim Lesen der EXIF-Daten.');
      console.error(err);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFile(droppedFile);
  }, [handleFile]);

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setExifData(null);
    setError(null);
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
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">Bild hochladen</p>
            <p className="text-sm text-muted-foreground mb-4">
              Zeigen Sie EXIF-Metadaten Ihrer Fotos an
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
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
                <p className="text-sm font-medium">Bildvorschau</p>
                <div className="aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                  {preview && (
                    <img src={preview} alt="Preview" className="max-w-full max-h-full object-contain" />
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-medium">Metadaten</p>
                
                {exifData && (
                  <div className="space-y-4 max-h-80 overflow-auto">
                    {Object.entries(exifData).map(([category, data]) => (
                      <div key={category} className="space-y-2">
                        <p className="text-sm font-semibold text-primary">{category}</p>
                        <div className="bg-muted rounded-lg p-3 space-y-1">
                          {Object.entries(data).map(([key, value]) => (
                            <div key={key} className="flex justify-between text-sm">
                              <span className="text-muted-foreground">{key}:</span>
                              <span className="font-mono">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
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
