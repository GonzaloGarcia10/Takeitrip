"use client";

import React from "react";
import { motion } from "framer-motion";

type Stat = { value: string; label: string };

export default function StatsClient({ stats }: { stats: Stat[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-8"
    >
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <div className="text-2xl font-bold text-white sm:text-3xl">{stat.value}</div>
          <div className="text-sm text-white/40">{stat.label}</div>
        </div>
      ))}
    </motion.div>
  );
}
