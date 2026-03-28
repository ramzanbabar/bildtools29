'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { tools, categories, getToolsByCategory } from '@/lib/tools';
import { 
  Search, 
  ArrowRight, 
  Minimize2, 
  RefreshCw, 
  Edit, 
  PenTool, 
  Settings, 
  Film,
  Sparkles,
  Shield,
  Zap,
  Users,
  CheckCircle2,
  Star,
  Image as ImageIcon,
  Wand2,
  Globe,
  Lock,
  Heart
} from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
  'bild-konverter': <RefreshCw className="h-6 w-6" />,
  'bild-komprimieren': <Minimize2 className="h-6 w-6" />,
  'bild-bearbeiten': <Edit className="h-6 w-6" />,
  'svg-tools': <PenTool className="h-6 w-6" />,
  'bild-utilities': <Settings className="h-6 w-6" />,
  'gif-tools': <Film className="h-6 w-6" />,
};

const features = [
  {
    icon: <Lock className="h-5 w-5" />,
    title: '100% Privat',
    description: 'Alle Bearbeitungen erfolgen lokal in Ihrem Browser. Ihre Bilder werden nie auf Server hochgeladen.'
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: 'Blitzschnell',
    description: 'Keine Wartezeiten durch Server-Uploads. Sofortige Ergebnisse in Sekunden.'
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: 'Überall verfügbar',
    description: 'Funktioniert auf jedem Gerät - Desktop, Tablet oder Smartphone.'
  },
  {
    icon: <Heart className="h-5 w-5" />,
    title: 'Komplett kostenlos',
    description: 'Alle Werkzeuge sind und bleiben kostenlos. Keine versteckten Kosten.'
  }
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return tools;
    
    const query = searchQuery.toLowerCase();
    return tools.filter(tool => 
      tool.name.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query) ||
      tool.keywords.some(kw => kw.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-purple-400/10 to-transparent rounded-full" />
        
        <div className="relative container py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 border border-purple-200 dark:border-purple-800">
              <Sparkles className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium">Über 44 kostenlose Bildwerkzeuge</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Online Bildwerkzeuge
              </span>
              <br />
              <span className="text-foreground">für jeden Bedarf</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Konvertieren, komprimieren und bearbeiten Sie Ihre Bilder direkt im Browser. 
              Schnell, sicher und ohne Registrierung – komplett kostenlos.
            </p>

            {/* Search */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Suchen Sie nach Werkzeugen... z.B. WebP zu PNG, Bild komprimieren"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-14 h-16 text-lg rounded-2xl border-2 shadow-xl bg-background/80 backdrop-blur-sm"
              />
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                  <ImageIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold">{tools.length}+</p>
                  <p className="text-sm text-muted-foreground">Werkzeuge</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold">100%</p>
                  <p className="text-sm text-muted-foreground">Kostenlos</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/50">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold">100%</p>
                  <p className="text-sm text-muted-foreground">Privatsphäre</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <Link href="/tools/webp-zu-png">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-purple-500/25">
                  <Wand2 className="mr-2 h-4 w-4" />
                  Jetzt Starten
                </Button>
              </Link>
              <Link href="/tools/bild-komprimieren">
                <Button size="lg" variant="outline" className="border-2">
                  <Minimize2 className="mr-2 h-4 w-4" />
                  Bild Komprimieren
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 border-y bg-muted/30">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-6 rounded-2xl bg-background border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-purple-600">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      {!searchQuery && (
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Werkzeuge nach Kategorie
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Wählen Sie aus unseren verschiedenen Kategorien das passende Werkzeug für Ihre Bildbearbeitung
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {categories.map((category) => {
                const toolCount = getToolsByCategory(category.slug).length;
                return (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    className="group relative p-8 border rounded-2xl hover:shadow-xl transition-all hover:border-purple-300 dark:hover:border-purple-700 bg-gradient-to-br from-background to-muted/30"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-4 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-purple-600 group-hover:scale-110 transition-transform">
                        {categoryIcons[category.slug]}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold group-hover:text-purple-600 transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {toolCount} Werkzeuge verfügbar
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Tools Grid */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {searchQuery ? `Suchergebnisse (${filteredTools.length})` : 'Alle Bildwerkzeuge'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {searchQuery 
                ? 'Hier sind die Werkzeuge, die Ihrer Suche entsprechen'
                : 'Entdecken Sie alle unsere kostenlosen Online-Bildwerkzeuge'
              }
            </p>
          </div>

          {filteredTools.length === 0 ? (
            <div className="text-center py-16">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">
                Keine Werkzeuge gefunden. Versuchen Sie einen anderen Suchbegriff.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto">
              {filteredTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="group p-6 border bg-card rounded-xl hover:shadow-lg transition-all hover:border-purple-300 dark:hover:border-purple-700"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-purple-600">
                      <RefreshCw className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold group-hover:text-purple-600 transition-colors truncate">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {tool.shortDescription}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {categories.find(c => c.slug === tool.category)?.name}
                    </Badge>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-purple-600 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              So einfach funktioniert&apos;s
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              In nur 3 Schritten zum bearbeiteten Bild
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '1', title: 'Werkzeug wählen', description: 'Wählen Sie das passende Werkzeug aus unserer Sammlung von über 44 Bildwerkzeugen.' },
              { step: '2', title: 'Bild hochladen', description: 'Laden Sie Ihr Bild per Drag & Drop oder Dateiauswahl hoch. Die Verarbeitung erfolgt lokal.' },
              { step: '3', title: 'Herunterladen', description: 'Nehmen Sie Einstellungen vor und laden Sie das bearbeitete Bild sofort herunter.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white text-2xl font-bold mb-4 shadow-lg shadow-purple-500/25">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8 md:p-12">
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    BildTools – Ihre kostenlose Online-Plattform für professionelle Bildbearbeitung
                  </h2>
                  
                  <p className="lead text-lg text-muted-foreground">
                    Willkommen bei BildTools, Ihrer One-Stop-Lösung für alle Online-Bildwerkzeuge. 
                    Unsere Plattform bietet über 44 verschiedene Werkzeuge zur Bildkonvertierung, 
                    Komprimierung und Bearbeitung – alles kostenlos und ohne Registrierung.
                  </p>

                  <h3 className="text-xl font-semibold mt-8 mb-4">Warum BildTools wählen?</h3>
                  <p>
                    In der heutigen digitalen Welt ist die Bearbeitung von Bildern ein alltäglicher 
                    Bedarf. Ob Sie ein Webentwickler sind, der Bilder optimieren muss, ein Designer, 
                    der Formate konvertiert, oder ein normaler Nutzer, der einfach ein Bild verkleinern 
                    möchte – BildTools bietet die passenden Werkzeuge für jeden Anwendungsfall.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <div className="p-6 rounded-xl bg-muted">
                      <h4 className="font-semibold flex items-center gap-2 mb-3">
                        <Lock className="h-5 w-5 text-blue-500" />
                        100% Browser-basiert
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Alle unsere Werkzeuge funktionieren direkt in Ihrem Browser. Das bedeutet, 
                        Ihre Bilder werden nie auf externe Server hochgeladen. Ihre Privatsphäre 
                        steht bei uns an erster Stelle.
                      </p>
                    </div>
                    <div className="p-6 rounded-xl bg-muted">
                      <h4 className="font-semibold flex items-center gap-2 mb-3">
                        <Zap className="h-5 w-5 text-yellow-500" />
                        Keine Installation erforderlich
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Vergessen Sie teure Software oder komplizierte Installationen. Öffnen Sie 
                        einfach unser Werkzeug in Ihrem Browser und legen Sie los.
                      </p>
                    </div>
                    <div className="p-6 rounded-xl bg-muted">
                      <h4 className="font-semibold flex items-center gap-2 mb-3">
                        <Heart className="h-5 w-5 text-red-500" />
                        Kostenlos für immer
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Alle Werkzeuge auf BildTools sind und bleiben kostenlos. Keine versteckten 
                        Kosten, keine Registrierungspflicht, keine Premium-Versionen.
                      </p>
                    </div>
                    <div className="p-6 rounded-xl bg-muted">
                      <h4 className="font-semibold flex items-center gap-2 mb-3">
                        <Globe className="h-5 w-5 text-green-500" />
                        Mobile-freundlich
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Alle unsere Werkzeuge sind vollständig responsive und funktionieren auf jedem 
                        Gerät – Desktop, Tablet oder Smartphone ohne Einschränkungen.
                      </p>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mt-8 mb-4">Unsere Werkzeug-Kategorien</h3>
                  <ul className="space-y-3">
                    <li><strong>Bild Konverter:</strong> Konvertieren Sie zwischen allen gängigen Bildformaten wie PNG, JPG, WebP, SVG, HEIC und mehr. Perfekt für Webentwickler und Designer.</li>
                    <li><strong>Bild Komprimieren:</strong> Reduzieren Sie die Dateigröße Ihrer Bilder ohne sichtbaren Qualitätsverlust. Ideal für schnellere Ladezeiten und bessere SEO.</li>
                    <li><strong>Bild Bearbeiten:</strong> Ändern Sie Größe, schneiden Sie zu, drehen und spiegeln Sie Ihre Bilder. Professionelle Bearbeitung direkt im Browser.</li>
                    <li><strong>SVG Tools:</strong> Optimieren, komprimieren und konvertieren Sie Vektorgrafiken für Web und Print.</li>
                    <li><strong>Bild Utilities:</strong> Extrahieren Sie Farben, zeigen Sie EXIF-Daten an und nutzen Sie praktische Zusatzfunktionen.</li>
                    <li><strong>GIF Tools:</strong> Erstellen und konvertieren Sie animierte GIFs aus statischen Bildern.</li>
                  </ul>

                  <h3 className="text-xl font-semibold mt-8 mb-4">Optimiert für Web-Entwickler</h3>
                  <p>
                    Besonders für Web-Entwickler bietet BildTools wertvolle Werkzeuge zur Optimierung 
                    von Web-Grafiken. Die Bildkomprimierung verbessert die Ladezeit Ihrer Website, 
                    was positive Auswirkungen auf Google-Rankings hat. Die Konvertierung zu WebP 
                    reduziert die Dateigröße zusätzlich, ohne an Qualität zu verlieren. Mit unseren 
                    SVG-Tools können Sie Vektorgrafiken optimieren und für verschiedene Anwendungsfälle 
                    vorbereiten. Der Favicon-Generator erstellt alle notwendigen Icon-Formate für 
                    Ihre Website mit nur einem Klick.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
        <div className="relative container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Bereit, Ihre Bilder zu bearbeiten?
            </h2>
            <p className="text-xl text-white/90">
              Wählen Sie ein Werkzeug aus und legen Sie sofort los – 
              kostenlos, ohne Registrierung, mit maximaler Privatsphäre.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/tools/webp-zu-png">
                <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-white/90">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  WebP zu PNG
                </Button>
              </Link>
              <Link href="/tools/bild-komprimieren">
                <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-white/90">
                  <Minimize2 className="mr-2 h-4 w-4" />
                  Bild Komprimieren
                </Button>
              </Link>
              <Link href="/tools/bildgroesse-aendern">
                <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-white/90">
                  <Edit className="mr-2 h-4 w-4" />
                  Größe Ändern
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}