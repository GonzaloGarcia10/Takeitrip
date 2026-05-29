"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="mb-8 text-9xl font-bold text-blue-600">404</div>
        <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Página no encontrada
        </h1>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          Lo siento, la página que buscas no existe o ha sido movida.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/">
            <Button>
              <Home className="mr-2 h-4 w-4" />
              Volver al inicio
            </Button>
          </Link>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver atrás
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
