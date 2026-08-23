"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Category, Product } from "@/lib/types"
import Header from "@/components/Header"
import FilterBar from "@/components/FilterBar"
import ProductGrid from "@/components/ProductGrid"
import ProductModal from "@/components/ProductModal"
import Footer from "@/components/Footer"
import { Sparkles, ArrowRight } from "lucide-react"

interface HomeClientProps {
  products: Product[]
}

export default function HomeClient({ products }: HomeClientProps) {
  const [activeFilter, setActiveFilter] = useState<Category | "todos">("todos")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const filteredProducts = useMemo(() => {
    if (activeFilter === "todos") return products
    return products.filter((p) => p.category === activeFilter)
  }, [activeFilter, products])

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-white to-purple-50" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-56 h-56 bg-purple-100 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Nueva Colección 2026
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-zinc-900 tracking-tight mb-6">
              Expresa tu{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-600">
                estilo
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-500 max-w-2xl mx-auto mb-8">
              Descubre piezas únicas que definen tu personalidad. Moda
              contemporánea con calidad premium.
            </p>

            <motion.a
              href="#catalogo"
              className="inline-flex items-center gap-2 bg-zinc-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-zinc-800 transition-colors"
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver Catálogo
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      <section id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-3">
            Catálogo
          </h2>
          <p className="text-zinc-500">
            Explora nuestra selección de {products.length} productos
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <FilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ProductGrid
              products={filteredProducts}
              onSelectProduct={setSelectedProduct}
            />
          </motion.div>
        </AnimatePresence>

        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-zinc-400 text-lg">
              No hay productos en esta categoría
            </p>
          </motion.div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />

          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              ¿Primera compra?
            </h2>
            <p className="text-zinc-300 mb-6 max-w-md mx-auto">
              Obtén un 15% de descuento en tu primer pedido. Escríbenos por
              WhatsApp y menciona el código{" "}
              <span className="font-bold text-accent-light">BIENVENIDO15</span>
            </p>
            <motion.a
              href="https://wa.me/5491112345678?text=Hola! Quiero mi descuento de bienvenida con el código BIENVENIDO15"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#20BD5A] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Reclamar descuento
            </motion.a>
          </div>
        </motion.div>
      </section>

      <Footer />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  )
}
