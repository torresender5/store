"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Product } from "@/lib/types"
import { X, MessageCircle, Heart, Truck, Shield, RotateCcw } from "lucide-react"

interface ProductModalProps {
  product: Product | null
  onClose: () => void
}

const WHATSAPP_NUMBER = "5491112345678"

export default function ProductModal({ product, onClose }: ProductModalProps) {
  if (!product) return null

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hola, me interesa el producto: ${product.name} - $${product.price.toFixed(2)}`
  )}`

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors shadow-sm"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col md:flex-row">
              <div className="relative w-full md:w-1/2 aspect-[4/5] md:aspect-auto md:min-h-[500px]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <button
                  className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm rounded-full p-2.5 hover:bg-white transition-colors shadow-sm"
                  aria-label="Agregar a favoritos"
                >
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col">
                <div className="flex-1">
                  <span className="inline-block bg-accent/10 text-accent text-xs font-semibold px-3 py-1 rounded-full capitalize mb-3">
                    {product.category}
                  </span>

                  <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-2">
                    {product.name}
                  </h2>

                  <p className="text-3xl font-bold text-accent mb-4">
                    ${product.price.toFixed(2)}
                  </p>

                  <p className="text-zinc-600 leading-relaxed mb-6">
                    {product.description}
                  </p>

                  <div className="mb-6">
                    <p className="text-sm font-semibold text-zinc-900 mb-3">
                      Tallas disponibles
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          className="px-4 py-2 border-2 border-zinc-200 rounded-xl text-sm font-medium hover:border-accent hover:text-accent transition-colors focus:border-accent focus:text-accent"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <motion.a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold py-4 rounded-2xl transition-colors animate-glow"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <MessageCircle className="w-5 h-5" />
                    Comprar por WhatsApp
                  </motion.a>

                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div className="flex flex-col items-center gap-1 text-center">
                      <Truck className="w-4 h-4 text-zinc-400" />
                      <span className="text-[10px] text-zinc-500 leading-tight">
                        Envío gratis +$100
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-center">
                      <Shield className="w-4 h-4 text-zinc-400" />
                      <span className="text-[10px] text-zinc-500 leading-tight">
                        Garantía 30 días
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-center">
                      <RotateCcw className="w-4 h-4 text-zinc-400" />
                      <span className="text-[10px] text-zinc-500 leading-tight">
                        Devolución fácil
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
