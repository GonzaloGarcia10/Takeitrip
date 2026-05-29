"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  MousePointerClick,
  Search,
  Users,
  TrendingUp,
  Hotel,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Stats {
  totalClicks: number;
  totalSearches: number;
  topClicks: { hotelName: string; city: string; _count: { id: number } }[];
  topSearches: { city: string | null; _count: { id: number } }[];
}

export default function AdminPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/clicks?days=30").then((r) => r.json()),
      fetch("/api/searches?days=30").then((r) => r.json()),
    ]).then(([clicksData, searchesData]) => {
      setStats({
        totalClicks: clicksData.totalClicks || 0,
        totalSearches: searchesData.searches?.length || 0,
        topClicks: clicksData.clicks || [],
        topSearches: searchesData.searches || [],
      });
      setLoading(false);
    });
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Panel de Administración
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Métricas y analytics de tu asistente de viajes.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="mb-4 h-4 w-24" />
                  <Skeleton className="h-8 w-16" />
                </CardContent>
              </Card>
            ))
          : [
              { title: "Clics en Afiliados", value: stats?.totalClicks || 0, icon: MousePointerClick, color: "text-blue-600" },
              { title: "Búsquedas", value: stats?.totalSearches || 0, icon: Search, color: "text-green-600" },
              { title: "Hoteles Populares", value: stats?.topClicks.length || 0, icon: Hotel, color: "text-purple-600" },
              { title: "Destinos Buscados", value: stats?.topSearches.length || 0, icon: TrendingUp, color: "text-orange-600" },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {stat.title}
                          </p>
                          <p className="text-3xl font-bold text-gray-900 dark:text-white">
                            {stat.value}
                          </p>
                        </div>
                        <Icon className={`h-8 w-8 ${stat.color}`} />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
      </div>

      {/* Top Hotels */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MousePointerClick className="h-5 w-5" />
              Hoteles más clickeados
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : stats?.topClicks.length ? (
              <div className="space-y-3">
                {stats.topClicks.slice(0, 10).map((click, index) => (
                  <div
                    key={`${click.hotelName}-${index}`}
                    className="flex items-center justify-between rounded-lg border border-gray-100 p-3 dark:border-gray-800"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {click.hotelName}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {click.city}
                      </p>
                    </div>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                      {click._count.id} clics
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400">
                No hay datos disponibles aún
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Ciudades más buscadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : stats?.topSearches.length ? (
              <div className="space-y-3">
                {stats.topSearches.slice(0, 10).map((search, index) => (
                  <div
                    key={`${search.city}-${index}`}
                    className="flex items-center justify-between rounded-lg border border-gray-100 p-3 dark:border-gray-800"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {search.city || "Sin ciudad"}
                      </p>
                    </div>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-600 dark:bg-green-900 dark:text-green-400">
                      {search._count.id} búsquedas
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400">
                No hay datos disponibles aún
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
