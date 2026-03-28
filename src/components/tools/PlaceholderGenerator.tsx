'use client';

import { useState, useCallback, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Download, RotateCcw, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function PlaceholderGenerator() {
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(300);
  const [text, setText] = useState('');
  const [bgColor, setBgColor] = useState('#6366f1');
  const [textColor, setTextColor] = useState('#ffffff');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generatePlaceholder = useCallback(() => {
    if (width <= 0 || height <= 0) {
      setError('Bitte geben Sie gültige Abmessungen ein.');
      return;
    }

    if (width > 4000 || height > 4000) {
      setError('Maximale Abmessungen: 4000x4000 Pixel.');
      return;
    }

    setError(null);

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      setError('Fehler beim Erstellen des Platzhalters.');
      return;
    }

    // Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    // Text
    const displayText = text || `${width} × ${height}`;
    const fontSize = Math.min(width, height) / 8;
    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(displayText, width / 2, height / 2);

    setResult(canvas.toDataURL('image/png'));
  }, [width, height, text, bgColor, textColor]);

  const handleDownload = () => {
    if (!result) return;

    const a = document.createElement('a');
    a.href = result;
    a.download = `placeholder-${width}x${height}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleReset = () => {
    setWidth(400);
    setHeight(300);
    setText('');
    setBgColor('#6366f1');
    setTextColor('#ffffff');
    setResult(null);
    setError(null);
  };

  const presets = [
    { label: 'Banner', width: 1200, height: 400 },
    { label: 'Thumbnail', width: 300, height: 200 },
    { label: 'Avatar', width: 100, height: 100 },
    { label: 'Hero', width: 1920, height: 600 },
    { label: 'Card', width: 400, height: 300 },
    { label: 'Square', width: 500, height: 500 },
  ];

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="width">Breite (px)</Label>
                <Input
                  id="width"
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(parseInt(e.target.value) || 0)}
                  min={1}
                  max={4000}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Höhe (px)</Label>
                <Input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(parseInt(e.target.value) || 0)}
                  min={1}
                  max={4000}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Größen-Voreinstellungen</Label>
              <div className="flex flex-wrap gap-2">
                {presets.map((preset) => (
                  <Button
                    key={preset.label}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setWidth(preset.width);
                      setHeight(preset.height);
                    }}
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="text">Text (optional)</Label>
              <Input
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={`${width} × ${height}`}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bgColor">Hintergrundfarbe</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-12 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="textColor">Textfarbe</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-12 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button onClick={generatePlaceholder}>
                <ImageIcon className="h-4 w-4 mr-2" />
                Generieren
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

          <div className="space-y-2">
            <Label>Vorschau</Label>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center">
              {result ? (
                <img src={result} alt="Placeholder" className="max-w-full max-h-full object-contain" />
              ) : (
                <div className="text-center text-muted-foreground">
                  <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Klicken Sie auf "Generieren"</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <canvas ref={canvasRef} className="hidden" />

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
