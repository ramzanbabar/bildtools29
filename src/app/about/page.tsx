import { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Zap, 
  Heart, 
  Globe, 
  Users, 
  Lock,
  Target,
  Sparkles,
  CheckCircle2,
  Image as ImageIcon,
  Wand2
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Über uns - BildTools',
  description: 'Erfahren Sie mehr über BildTools und unsere Mission, kostenlose Bildwerkzeuge für jedermann bereitzustellen. Über 44 Online-Tools für Ihre Bildbearbeitung.',
  openGraph: {
    title: 'Über uns - BildTools',
    description: 'Erfahren Sie mehr über BildTools und unsere Mission, kostenlose Bildwerkzeuge für jedermann bereitzustellen.',
    type: 'website',
  },
};

export const dynamic = 'force-static';

const values = [
  {
    icon: <Lock className="h-6 w-6" />,
    title: 'Datenschutz first',
    description: 'Ihre Bilder werden niemals auf unsere Server hochgeladen. Alle Verarbeitung erfolgt lokal in Ihrem Browser, was maximale Privatsphäre gewährleistet.'
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: 'Kostenlos für immer',
    description: 'Wir glauben, dass jeder Zugang zu professionellen Bildwerkzeugen haben sollte. Deshalb sind alle unsere Tools komplett kostenlos – ohne versteckte Kosten.'
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Blitzschnelle Performance',
    description: 'Dank browser-basierter Verarbeitung erhalten Sie Ergebnisse in Sekunden. Keine Wartezeiten durch Server-Uploads oder Downloads.'
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: 'Überall verfügbar',
    description: 'Unsere Tools funktionieren auf jedem Gerät mit einem modernen Browser – Desktop, Tablet oder Smartphone, egal wo Sie sind.'
  }
];

const stats = [
  { number: '44+', label: 'Bildwerkzeuge' },
  { number: '100%', label: 'Kostenlos' },
  { number: '0', label: 'Registrierung nötig' },
  { number: '100%', label: 'Privatsphäre' }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        
        <div className="relative container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 border-0">
              <Sparkles className="h-4 w-4 mr-2 text-purple-500" />
              Unsere Geschichte
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Über BildTools
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Ihre kostenlose Online-Plattform für professionelle Bildbearbeitung. 
              Wir machen leistungsstarke Bildwerkzeuge für jedermann zugänglich.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.number}
                </p>
                <p className="text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Mission */}
            <Card className="border-0 shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-1" />
              <CardContent className="p-8 md:p-12">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-purple-600">
                    <Target className="h-7 w-7" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold">Unsere Mission</h2>
                    <p className="text-muted-foreground">Was uns antreibt</p>
                  </div>
                </div>
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <p className="text-muted-foreground leading-relaxed">
                    In der heutigen digitalen Welt ist die Bearbeitung von Bildern ein alltäglicher Bedarf. 
                    Viele Menschen benötigen Bildwerkzeuge, möchten aber keine teure Software kaufen oder 
                    komplexe Anwendungen installieren. Genau hier setzt BildTools an: Wir bieten über 44 
                    verschiedene Bildwerkzeuge, die direkt im Browser funktionieren – kostenlos, ohne 
                    Registrierung und ohne Installation.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Von Bildkonvertierung über Komprimierung bis hin zu fortgeschrittener Bearbeitung: 
                    Bei uns finden Sie alles, was Sie brauchen. Unsere Mission ist es, professionelle 
                    Bildbearbeitung für jeden zugänglich zu machen – unabhängig vom Budget, technischen 
                    Kenntnissen oder Standort.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Values Grid */}
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Was uns auszeichnet</h2>
                <p className="text-muted-foreground">Unsere Werte und Prinzipien</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <Card key={index} className="border hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-purple-600">
                          {value.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Team Section */}
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8 md:p-12">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-purple-600">
                    <Users className="h-7 w-7" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold">Unser Team</h2>
                    <p className="text-muted-foreground">Leidenschaft für Bildbearbeitung</p>
                  </div>
                </div>
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <p className="text-muted-foreground leading-relaxed">
                    BildTools wird von einem engagierten Team entwickelt, das sich für die 
                    Demokratisierung von Bildbearbeitungs-Tools einsetzt. Wir sind Entwickler, 
                    Designer und Technologie-Enthusiasten, die glauben, dass jeder Zugang zu 
                    professionellen Werkzeugen haben sollte – unabhängig vom Budget oder 
                    technischen Kenntnissen.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Wir arbeiten kontinuierlich an der Verbesserung unserer Plattform und der 
                    Entwicklung neuer Werkzeuge. Ihr Feedback ist dabei unverzichtbar und hilft 
                    uns, BildTools ständig weiterzuentwickeln und an die Bedürfnisse unserer 
                    Nutzer anzupassen.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Technology Section */}
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8 md:p-12">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-purple-600">
                    <Wand2 className="h-7 w-7" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold">Unsere Technologie</h2>
                    <p className="text-muted-foreground">Modernste Browser-Technologie</p>
                  </div>
                </div>
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <p className="text-muted-foreground leading-relaxed">
                    BildTools nutzt modernste Web-Technologien, um leistungsstarke Bildbearbeitung 
                    direkt im Browser zu ermöglichen. Durch den Einsatz von HTML5 Canvas, WebGL und 
                    fortschrittlichen JavaScript-Algorithmen verarbeiten wir Ihre Bilder lokal auf 
                    Ihrem Gerät.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Das bedeutet für Sie: Keine Uploads auf fremde Server, keine Wartezeiten durch 
                    Netzwerklatenz und volle Kontrolle über Ihre Daten. Ihre Privatsphäre ist 
                    technisch garantiert, nicht nur versprochen.
                  </p>
                </div>
                <div className="grid sm:grid-cols-3 gap-4 mt-8">
                  <div className="flex items-center gap-2 p-4 rounded-xl bg-muted">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-medium">HTML5 Canvas</span>
                  </div>
                  <div className="flex items-center gap-2 p-4 rounded-xl bg-muted">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-medium">Client-side Processing</span>
                  </div>
                  <div className="flex items-center gap-2 p-4 rounded-xl bg-muted">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-medium">Zero Server Uploads</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact CTA */}
            <Card className="border-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
              <CardContent className="p-8 md:p-12 text-center">
                <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-90" />
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Haben Sie Fragen oder Feedback?
                </h2>
                <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
                  Wir freuen uns von Ihnen zu hören! Kontaktieren Sie uns jederzeit für Fragen, 
                  Anregungen oder Feedback zu unseren Werkzeugen.
                </p>
                <a 
                  href="mailto:reanthings@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-white/90 transition-colors"
                >
                  <Shield className="h-5 w-5" />
                  reanthings@gmail.com
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}