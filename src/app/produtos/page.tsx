"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { motion } from "framer-motion"
import { fadeUp } from "@/lib/animations"
import { ImagePlaceholder } from "@/components/ImagePlaceholder"
import { MessageCircle } from "lucide-react"
import { WHATSAPP_URL } from "@/lib/constants"
import produtosExtraidos from "../../../produtos_extraidos.json"

interface StoreProduct {
  name: string
  price: string
  link: string
  image?: string
  categories?: string[]
}

const storeProducts: StoreProduct[] = produtosExtraidos as StoreProduct[]

const ALL_CATEGORIES_LABEL = "Todos os produtos"



function getCategoryForProduct(product: StoreProduct): string[] {
  if (product.categories && product.categories.length > 0) {
    return product.categories;
  }
  return [];
}

// Generate unique categories list from products
const uniqueCategories = Array.from(new Set(storeProducts.flatMap(p => getCategoryForProduct(p)))).sort();

const categories: string[] = [
  ALL_CATEGORIES_LABEL,
  ...uniqueCategories
]

export default function ProdutosPage() {
  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORIES_LABEL)

  const filteredProducts = useMemo(() => {
    if (activeCategory === ALL_CATEGORIES_LABEL) return storeProducts
    return storeProducts.filter(
      (product) => getCategoryForProduct(product).includes(activeCategory)
    )
  }, [activeCategory])

  return (
    <>
      <Navbar />

      <main className="bg-[#F7F8FA] min-h-screen pb-16">
        <section className="pt-24 md:pt-28">
          <div className="max-w-[1120px] mx-auto px-5">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1B8DC0]">
                Catálogo completo
              </span>

              <h1
                className="mt-4 font-semibold text-[#0F172A] leading-[1.1]"
                style={{ fontSize: "clamp(26px, 3vw, 38px)" }}
              >
                Peças para plantadeiras em estoque
              </h1>

              <p className="mt-3 text-[#475569] text-[15px] max-w-[620px]">
                Todos os itens do catálogo extraídos da loja Torno Metal. Filtre por categoria
                e navegue pelo catálogo completo aqui na página.
              </p>
            </motion.div>

            <motion.div
              className="mt-8 flex overflow-x-auto pb-4 gap-2 scrollbar-hide no-scrollbar -mx-5 px-5 md:mx-0 md:px-0 md:flex-wrap"
              style={{
                WebkitOverflowScrolling: "touch",
                msOverflowStyle: "none",
                scrollbarWidth: "none"
              }}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              {categories.map((category) => {
                const isActive = category === activeCategory
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`shrink-0 rounded-full px-5 py-2.5 text-[14px] font-medium border transition-all duration-300 ${isActive
                      ? "bg-[#113d5e] text-white border-[#113d5e] shadow-md shadow-[#113d5e]/20"
                      : "bg-white text-[#334155] border-[#E2E8F0] hover:bg-[#EFF6FF] hover:border-[#1B8DC0]/30"
                      }`}
                  >
                    {category}
                  </button>
                )
              })}
            </motion.div>

            <motion.div
              className="mt-6 md:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              {filteredProducts.map((product) => {
                const whatsappMessage = encodeURIComponent(`Olá, gostei do produto: ${product.name} no valor de ${product.price}. Gostaria de mais informações.`);
                const whatsappLink = `${WHATSAPP_URL}?text=${whatsappMessage}`;

                return (
                  <article
                    key={product.link}
                    className="group relative rounded-2xl overflow-hidden bg-white border border-[#E2E8F0]/80 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-[#1B8DC0]/10 hover:border-[#1B8DC0]/30 hover:-translate-y-1.5 flex flex-col h-full"
                  >
                    <div className="bg-[#f8fafc] w-full p-4 relative flex items-center justify-center">
                      {product.image ? (
                        <div className="relative aspect-[4/3] w-full mix-blend-multiply transition-transform duration-500 group-hover:scale-105">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                          />
                        </div>
                      ) : (
                        <ImagePlaceholder
                          label={product.name}
                          className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                    </div>

                    <div className="px-5 py-5 border-t border-[#F1F5F9] bg-white flex flex-col flex-1">
                      <h3 className="text-[15px] font-medium text-[#0F172A] leading-snug line-clamp-2 md:line-clamp-3 mb-3 flex-1">
                        {product.name}
                      </h3>

                      <div className="mt-auto flex flex-col gap-3">
                        <p className="text-[16px] font-bold text-[#1B8DC0]">
                          {product.price}
                        </p>

                        <a
                          href={whatsappLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold text-[14px] py-2.5 rounded-xl transition-colors mt-1"
                        >
                          <MessageCircle size={18} fill="currentColor" className="text-white" />
                          Comprar via WhatsApp
                        </a>
                      </div>
                    </div>
                  </article>
                )
              })}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

