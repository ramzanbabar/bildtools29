'use client';

import type { Tool } from '@/lib/tools';
import { ImageConverter } from './ImageConverter';
import { ImageCompressor } from './ImageCompressor';
import { ImageResizer } from './ImageResizer';
import { ImageCropper } from './ImageCropper';
import { ImageRotator } from './ImageRotator';
import { SvgTool } from './SvgTool';
import { ColorPicker } from './ColorPicker';
import { PaletteExtractor } from './PaletteExtractor';
import { GifMaker } from './GifMaker';
import { ExifViewer } from './ExifViewer';
import { PlaceholderGenerator } from './PlaceholderGenerator';
import { FaviconGenerator } from './FaviconGenerator';
import { FAQ } from '@/components/seo/FAQ';
import { StructuredData } from '@/components/seo/StructuredData';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { getRelatedTools, categories } from '@/lib/tools';
import { ArrowRight, Home, ChevronRight, Lock, Zap, Heart } from 'lucide-react';

interface ToolPageProps {
  tool: Tool;
}

export function ToolPage({ tool }: ToolPageProps) {
  const renderTool = () => {
    const slug = tool.slug;
    
    // Image Converters
    if (['webp-zu-png', 'webp-zu-jpg', 'png-zu-webp', 'jpg-zu-webp', 'png-zu-jpg', 'jpg-zu-png', 'jpeg-zu-png', 'jfif-zu-png', 'jfif-zu-jpg', 'heic-zu-jpg', 'heic-zu-png', 'svg-zu-png', 'svg-zu-jpg', 'svg-konverter'].includes(slug)) {
      const defaultTarget = getDefaultTargetFormat(slug);
      return <ImageConverter defaultTargetFormat={defaultTarget} />;
    }
    
    // Image Compressors
    if (['bild-komprimieren', 'jpg-komprimieren', 'png-komprimieren', 'webp-komprimieren', 'bild-optimieren-online', 'bild-fuer-web-optimieren', 'bild-dateigroesse-reduzieren', 'bild-verkleinern-ohne-qualitaetsverlust', 'bild-kleiner-machen'].includes(slug)) {
      return <ImageCompressor />;
    }
    
    // Image Resize
    if (['bildgroesse-aendern', 'bild-skalieren', 'bild-dimension-aendern'].includes(slug)) {
      return <ImageResizer />;
    }
    
    // Image Crop
    if (slug === 'bild-zuschneiden') {
      return <ImageCropper />;
    }
    
    // Image Rotate/Flip
    if (['bild-drehen', 'bild-spiegeln', 'bild-format-aendern'].includes(slug)) {
      return <ImageRotator />;
    }
    
    // SVG Tools
    if (['svg-optimieren', 'svg-komprimieren', 'svg-viewer', 'svg-anzeigen-online'].includes(slug)) {
      return <SvgTool />;
    }
    
    // Color Picker
    if (slug === 'image-color-picker') {
      return <ColorPicker />;
    }
    
    // Palette Extractor
    if (slug === 'farbpalette-aus-bild-extrahieren') {
      return <PaletteExtractor />;
    }
    
    // EXIF Viewer
    if (['exif-daten-anzeigen', 'exif-daten-entfernen', 'bild-metadata-anzeigen'].includes(slug)) {
      return <ExifViewer />;
    }
    
    // GIF Tools
    if (['gif-maker', 'bild-zu-gif', 'webp-zu-gif'].includes(slug)) {
      return <GifMaker />;
    }
    
    // Placeholder Generator
    if (slug === 'placeholder-image-generator') {
      return <PlaceholderGenerator />;
    }
    
    // Favicon Generator
    if (slug === 'favicon-generator') {
      return <FaviconGenerator />;
    }
    
    // Fallback to converter
    return <ImageConverter />;
  };

  const relatedTools = getRelatedTools(tool.slug, 6);
  const category = categories.find(c => c.slug === tool.category);

  return (
    <>
      <StructuredData tool={tool} />
      
      <div className="min-h-screen">
        {/* Breadcrumb */}
        <section className="border-b bg-muted/30">
          <div className="container py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Startseite</span>
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link 
                href={`/category/${tool.category}`}
                className="hover:text-foreground transition-colors"
              >
                {category?.name}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium truncate max-w-[200px]">{tool.name}</span>
            </nav>
          </div>
        </section>

        <div className="container py-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <Badge className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 border-0">
                {category?.name}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold">{tool.name}</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {tool.shortDescription}
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Lock className="h-4 w-4 text-green-500" />
                  100% Privat
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  Blitzschnell
                </span>
                <span className="flex items-center gap-1.5">
                  <Heart className="h-4 w-4 text-red-500" />
                  Komplett kostenlos
                </span>
              </div>
            </div>

            {/* Tool Component */}
            {renderTool()}

            {/* SEO Content */}
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8 md:p-12">
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Über {tool.name}
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-4">
                    {tool.content.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <FAQ faq={tool.faq} />

            {/* Related Tools */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Ähnliche Werkzeuge</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {relatedTools.map((relatedTool) => (
                  <Link
                    key={relatedTool.slug}
                    href={`/tools/${relatedTool.slug}`}
                    className="group p-5 border bg-card rounded-xl hover:shadow-md transition-all hover:border-purple-300 dark:hover:border-purple-700"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <p className="font-semibold group-hover:text-purple-600 transition-colors">
                          {relatedTool.name}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {relatedTool.shortDescription}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-purple-600 transition-colors flex-shrink-0 mt-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function getDefaultTargetFormat(slug: string): string {
  const formatMap: Record<string, string> = {
    'webp-zu-png': 'image/png',
    'webp-zu-jpg': 'image/jpeg',
    'png-zu-webp': 'image/webp',
    'jpg-zu-webp': 'image/webp',
    'png-zu-jpg': 'image/jpeg',
    'jpg-zu-png': 'image/png',
    'jpeg-zu-png': 'image/png',
    'jfif-zu-png': 'image/png',
    'jfif-zu-jpg': 'image/jpeg',
    'heic-zu-jpg': 'image/jpeg',
    'heic-zu-png': 'image/png',
    'svg-zu-png': 'image/png',
    'svg-zu-jpg': 'image/jpeg',
    'svg-konverter': 'image/png',
  };
  return formatMap[slug] || 'image/png';
}