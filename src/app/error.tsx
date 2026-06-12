"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  if (process.env.NODE_ENV === "development") {
    console.error("[Error Boundary]", error);
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-4 text-6xl">⚠️</div>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Algo salió mal
        </h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.
        </p>
        <Button onClick={reset}>Intentar de nuevo</Button>
      </div>
    </div>
  );
}
