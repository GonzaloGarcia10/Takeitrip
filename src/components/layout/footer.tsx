import Link from "next/link";
import { Plane, Globe, MessageCircle, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <Plane className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                Takeitrip
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Tu asistente de viajes inteligente. Recomendaciones personalizadas con IA para encontrar el hotel perfecto.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">Producto</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><Link href="/chat" className="hover:text-blue-600">Chat IA</Link></li>
              <li><Link href="/destinos" className="hover:text-blue-600">Destinos</Link></li>
              <li><Link href="/hoteles" className="hover:text-blue-600">Hoteles</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">Ciudades Populares</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><Link href="/hoteles/paris" className="hover:text-blue-600">Hoteles en París</Link></li>
              <li><Link href="/hoteles/roma" className="hover:text-blue-600">Hoteles en Roma</Link></li>
              <li><Link href="/hoteles/bruselas" className="hover:text-blue-600">Hoteles en Bruselas</Link></li>
              <li><Link href="/hoteles/tokio" className="hover:text-blue-600">Hoteles en Tokio</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><Link href="/privacy" className="hover:text-blue-600">Privacidad</Link></li>
              <li><Link href="/terms" className="hover:text-blue-600">Términos</Link></li>
              <li><Link href="/cookies" className="hover:text-blue-600">Cookies</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 dark:border-gray-800 sm:flex-row">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Takeitrip. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600">
              <MessageCircle className="h-5 w-5" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600">
              <Globe className="h-5 w-5" />
            </a>
            <a href="mailto:hello@aitravel.com" className="text-gray-400 hover:text-blue-600">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
