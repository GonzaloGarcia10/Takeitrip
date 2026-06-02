import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | Takeitrip",
  description: "Política de privacidad de Takeitrip. Cómo recopilamos, usamos y protegemos tus datos personales.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
        Política de Privacidad
      </h1>
      <div className="prose prose-gray dark:prose-invert max-w-none space-y-6 text-gray-600 dark:text-gray-400">
        <p><strong>Última actualización:</strong> 29 de mayo de 2026</p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">1. Datos que recopilamos</h2>
        <p>
          Takeitrip recopila los siguientes datos cuando utilizas nuestro servicio:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Información de tu cuenta de Google (nombre, email, foto) al iniciar sesión</li>
          <li>Conversaciones y mensajes que mantienes con nuestro asistente de viajes</li>
          <li>Búsquedas y preferencias de viaje que nos indicas</li>
          <li>Datos de uso del sitio (páginas visitadas, tiempo de permanencia)</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">2. Cómo usamos tus datos</h2>
        <p>Utilizamos tus datos para:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Proporcionarte recomendaciones de viaje personalizadas</li>
          <li>Mejorar la calidad de nuestro asistente de IA</li>
          <li>Analizar el uso del sitio para optimizar la experiencia</li>
          <li>Mostrarte hoteles y actividades relevantes a través de nuestros socios afiliados (Booking.com, Civitatis)</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">3. Cookies y tecnologías de rastreo</h2>
        <p>
          Utilizamos cookies propias y de terceros para mejorar tu experiencia, analizar el tráfico y personalizar el contenido. Puedes gestionar tus preferencias de cookies en cualquier momento desde la configuración de tu navegador.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">4. Compartir datos con terceros</h2>
        <p>
          Compartimos información con nuestros socios afiliados cuando haces click en enlaces de reserva:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Booking.com:</strong> Cuando haces click en un enlace de reserva, Booking.com recibe tu consulta de búsqueda. No compartimos tus datos personales directamente.</li>
          <li><strong>Civitatis:</strong> Cuando exploras actividades, Civitatis puede recibir información de la consulta.</li>
          <li><strong>OpenAI:</strong> Utilizamos la API de OpenAI para procesar tus conversaciones. Los datos se procesan según su política de privacidad.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">5. Seguridad de los datos</h2>
        <p>
          Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos contra acceso no autorizado, alteración, divulgación o destrucción. Todos los datos se transmiten mediante conexiones cifradas (HTTPS).
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">6. Tus derechos</h2>
        <p>Tienes derecho a:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Acceder a tus datos personales</li>
          <li>Rectificar datos inexactos</li>
          <li>Solicitar la eliminación de tus datos</li>
          <li>Oponerte al procesamiento de tus datos</li>
          <li>Solicitar la portabilidad de tus datos</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">7. Contacto</h2>
        <p>
          Si tienes preguntas sobre esta política de privacidad, puedes contactarnos a través de nuestro correo electrónico de contacto.
        </p>
      </div>
    </main>
  );
}
