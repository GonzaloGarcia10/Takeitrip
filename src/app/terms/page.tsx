import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones | Takeitrip",
  description: "Términos y condiciones de uso de Takeitrip.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
        Términos y Condiciones
      </h1>
      <div className="prose prose-gray dark:prose-invert max-w-none space-y-6 text-gray-600 dark:text-gray-400">
        <p><strong>Última actualización:</strong> 29 de mayo de 2026</p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">1. Aceptación de los términos</h2>
        <p>
          Al acceder y utilizar Takeitrip, aceptas estos términos y condiciones en su totalidad. Si no estás de acuerdo con alguno de estos términos, no utilices el servicio.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">2. Descripción del servicio</h2>
        <p>
          Takeitrip es un asistente de viajes impulsado por inteligencia artificial que proporciona recomendaciones personalizadas de hoteles, destinos y actividades turísticas. El servicio incluye:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Chat conversacional con IA para recomendaciones de viaje</li>
          <li>Búsqueda de hoteles con precios de Booking.com</li>
          <li>Búsqueda de tours y actividades de Civitatis</li>
          <li>Contenido informativo sobre destinos turísticos</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">3. Limitación de responsabilidad</h2>
        <p>
          Takeitrip actúa como intermediario tecnológico. Las recomendaciones generadas por IA son orientativas y pueden no ser 100% precisas. Los precios, disponibilidad y condiciones de reserva son proporcionados por Booking.com y Civitatis, y pueden cambiar sin previo aviso. Takeitrip no se hace responsable de:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Errores en los precios o disponibilidad mostrados</li>
          <li>Cambios en las condiciones de los proveedores</li>
          <li>Cancelaciones o problemas con reservas realizadas a través de terceros</li>
          <li>Decisiones de viaje basadas en las recomendaciones del asistente</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">4. Enlaces de afiliado</h2>
        <p>
          Takeitrip contiene enlaces de afiliado a Booking.com y Civitatis. Cuando haces click en estos enlaces y realizas una reserva, podemos recibir una comisión. Esto no genera ningún coste adicional para ti. El uso de estos enlaces está sujeto a las condiciones de cada plataforma.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">5. Uso aceptable</h2>
        <p>Al utilizar Takeitrip, te comprometes a:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>No usar el servicio para fines ilegales o no autorizados</li>
          <li>No intentar acceder de forma no autorizada a sistemas o datos</li>
          <li>No sobrecargar deliberadamente el servicio con solicitudes automatizadas</li>
          <li>Proporcionar información veraz en tus consultas</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">6. Propiedad intelectual</h2>
        <p>
          Todo el contenido, diseño, código fuente y marcas de Takeitrip están protegidos por las leyes de propiedad intelectual. No está permitido copiar, modificar o distribuir nuestro contenido sin autorización.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">7. Cambios en los términos</h2>
        <p>
          Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán efectivos desde su publicación en esta página. Te recomendamos revisar periódicamente esta sección.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">8. Contacto</h2>
        <p>
          Para preguntas sobre estos términos, puedes contactarnos a través de nuestro correo electrónico.
        </p>
      </div>
    </main>
  );
}
