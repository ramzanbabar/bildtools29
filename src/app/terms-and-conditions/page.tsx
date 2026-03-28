import { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Globe, Users, Lock, AlertTriangle, Scale, Mail, CheckCircle2, XCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Allgemeine Geschäftsbedingungen - BildTools',
  description: 'AGB und Nutzungsbedingungen für BildTools. Erfahren Sie mehr über die Regeln für die Nutzung unserer kostenlosen Online-Bildwerkzeuge.',
  openGraph: {
    title: 'Allgemeine Geschäftsbedingungen - BildTools',
    description: 'AGB und Nutzungsbedingungen für BildTools.',
    type: 'website',
  },
};

export const dynamic = 'force-static';

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30" />
        <div className="relative container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 border-0">
              <FileText className="h-4 w-4 mr-2 text-purple-500" />
              Nutzungsbedingungen
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Allgemeine Geschäftsbedingungen
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Die Regeln für die Nutzung unserer kostenlosen Online-Bildwerkzeuge.
            </p>
            <p className="text-sm text-muted-foreground">Stand: Januar 2026</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Scope */}
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-purple-600">
                    <Globe className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold">1. Geltungsbereich</h2>
                </div>
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <p className="text-muted-foreground leading-relaxed">
                    Diese Allgemeinen Geschäftsbedingungen (AGB) regeln die Nutzung der kostenlosen 
                    Online-Bildbearbeitungs-Dienste von BildTools. Durch die Nutzung unserer Website 
                    stimmen Sie diesen Bedingungen zu. Wenn Sie mit diesen Bedingungen nicht einverstanden 
                    sind, bitten wir Sie, unsere Dienste nicht zu nutzen.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Service Description */}
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-purple-600">
                    <FileText className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold">2. Beschreibung des Dienstes</h2>
                </div>
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <p className="text-muted-foreground mb-4">
                    BildTools bietet kostenlose Online-Werkzeuge zur Bildbearbeitung an. Die Dienste 
                    umfassen unter anderem:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 mb-4">
                    {[
                      'Bildkonvertierung (PNG, JPG, WebP, SVG, HEIC)',
                      'Bildkomprimierung und -optimierung',
                      'Bildbearbeitung (Größe ändern, Zuschneiden)',
                      'Drehen und Spiegeln von Bildern',
                      'SVG-Tools und Vektorgrafik-Bearbeitung',
                      'EXIF-Daten anzeigen und entfernen',
                      'Farben extrahieren und Paletten erstellen',
                      'GIF-Erstellung und Animation'
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-muted">
                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Usage Requirements */}
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-purple-600">
                    <Users className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold">3. Nutzungsvoraussetzungen</h2>
                </div>
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-muted">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Kosten
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Die Nutzung von BildTools ist vollständig kostenlos. Es fallen keine 
                        Gebühren für die Nutzung der Werkzeuge an.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-muted">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Registrierung
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Für die Nutzung unserer Dienste ist keine Registrierung erforderlich. 
                        Alle Werkzeuge können ohne Anmeldung genutzt werden.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rights and Obligations */}
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-purple-600">
                    <Scale className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold">4. Nutzungsrechte und -pflichten</h2>
                </div>
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                      <h4 className="font-medium mb-3 text-green-800 dark:text-green-200">Erlaubte Nutzung</h4>
                      <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          Private und geschäftliche Nutzung
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          Freie Verwendung der bearbeiteten Bilder
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          Nutzung aller verfügbaren Werkzeuge
                        </li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                      <h4 className="font-medium mb-3 text-red-800 dark:text-red-200">Verbotene Nutzung</h4>
                      <ul className="space-y-2 text-sm text-red-700 dark:text-red-300">
                        <li className="flex items-start gap-2">
                          <XCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          Nutzung für rechtswidrige Zwecke
                        </li>
                        <li className="flex items-start gap-2">
                          <XCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          Überlastung oder Missbrauch der Dienste
                        </li>
                        <li className="flex items-start gap-2">
                          <XCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          Verletzung von Urheberrechten Dritter
                        </li>
                        <li className="flex items-start gap-2">
                          <XCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          Verbreitung von Schadsoftware
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Privacy */}
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-purple-600">
                    <Lock className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold">5. Datenschutz</h2>
                </div>
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <p className="text-muted-foreground leading-relaxed">
                    Alle Bildbearbeitungen erfolgen lokal in Ihrem Browser. Ihre Bilder werden nicht 
                    auf unsere Server übertragen oder dort gespeichert. Dies gewährleistet maximale 
                    Privatsphäre und Sicherheit für Ihre Daten. Weitere Informationen finden Sie in 
                    unserer <a href="/privacy-policy" className="text-purple-600 hover:underline">Datenschutzerklärung</a>.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Liability */}
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-purple-600">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold">6. Haftung</h2>
                </div>
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <p className="text-muted-foreground mb-4">
                    Die Nutzung unserer Dienste erfolgt auf eigene Verantwortung. Wir übernehmen 
                    keine Haftung für:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 mb-4">
                    {[
                      'Datenverluste bei der Nutzung',
                      'Qualitätsverluste bei der Bearbeitung',
                      'Verfügbarkeit der Dienstleistungen',
                      'Indirekte oder Folgeschäden'
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-muted">
                        <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      <strong>Empfehlung:</strong> Wir empfehlen, wichtige Daten vor der Bearbeitung 
                      zu sichern und Backup-Kopien zu erstellen.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">7. Verfügbarkeit</h2>
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <p className="text-muted-foreground leading-relaxed">
                    Wir bemühen uns, die Dienste möglichst unterbrechungsfrei zur Verfügung zu stellen. 
                    Wartungsarbeiten, Störungen oder andere Gründe können jedoch zu vorübergehenden 
                    Einschränkungen führen. Ein Anspruch auf ständige Verfügbarkeit besteht nicht. 
                    Wir behalten uns vor, die Dienste jederzeit zu ändern oder einzustellen.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Law */}
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">8. Anwendbares Recht</h2>
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <p className="text-muted-foreground leading-relaxed">
                    Es gilt das Recht der Bundesrepublik Deutschland. Für Verbraucher gilt diese 
                    Rechtswahl nur insoweit, als nicht der gewährte Schutz durch zwingende Bestimmungen 
                    des Rechts des Staates, in dem der Verbraucher seinen gewöhnlichen Aufenthalt hat, 
                    entzogen wird. Die Anwendung des UN-Kaufrechts wird ausgeschlossen.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="h-6 w-6" />
                  <h2 className="text-2xl font-bold">9. Kontakt</h2>
                </div>
                <p className="opacity-90 mb-4">
                  Bei Fragen zu diesen AGB erreichen Sie uns unter:
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