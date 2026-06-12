"use client";

import { useEffect, useState } from "react";

export function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="mx-auto max-w-4xl rounded-xl border border-white/10 bg-black/95 backdrop-blur p-4 shadow-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <p className="text-sm text-white/80">
              Usamos cookies para mejorar tu experiencia y mostrar anuncios relevantes. Al continuar, aceptas nuestra{" "}
              <a href="/cookies" className="text-blue-400 hover:underline">política de cookies</a>.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={accept}
              className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}