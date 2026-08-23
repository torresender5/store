"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Product } from "@/lib/types"
import ProductCard from "./ProductCard"

interface ProductGridProps {
  products: Product[]
  onSelectProduct: (product: Product) => void
}

export default function ProductGrid({ products, onSelectProduct }: ProductGridProps) {
  return (
    <motion.div
      layout
      className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
    >
      <AnimatePresence mode="popLayout">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <ProductCard
              product={product}
              index={index}
              onSelect={onSelectProduct}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
