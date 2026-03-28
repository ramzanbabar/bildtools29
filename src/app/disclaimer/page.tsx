import { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Link2, Image, Copyright, Landmark, Mail, CheckCircle2, XCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Haftungsausschluss - BildTools',
  description: 'Haftungsausschluss und rechtliche Hinweise für BildTools. Informationen zur Haftung, Urheberrecht und Nutzung unserer Dienste.',
  openGraph: {
    title: 'Haftungsausschluss - BildTools',
    description: 'Haftungsausschluss und rechtliche Hinweise für BildTools.',
    type: 'website',
  },
};

export const dynamic = 'force-static';

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30" />
        <div className="relative container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 border-0">
              <AlertTriangle className="h-4 w-4 mr-2 text-purple-500" />
              Rechtliche Hinweise
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Haftungsausschluss
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Wichtige Informationen zur Haftung und Nutzung unserer Dienste.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Content Liability */}
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-purple-600">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold">1. Haftung für Inhalte</h2>
                </div>
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <p className="text-muted-foreground leading-relaxed">
                    Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten 
                    nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als 
                    Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde 
                    Informationen zu überwachen oder nach Umständen zu forschen, die auf eine 
                    rechtswidrige Tätigkeit hinweisen.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den 
                    allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist 
                    jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. 
                    Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte 
                    umgehend entfernen.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Links Liability */}
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-purple-600">
                    <Link2 className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold">2. Haftung für Links</h2>
                </div>
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <p className="text-muted-foreground leading-relaxed">
                    Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir 
                    keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine 
                    Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige 
                    Anbieter oder Betreiber der Seiten verantwortlich.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße 
                    überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. 
                    Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne 
                    konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Tool Usage */}
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-purple-600">
                    <Image className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold">3. Nutzung der Werkzeuge</h2>
                </div>
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Die auf BildTools bereitgestellten Werkzeuge werden "wie besehen" ohne jegliche 
                    Garantie bereitgestellt. Wir übernehmen keine Haftung für:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 mb-4">
                    {[
                      'Datenverluste bei der Nutzung unserer Werkzeuge',
                      'Qualitätsverluste bei der Bildbearbeitung',
                      'Verfügbarkeit der Dienstleistungen',
                      'Schäden durch die Nutzung der Werkzeuge',
                      'Kompatibilitätsprobleme mit bestimmten Browsern',
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
                      <strong>Wichtiger Hinweis:</strong> Die Nutzung unserer Werkzeuge erfolgt auf 
                      eigene Verantwortung. Wir empfehlen dringend, wichtige Daten vor der Bearbeitung 
                      zu sichern und Backup-Kopien zu erstellen.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Copyright */}
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-purple-600">
                    <Copyright className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold">4. Urheberrecht</h2>
                </div>
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <p className="text-muted-foreground leading-relaxed">
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten 
                    unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, 
                    Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes 
                    bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen 
                    Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt 
                    wurden, werden die Urheberrechte Dritter beachtet.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Trademark */}
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-purple-600">
                    <Landmark className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold">5. Markenrecht</h2>
                </div>
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <p className="text-muted-foreground leading-relaxed">
                    Alle innerhalb des Internetangebotes genannten und ggf. durch Dritte geschützten 
                    Marken- und Warenzeichen unterliegen uneingeschränkt den Bestimmungen des jeweils 
                    gültigen Kennzeichenrechts und den Besitzrechten der jeweiligen eingetragenen Eigentümer.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Allein aufgrund der bloßen Nennung ist nicht der Schluss zu ziehen, dass Markenzeichen 
                    nicht durch Rechte Dritter geschützt sind. Das Copyright für veröffentlichte, vom 
                    Autor selbst erstellte Objekte bleibt allein beim Autor der Seiten.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="h-6 w-6" />
                  <h2 className="text-2xl font-bold">6. Kontaktaufnahme</h2>
                </div>
                <p className="opacity-90 mb-4">
                  Bei rechtlichen Fragen oder Anmerkungen zu diesem Haftungsausschluss erreichen Sie uns unter:
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