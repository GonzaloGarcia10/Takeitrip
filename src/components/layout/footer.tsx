import Link from "next/link";
import { Plane, Mail, ArrowRight, MessageCircle } from "lucide-react";

const footerLinks = {
  producto: [
    { label: "Chat IA", href: "/chat" },
    { label: "Destinos", href: "/destinos" },
    { label: "Hoteles", href: "/hoteles" },
  ],
  destinos: [
    { label: "París", href: "/hoteles/paris" },
    { label: "Roma", href: "/hoteles/roma" },
    { label: "Barcelona", href: "/hoteles/barcelona" },
    { label: "Tokio", href: "/hoteles/tokio" },
  ],
  legal: [
    { label: "Privacidad", href: "/privacy" },
    { label: "Términos", href: "/terms" },
    { label: "Cookies", href: "/cookies" },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/20 to-purple-950/5" />
      
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
                <Plane className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Takeitrip</span>
            </Link>
            <p className="text-sm text-white/50">
              Tu asistente de viajes inteligente. Encuentra hoteles perfectos con recomendaciones personalizadas de IA.
            </p>
            <div className="flex gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/70 transition-all hover:bg-white/10 hover:text-white"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/70 transition-all hover:bg-white/10 hover:text-white"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="mailto:hello@takeitrip.es"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/70 transition-all hover:bg-white/10 hover:text-white"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">Producto</h3>
            <ul className="space-y-3">
              {footerLinks.producto.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                  >
                    <span className="h-1 w-1 rounded-full bg-white/30 transition-all group-hover:w-2 group-hover:bg-white" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">Destinos</h3>
            <ul className="space-y-3">
              {footerLinks.destinos.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                  >
                    <span className="h-1 w-1 rounded-full bg-white/30 transition-all group-hover:w-2 group-hover:bg-white" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                  >
                    <span className="h-1 w-1 rounded-full bg-white/30 transition-all group-hover:w-2 group-hover:bg-white" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} Takeitrip. Todos los derechos reservados.
          </p>
          <Link
            href="/chat"
            className="group flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
          >
            Prueba el chat IA
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </footer>
  );
}