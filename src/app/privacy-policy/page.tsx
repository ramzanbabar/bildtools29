import { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, Server, Cookie, AlertCircle, Mail, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung - BildTools',
  description: 'Datenschutzerklärung von BildTools. Erfahren Sie, wie wir Ihre Daten schützen und wie wir mit Ihrer Privatsphäre umgehen.',
  openGraph: {
    title: 'Datenschutzerklärung - BildTools',
    description: 'Datenschutzerklärung von BildTools. Erfahren Sie, wie wir Ihre Daten schützen.',
    type: 'website',
  },
};

export const dynamic = 'force-static';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30" />
        <div className="relative container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 border-0">
              <Shield className="h-4 w-4 mr-2 text-purple-500" />
              Datenschutz
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Datenschutzerklärung
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ihre Privatsphäre ist uns wichtig. Erfahren Sie, wie wir Ihre Daten schützen.
            </p>
            <p className="text-sm text-muted-foreground">Stand: Januar 2026</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Key Highlight */}
            <Card className="border-0 shadow-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20">
                    <Lock className="h-7 w-7" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Ihre Bilder bleiben bei Ihnen</h2>
                    <p className="text-white/90 leading-relaxed">
                      Alle Bildbearbeitungs-Funktionen auf BildTools erfolgen vollständig in Ihrem 
                      Browser (clientseitig). Ihre Bilder werden NICHT auf unsere Server hochgeladen, 
                      gespeichert oder verarbeitet. Alle Daten bleiben auf Ihrem lokalen Gerät.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Responsible Party */}
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-purple-600">
                    <Server className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold">1. Verantwortlicher</h2>
                </div>
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <p className="text-muted-foreground">
                    Verantwortlich für die Datenverarbeitung auf dieser Website ist:
                  </p>
                  <div className="p-4 rounded-xl bg-muted mt-4">
                    <p className="font-medium">BildTools</p>
                    <p className="text-muted-foreground">E-Mail: <a href="mailto:reanthings@gmail.com" className="text-purple-600 hover:underline">reanthings@gmail.com</a></p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Collection */}
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-purple-600">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold">2. Datenerfassung auf unserer Website</h2>
                </div>
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <h3 className="text-lg font-semibold mt-6 mb-3">2.1 Server-Log-Dateien</h3>
                  <p className="text-muted-foreground">
                    Unser Hosting-Provider erfasst automatisch Informationen und speichert diese in 
                    Server-Log-Dateien, die Ihr Browser automatisch übermittelt. Diese Daten dienen 
                    der technischen Stabilität und Sicherheit unserer Website:
                  </p>
                  <ul className="space-y-2 text-muted-foreground mt-4">
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Browsertyp und -version</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Verwendetes Betriebssystem</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Referrer URL</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Hostname des zugreifenden Rechners</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Uhrzeit der Serveranfrage</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> IP-Adresse ( anonymisiert)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Cookies */}
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-purple-600">
                    <Cookie className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold">3. Cookies</h2>
                </div>
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <p className="text-muted-foreground mb-4">
                    Unsere Website verwendet Cookies für folgende Zwecke:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-muted">
                      <h4 className="font-medium mb-2">Präferenzen</h4>
                      <p className="text-sm text-muted-foreground">Speicherung Ihrer Theme-Einstellungen (Dark Mode)</p>
                    </div>
                    <div className="p-4 rounded-xl bg-muted">
                      <h4 className="font-medium mb-2">Technische Funktionen</h4>
                      <p className="text-sm text-muted-foreground">Technisch notwendige Funktionen für den Betrieb</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-4">
                    Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies 
                    informiert werden und Cookies nur im Einzelfall erlauben. Bitte beachten Sie, 
                    dass dies die Funktionalität unserer Website einschränken kann.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-purple-600">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold">4. Ihre Rechte</h2>
                </div>
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <p className="text-muted-foreground mb-4">
                    Sie haben folgende Rechte bezüglich Ihrer bei uns gespeicherten personenbezogenen Daten:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      'Recht auf Auskunft',
                      'Recht auf Berichtigung',
                      'Recht auf Löschung',
                      'Recht auf Einschränkung der Verarbeitung',
                      'Recht auf Datenübertragbarkeit',
                      'Recht auf Widerspruch'
                    ].map((right, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-muted">
                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{right}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Third Parties */}
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">5. Drittanbieter und Hosting</h2>
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <p className="text-muted-foreground">
                    Unsere Website wird auf einem externen Hosting-Server gehostet. Der Hosting-Provider 
                    verarbeitet alle Daten, die bei der Nutzung unserer Website erhoben werden, in unserem 
                    Auftrag. Wir haben mit dem Anbieter einen Auftragsverarbeitungsvertrag nach Art. 28 DSGVO 
                    abgeschlossen, der sicherstellt, dass die Datenverarbeitung im Einklang mit den 
                    Datenschutzbestimmungen erfolgt.
                  </p>
                  <p className="text-muted-foreground mt-4">
                    Wir setzen keine Analyse-Tools wie Google Analytics ein und verzichten auf 
                    Tracking-Mechanismen zur Nutzeranalyse.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="h-6 w-6" />
                  <h2 className="text-2xl font-bold">6. Kontakt für Datenschutz</h2>
                </div>
                <p className="opacity-90 mb-4">
                  Bei Fragen zum Datenschutz oder zur Ausübung Ihrer Rechte erreichen Sie uns unter:
                </p>
                <a 
                  href="mailto:reanthings@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-white/90 transition-colors"
                >
                  <Mail className="h-5 w-5" />
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