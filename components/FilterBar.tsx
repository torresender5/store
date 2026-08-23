"use client"

import { motion } from "framer-motion"
import { Category } from "@/lib/types"
import { User, Users, Watch } from "lucide-react"

interface FilterBarProps {
  activeFilter: Category | "todos"
  onFilterChange: (filter: Category | "todos") => void
}

const filters: { label: string; value: Category | "todos"; icon: React.ReactNode }[] = [
  { label: "Todos", value: "todos", icon: <Watch className="w-4 h-4" /> },
  { label: "Hombre", value: "hombre", icon: <User className="w-4 h-4" /> },
  { label: "Mujer", value: "mujer", icon: <Users className="w-4 h-4" /> },
  { label: "Accesorios", value: "accesorios", icon: <Watch className="w-4 h-4" /> },
]

export default function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {filters.map((filter) => (
        <motion.button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`relative flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm font-medium transition-colors ${
            activeFilter === filter.value
              ? "text-white"
              : "text-zinc-600 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {activeFilter === filter.value && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 bg-zinc-900 rounded-full"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative flex items-center gap-2">
            {filter.icon}
            {filter.label}
          </span>
        </motion.button>
      ))}
    </div>
  )
}
