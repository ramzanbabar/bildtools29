import Link from 'next/link';
import Image from 'next/image';
import { categories, tools } from '@/lib/tools';
import { Mail, Heart, Shield, FileText, Info, Wand2 } from 'lucide-react';

export function Footer() {
  const popularTools = tools.slice(0, 6);

  return (
    <footer className="border-t bg-gradient-to-b from-background to-muted/30">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/logo.png"
                alt="BildTools Logo"
                width={48}
                height={48}
                className="h-12 w-12 group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  BildTools
                </span>
                <span className="text-xs text-muted-foreground">
                  Online Bildwerkzeuge
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Ihre kostenlose Online-Plattform für professionelle Bildbearbeitung. Konvertieren, 
              komprimieren und bearbeiten Sie Ihre Bilder direkt im Browser - schnell, sicher 
              und ohne Registrierung.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <a 
                href="mailto:reanthings@gmail.com" 
                className="hover:text-foreground transition-colors"
              >
                reanthings@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Sicher</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Heart className="h-4 w-4 text-red-500" />
                <span>100% Kostenlos</span>
              </div>
            </div>
          </div>

          {/* Tools Categories */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Wand2 className="h-4 w-4 text-purple-500" />
              Werkzeuge
            </h3>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/category/${category.slug}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:underline underline-offset-4"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tools */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Beliebte Werkzeuge</h3>
            <ul className="space-y-3">
              {popularTools.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:underline underline-offset-4"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Info className="h-4 w-4 text-blue-500" />
              Informationen
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:underline underline-offset-4"
                >
                  Über uns
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:underline underline-offset-4"
                >
                  Kontakt
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:underline underline-offset-4 flex items-center gap-1.5"
                >
                  <Shield className="h-3 w-3" />
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:underline underline-offset-4 flex items-center gap-1.5"
                >
                  <FileText className="h-3 w-3" />
                  Haftungsausschluss
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:underline underline-offset-4"
                >
                  AGB
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} BildTools. Alle Rechte vorbehalten.
          </p>
          <p className="text-sm text-muted-foreground">
            Entwickelt mit{' '}
            <Heart className="inline h-4 w-4 text-red-500 mx-1" />
            für bessere Bildbearbeitung
          </p>
        </div>
      </div>
    </footer>
  );
}