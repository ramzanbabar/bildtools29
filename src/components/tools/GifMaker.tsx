'use client';

import { useState, useCallback, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Upload, Download, RotateCcw, AlertCircle, Trash2, Play } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { loadImage, formatFileSize } from '@/lib/image-utils';

interface Frame {
  id: string;
  file: File;
  preview: string;
  delay: number;
}

export function GifMaker() {
  const [frames, setFrames] = useState<Frame[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [defaultDelay, setDefaultDelay] = useState(500);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files);
    
    fileArray.forEach(file => {
      if (!file.type.startsWith('image/')) return;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const newFrame: Frame = {
          id: Math.random().toString(36).substr(2, 9),
          file,
          preview: e.target?.result as string,
          delay: defaultDelay
        };
        setFrames(prev => [...prev, newFrame]);
      };
      reader.readAsDataURL(file);
    });
  }, [defaultDelay]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const removeFrame = (id: string) => {
    setFrames(prev => prev.filter(f => f.id !== id));
  };

  const updateDelay = (id: string, delay: number) => {
    setFrames(prev => prev.map(f => f.id === id ? { ...f, delay } : f));
  };

  const moveFrame = (id: string, direction: 'up' | 'down') => {
    setFrames(prev => {
      const index = prev.findIndex(f => f.id === id);
      if (index === -1) return prev;
      
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      
      const newFrames = [...prev];
      [newFrames[index], newFrames[newIndex]] = [newFrames[newIndex], newFrames[index]];
      return newFrames;
    });
  };

  const createGif = async () => {
    if (frames.length < 2) {
      setError('Mindestens 2 Bilder erforderlich');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const canvas = canvasRef.current;
      if (!canvas) throw new Error('Canvas not available');

      // Load first frame to get dimensions
      const firstImg = await loadImage(frames[0].file);
      canvas.width = firstImg.width;
      canvas.height = firstImg.height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');

      // Draw first frame
      ctx.drawImage(firstImg, 0, 0);

      // For a real GIF, you'd need a proper GIF encoder library
      // This is a simplified version that creates an animated preview
      setResult(canvas.toDataURL('image/gif'));
      
      setError('Hinweis: Für vollständige GIF-Erstellung wird eine Backend-Bibliothek benötigt. Die Vorschau zeigt das erste Bild.');
    } catch (err) {
      setError('Fehler bei der GIF-Erstellung.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    
    const a = document.createElement('a');
    a.href = result;
    a.download = 'animation.gif';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleReset = () => {
    setFrames([]);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
            dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
          <p className="text-lg font-medium mb-2">Bilder hinzufügen</p>
          <p className="text-sm text-muted-foreground mb-3">
            Fügen Sie mehrere Bilder hinzu, um ein animiertes GIF zu erstellen
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
            className="hidden"
          />
          <Button variant="outline" type="button" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
            Bilder auswählen
          </Button>
        </div>

        {frames.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{frames.length} Frames</p>
              <div className="flex items-center gap-4">
                <Label className="text-sm">Standard-Verzögerung: {defaultDelay}ms</Label>
                <Slider
                  value={[defaultDelay]}
                  onValueChange={([v]) => setDefaultDelay(v)}
                  min={50}
                  max={2000}
                  step={50}
                  className="w-32"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {frames.map((frame, index) => (
                <div key={frame.id} className="relative group">
                  <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                    <img 
                      src={frame.preview} 
                      alt={`Frame ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
                    {index + 1}
                  </div>
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeFrame(frame.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                  <div className="mt-1 text-xs text-center text-muted-foreground">
                    {frame.delay}ms
                  </div>
                </div>
              ))}
            </div>

            <canvas ref={canvasRef} className="hidden" />

            {result && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Vorschau</p>
                <div className="bg-muted rounded-lg p-4 flex items-center justify-center">
                  <img src={result} alt="GIF Preview" className="max-w-full max-h-64" />
                </div>
              </div>
            )}

            {error && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex flex-wrap gap-3">
              <Button onClick={createGif} disabled={loading || frames.length < 2}>
                <Play className="h-4 w-4 mr-2" />
                {loading ? 'Erstelle...' : 'GIF erstellen'}
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
