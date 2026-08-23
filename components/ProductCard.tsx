"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Product } from "@/lib/types"
import { Eye } from "lucide-react"

interface ProductCardProps {
  product: Product
  index: number
  onSelect: (product: Product) => void
}

export default function ProductCard({ product, index, onSelect }: ProductCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="group relative cursor-pointer"
      onClick={() => onSelect(product)}
    >
      <div className="relative overflow-hidden rounded-2xl bg-zinc-100 aspect-[4/5]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          whileHover={{ scale: 1 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg"
          >
            <Eye className="w-6 h-6 text-zinc-900" />
          </motion.div>
        </motion.div>

        <div className="absolute top-3 right-3">
          <span className="bg-white/90 backdrop-blur-sm text-zinc-900 text-xs font-semibold px-3 py-1 rounded-full capitalize">
            {product.category}
          </span>
        </div>
      </div>

      <div className="mt-4 px-1">
        <h3 className="font-semibold text-zinc-900 group-hover:text-accent transition-colors line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center justify-between mt-1">
          <p className="text-lg font-bold text-accent">
            ${product.price.toFixed(2)}
          </p>
          <div className="flex gap-1">
            {product.sizes.slice(0, 3).map((size) => (
              <span
                key={size}
                className="text-[10px] font-medium text-zinc-400 border border-zinc-200 rounded px-1.5 py-0.5"
              >
                {size}
              </span>
            ))}
            {product.sizes.length > 3 && (
              <span className="text-[10px] font-medium text-zinc-400">
                +{product.sizes.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
