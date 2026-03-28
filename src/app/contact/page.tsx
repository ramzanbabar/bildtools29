import { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Mail, 
  Clock, 
  MessageSquare, 
  Bug, 
  Lightbulb, 
  Handshake,
  Shield,
  Send,
  CheckCircle2,
  Globe
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kontakt - BildTools',
  description: 'Kontaktieren Sie das BildTools Team. Wir freuen uns auf Ihre Fragen, Feedback und Anregungen zu unseren kostenlosen Online-Bildwerkzeugen.',
  openGraph: {
    title: 'Kontakt - BildTools',
    description: 'Kontaktieren Sie das BildTools Team. Wir freuen uns auf Ihre Fragen und Ihr Feedback.',
    type: 'website',
  },
};

export const dynamic = 'force-static';

const contactReasons = [
  {
    icon: <MessageSquare className="h-5 w-5" />,
    title: 'Allgemeine Fragen',
    description: 'Haben Sie Fragen zur Nutzung unserer Werkzeuge oder benötigen Sie Unterstützung?'
  },
  {
    icon: <Bug className="h-5 w-5" />,
    title: 'Fehler melden',
    description: 'Haben Sie einen Fehler entdeckt? Helfen Sie uns, BildTools zu verbessern.'
  },
  {
    icon: <Lightbulb className="h-5 w-5" />,
    title: 'Feature-Wünsche',
    description: 'Fehlt Ihnen ein bestimmtes Werkzeug oder eine Funktion? Teilen Sie uns Ihre Ideen mit.'
  },
  {
    icon: <Handshake className="h-5 w-5" />,
    title: 'Zusammenarbeit',
    description: 'Interesse an einer Kooperation oder Partnerschaft? Lassen Sie uns sprechen.'
  }
];

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
        
        <div className="relative container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 border-0">
              <Send className="h-4 w-4 mr-2 text-purple-500" />
              Kontakt
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Sprechen Sie mit uns
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Wir freuen uns, von Ihnen zu hören! Ob Sie Fragen haben, Feedback geben möchten 
              oder einfach nur Hallo sagen wollen – zögern Sie nicht, uns zu kontaktieren.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">E-Mail</h3>
                      <p className="text-sm opacity-80">Direkter Kontakt</p>
                    </div>
                  </div>
                  <a 
                    href="mailto:reanthings@gmail.com"
                    className="block p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <p className="text-xl font-medium">reanthings@gmail.com</p>
                    <p className="text-sm opacity-80 mt-1">Klicken Sie zum E-Mail senden</p>
                  </a>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-purple-600">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Antwortzeit</h3>
                      <p className="text-sm text-muted-foreground">Wann Sie uns erreichen</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                      <span className="text-muted-foreground">Werktage</span>
                      <span className="font-medium">24-48 Stunden</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Wir bemühen uns, alle Anfragen so schnell wie möglich zu beantworten. 
                      Bei hoher Nachfrage kann es manchmal etwas länger dauern.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 text-green-600">
                      <Globe className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Sprachen</h3>
                      <p className="text-sm text-muted-foreground">Wir unterstützen</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Deutsch</Badge>
                    <Badge variant="secondary">Englisch</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Reasons */}
            <div className="lg:col-span-3">
              <Card className="border-0 shadow-xl h-full">
                <CardContent className="p-8 md:p-12">
                  <h2 className="text-2xl font-bold mb-2">Wofür können wir helfen?</h2>
                  <p className="text-muted-foreground mb-8">
                    Wählen Sie aus den folgenden Kategorien, um Ihre Anfrage besser zu beschreiben
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    {contactReasons.map((reason, index) => (
                      <div 
                        key={index}
                        className="p-6 rounded-xl border hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-md transition-all"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-purple-600">
                            {reason.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">{reason.title}</h3>
                            <p className="text-sm text-muted-foreground">{reason.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 rounded-xl bg-muted">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      Was Sie in Ihrer E-Mail angeben sollten
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 mt-1">•</span>
                        <span>Beschreiben Sie Ihr Anliegen so detailliert wie möglich</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 mt-1">•</span>
                        <span>Bei Fehlern: Browser und Betriebssystem angeben</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 mt-1">•</span>
                        <span>Screenshots helfen oft, Probleme schneller zu verstehen</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 mt-1">•</span>
                        <span>Bei Feature-Wünschen: Beschreiben Sie den Use-Case</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Notice */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8 md:p-12 text-center">
                <Shield className="h-12 w-12 mx-auto mb-4 text-green-500" />
                <h2 className="text-2xl font-bold mb-4">Ihre Privatsphäre ist uns wichtig</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Ihre Kontaktdaten werden ausschließlich zur Beantwortung Ihrer Anfrage verwendet 
                  und nicht an Dritte weitergegeben. Wir speichern keine unnötigen Daten und 
                  respektieren Ihre Privatsphäre in jeder Hinsicht.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>DSGVO-konform</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Keine Datenweitergabe</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Sichere Kommunikation</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Bereit, uns zu kontaktieren?
            </h2>
            <p className="text-muted-foreground mb-6">
              Wir freuen uns auf Ihre Nachricht und werden uns so schnell wie möglich bei Ihnen melden.
            </p>
            <a href="mailto:reanthings@gmail.com">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-purple-500/25">
                <Mail className="mr-2 h-5 w-5" />
                E-Mail senden
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}