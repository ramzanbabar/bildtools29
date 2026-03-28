'use client';

import { useState, useCallback, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Download, RotateCcw, Loader2, AlertCircle, Eye, Code } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { svgToImage, optimizeSvg, formatFileSize } from '@/lib/image-utils';

export function SvgTool() {
  const [file, setFile] = useState<File | null>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [targetFormat, setTargetFormat] = useState('image/png');
  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(512);
  const [optimizedContent, setOptimizedContent] = useState<string>('');
  const [optimizationStats, setOptimizationStats] = useState<{ original: number; optimized: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (selectedFile: File) => {
    if (!selectedFile.name.endsWith('.svg') && selectedFile.type !== 'image/svg+xml') {
      setError('Bitte wählen Sie eine SVG-Datei aus.');
      return;
    }

    setFile(selectedFile);
    setError(null);
    setResult(null);
    setResultBlob(null);
    setOptimizedContent('');
    setOptimizationStats(null);

    try {
      const text = await selectedFile.text();
      setSvgContent(text);
      
      const blob = new Blob([text], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      setPreview(url);
    } catch (err) {
      setError('Fehler beim Laden der SVG-Datei.');
      console.error(err);
    }
  }, []);

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
      const processed = await svgToImage(file, targetFormat, width, height, 0.92);
      setResult(processed.dataUrl);
      setResultBlob(processed.blob);
    } catch (err) {
      setError('Fehler bei der Konvertierung. Bitte versuchen Sie es erneut.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOptimize = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const result = await optimizeSvg(file);
      setOptimizedContent(result.content);
      setOptimizationStats({ original: result.originalSize, optimized: result.optimizedSize });
    } catch (err) {
      setError('Fehler bei der Optimierung. Bitte versuchen Sie es erneut.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!resultBlob) return;
    
    const ext = targetFormat.split('/')[1];
    const originalName = file?.name?.replace('.svg', '') || 'image';
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

  const handleDownloadOptimized = () => {
    if (!optimizedContent) return;
    
    const originalName = file?.name?.replace('.svg', '') || 'image';
    const filename = `${originalName}-optimized.svg`;
    
    const blob = new Blob([optimizedContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
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
    setSvgContent('');
    setPreview(null);
    setResult(null);
    setResultBlob(null);
    setError(null);
    setOptimizedContent('');
    setOptimizationStats(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const formatOptions = [
    { value: 'image/png', label: 'PNG' },
    { value: 'image/jpeg', label: 'JPG' },
    { value: 'image/webp', label: 'WebP' },
  ];

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
            <p className="text-lg font-medium mb-2">SVG hochladen</p>
            <p className="text-sm text-muted-foreground mb-4">
              Ziehen Sie eine SVG-Datei hierher oder klicken Sie zum Auswählen
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".svg,image/svg+xml"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              className="hidden"
            />
            <Button variant="outline" type="button" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
              Datei auswählen
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <Tabs defaultValue="convert">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="convert">Konvertieren</TabsTrigger>
                <TabsTrigger value="optimize">Optimieren</TabsTrigger>
                <TabsTrigger value="view">Anzeigen</TabsTrigger>
              </TabsList>
              
              <TabsContent value="convert" className="space-y-4 mt-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">SVG Vorschau</p>
                    <div className="aspect-square bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                      {preview && (
                        <img src={preview} alt="SVG Preview" className="max-w-full max-h-full" />
                      )}
                    </div>
                  </div>
                  
                  {result && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Konvertiert</p>
                      <div className="aspect-square bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                        <img src={result} alt="Result" className="max-w-full max-h-full" />
                      </div>
                      {resultBlob && (
                        <p className="text-xs text-muted-foreground">
                          {width} × {height} px • {formatFileSize(resultBlob.size)}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
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
                  <div className="space-y-2">
                    <Label>Breite (px)</Label>
                    <Input
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(parseInt(e.target.value) || 512)}
                      min={16}
                      max={4096}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Höhe (px)</Label>
                    <Input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(parseInt(e.target.value) || 512)}
                      min={16}
                      max={4096}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button onClick={handleConvert} disabled={loading}>
                    {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
                    Konvertieren
                  </Button>
                  {result && (
                    <Button onClick={handleDownload}>
                      <Download className="h-4 w-4 mr-2" />
                      Herunterladen
                    </Button>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="optimize" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Original ({formatFileSize(file.size)})</p>
                  <pre className="text-xs bg-muted p-4 rounded-lg overflow-auto max-h-48">
                    {svgContent.substring(0, 1000)}...
                  </pre>
                </div>
                
                {optimizedContent && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">
                      Optimiert ({formatFileSize(optimizationStats?.optimized || 0)})
                      {optimizationStats && (
                        <span className="text-green-600 ml-2">
                          (-{Math.round((1 - optimizationStats.optimized / optimizationStats.original) * 100)}%)
                        </span>
                      )}
                    </p>
                    <pre className="text-xs bg-muted p-4 rounded-lg overflow-auto max-h-48">
                      {optimizedContent.substring(0, 1000)}...
                    </pre>
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  <Button onClick={handleOptimize} disabled={loading}>
                    {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Code className="h-4 w-4 mr-2" />}
                    Optimieren
                  </Button>
                  {optimizedContent && (
                    <Button onClick={handleDownloadOptimized}>
                      <Download className="h-4 w-4 mr-2" />
                      Herunterladen
                    </Button>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="view" className="space-y-4 mt-4">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                  {preview && (
                    <img src={preview} alt="SVG Preview" className="max-w-full max-h-full" />
                  )}
                </div>
                <div className="flex gap-2">
                  <Eye className="h-4 w-4" />
                  <span className="text-sm text-muted-foreground">
                    SVG-Vorschau
                  </span>
                </div>
              </TabsContent>
            </Tabs>

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
