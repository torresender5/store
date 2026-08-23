"use client"

import { Globe, MessageCircle, Share2, Mail, MapPin, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold text-white">MODA</span>
            </div>
            <p className="text-sm leading-relaxed">
              Tu estilo, tu identidad. Moda contemporánea para personas que
              buscan expresar su personalidad a través de la ropa.
            </p>
            <div className="flex gap-4 mt-6">
              {[Globe, MessageCircle, Share2].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-accent flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Tienda</h3>
            <ul className="space-y-3 text-sm">
              {["Hombre", "Mujer", "Accesorios", "Nuevos Lanzamientos", "Ofertas"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="hover:text-accent transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Ayuda</h3>
            <ul className="space-y-3 text-sm">
              {[
                "Guía de Tallas",
                "Envíos y Entregas",
                "Devoluciones",
                "Preguntas Frecuentes",
                "Contacto",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-accent transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contacto</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Av. Principal 1234, Ciudad, País</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0" />
                <span>+54 9 11 1234-5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0" />
                <span>hola@modastore.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500">
            &copy; 2026 MODA Store. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-xs text-zinc-500">
            <a href="#" className="hover:text-zinc-300 transition-colors">
              Términos
            </a>
            <a href="#" className="hover:text-zinc-300 transition-colors">
              Privacidad
            </a>
            <a href="#" className="hover:text-zinc-300 transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
