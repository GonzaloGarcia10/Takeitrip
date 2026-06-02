import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Cookies | Takeitrip",
  description: "Cómo utilizamos las cookies en Takeitrip.",
};

export default function CookiesPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
        Política de Cookies
      </h1>
      <div className="prose prose-gray dark:prose-invert max-w-none space-y-6 text-gray-600 dark:text-gray-400">
        <p><strong>Última actualización:</strong> 29 de mayo de 2026</p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">¿Qué son las cookies?</h2>
        <p>
          Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Se utilizan para recordar tus preferencias, mejorar tu experiencia y analizar cómo se utiliza el sitio.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Cookies que utilizamos</h2>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Cookies necesarias</h3>
        <p>
          Son esenciales para el funcionamiento del sitio. Permiten la autenticación, mantener tu sesión activa y Recordar tus preferencias. Sin estas cookies, el sitio no puede funcionar correctamente.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Cookies de análisis</h3>
        <p>
          Nos ayudan a entender cómo los visitantes interactúan con el sitio. Recopilan información de forma anónima, como el número de visitantes, las páginas visitadas y el tiempo de permanencia. Utilizamos esta información para mejorar el sitio.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Cookies de preferencias</h3>
        <p>
          Permiten recordar información que cambia la forma en que el sitio se comporta o parece, como tu tema de preferencia (claro/oscuro) o el idioma seleccionado.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Cookies de terceros</h3>
        <p>
          Algunos servicios externos que utilizamos pueden establecer sus propias cookies:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Google Analytics:</strong> Para analizar el tráfico del sitio</li>
          <li><strong>Google OAuth:</strong> Para el proceso de autenticación con Google</li>
          <li><strong>Booking.com:</strong> Cuando haces click en enlaces de reserva</li>
          <li><strong>Civitatis:</strong> Cuando haces click en enlaces de actividades</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Gestionar tus preferencias de cookies</h2>
        <p>
          Puedes controlar y/o eliminar las cookies como desees. Puedes eliminar todas las cookies que ya están en tu dispositivo y configurar tu navegador para que bloquee la instalación de cookies. Sin embargo, si haces esto, es posible que debas introducir manualmente algunas preferencias cada vez que visites el sitio.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Configuración por navegador</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
          <li><strong>Firefox:</strong> Opciones → Privacidad y seguridad → Cookies</li>
          <li><strong>Safari:</strong> Preferencias → Privacidad → Cookies</li>
          <li><strong>Edge:</strong> Configuración → Cookies y permisos de sitio</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Cambios en esta política</h2>
        <p>
          Podemos actualizar esta política de cookies periodicamente. Cualquier cambio será publicado en esta página con la fecha de la última actualización.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Contacto</h2>
        <p>
          Si tienes preguntas sobre nuestra política de cookies, puedes contactarnos a través de nuestro correo electrónico.
        </p>
      </div>
    </main>
  );
}
