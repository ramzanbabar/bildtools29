import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { categories, tools, getCategoryBySlug, getToolsByCategory } from '@/lib/tools';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, RefreshCw, Minimize2, Edit, PenTool, Settings, Film } from 'lucide-react';

interface Props {
  params: Promise<{ category: string }>;
}

const categoryIcons: Record<string, React.ReactNode> = {
  'bild-konverter': <RefreshCw className="h-8 w-8" />,
  'bild-komprimieren': <Minimize2 className="h-8 w-8" />,
  'bild-bearbeiten': <Edit className="h-8 w-8" />,
  'svg-tools': <PenTool className="h-8 w-8" />,
  'bild-utilities': <Settings className="h-8 w-8" />,
  'gif-tools': <Film className="h-8 w-8" />,
};

export async function generateStaticParams() {
  return categories.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);

  if (!cat) {
    return {
      title: 'Kategorie nicht gefunden - BildTools',
    };
  }

  return {
    title: `${cat.name} - Kostenlose Online Werkzeuge | BildTools`,
    description: cat.description,
    keywords: [cat.name, 'online tools', 'kostenlos', 'bildbearbeitung', ...cat.name.toLowerCase().split(' ')],
    openGraph: {
      title: `${cat.name} - Kostenlose Online Werkzeuge`,
      description: cat.description,
      type: 'website',
      url: `https://bildtools.online/category/${cat.slug}`,
      siteName: 'BildTools',
      locale: 'de_DE',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${cat.name} - BildTools`,
      description: cat.description,
    },
    alternates: {
      canonical: `https://bildtools.online/category/${cat.slug}`,
    },
    other: {
      'application/ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: cat.name,
        description: cat.description,
        url: `https://bildtools.online/category/${cat.slug}`,
        isPartOf: {
          '@type': 'WebSite',
          name: 'BildTools',
          url: 'https://bildtools.online',
        },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: getToolsByCategory(category).map((tool, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: tool.name,
            url: `https://bildtools.online/tools/${tool.slug}`,
          })),
        },
      }),
    },
  };
}

export const dynamic = 'force-static';

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);

  if (!cat) {
    notFound();
  }

  const categoryTools = getToolsByCategory(category);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        
        <div className="relative container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-purple-600">
                {categoryIcons[cat.slug]}
              </div>
            </div>
            <Badge className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 border-0">
              {categoryTools.length} Werkzeuge verfügbar
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {cat.name}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {cat.description}
            </p>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryTools.map((tool) => (
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
                      <h2 className="font-semibold group-hover:text-purple-600 transition-colors truncate">
                        {tool.name}
                      </h2>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {tool.shortDescription}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-end">
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-purple-600 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8 md:p-12">
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Über {cat.name}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Entdecken Sie unsere Sammlung von {categoryTools.length} kostenlosen Online-Werkzeugen 
                    in der Kategorie {cat.name}. Alle Werkzeuge funktionieren direkt in Ihrem Browser, 
                    ohne Installation oder Registrierung. Ihre Daten bleiben privat, da alle Verarbeitung 
                    lokal auf Ihrem Gerät stattfindet.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Unsere {cat.name} sind optimiert für Geschwindigkeit und Benutzerfreundlichkeit. 
                    Egal ob Sie Bilder konvertieren, komprimieren oder bearbeiten möchten – 
                    bei BildTools finden Sie die passenden Werkzeuge für jeden Zweck.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4 mt-8">
                    <div className="p-4 rounded-xl bg-muted text-center">
                      <p className="text-3xl font-bold text-purple-600">{categoryTools.length}</p>
                      <p className="text-sm text-muted-foreground">Werkzeuge</p>
                    </div>
                    <div className="p-4 rounded-xl bg-muted text-center">
                      <p className="text-3xl font-bold text-green-600">100%</p>
                      <p className="text-sm text-muted-foreground">Kostenlos</p>
                    </div>
                    <div className="p-4 rounded-xl bg-muted text-center">
                      <p className="text-3xl font-bold text-blue-600">0</p>
                      <p className="text-sm text-muted-foreground">Registrierung</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* All Categories */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Alle Kategorien</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {categories.map((c) => {
                const toolCount = getToolsByCategory(c.slug).length;
                const isActive = c.slug === category;
                
                return (
                  <Link
                    key={c.slug}
                    href={`/category/${c.slug}`}
                    className={`group p-6 border rounded-xl transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent'
                        : 'hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        isActive 
                          ? 'bg-white/20' 
                          : 'bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-purple-600'
                      }`}>
                        {categoryIcons[c.slug]}
                      </div>
                      <div>
                        <p className={`font-semibold ${isActive ? '' : 'group-hover:text-purple-600 transition-colors'}`}>
                          {c.name}
                        </p>
                        <p className={`text-sm ${isActive ? 'text-white/80' : 'text-muted-foreground'}`}>
                          {toolCount} Werkzeuge
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}