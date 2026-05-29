import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asistente de Viajes con IA",
  description:
    "Chatea con Takeitrip y recibe recomendaciones personalizadas de hoteles, zonas y destinos. Asistente de viajes inteligente gratuito.",
  openGraph: {
    title: "Asistente de Viajes con IA | Takeitrip",
    description:
      "Obtén recomendaciones personalizadas de hoteles y destinos mediante nuestro asistente de inteligencia artificial.",
    type: "website",
  },
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
