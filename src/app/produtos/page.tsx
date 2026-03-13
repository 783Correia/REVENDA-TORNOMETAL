"use client"

import { useMemo, useState } from "react"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { motion } from "framer-motion"
import { fadeUp } from "@/lib/animations"
import { ImagePlaceholder } from "@/components/ImagePlaceholder"
import produtosExtraidos from "../../../produtos_extraidos.json"

interface StoreProduct {
  name: string
  price: string
  link: string
}

const storeProducts: StoreProduct[] = produtosExtraidos as StoreProduct[]

const ALL_CATEGORIES_LABEL = "Todas as categorias"

function getCategoryFromName(name: string): string {
  return name.trim().split(" ")[0]
}

const categories = [
  ALL_CATEGORIES_LABEL,
  ...Array.from(
    new Set(storeProducts.map((product) => getCategoryFromName(product.name)))
  ),
]

export default function ProdutosPage() {
  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORIES_LABEL)

  const filteredProducts = useMemo(() => {
    if (activeCategory === ALL_CATEGORIES_LABEL) return storeProducts
    return storeProducts.filter(
      (product) => getCategoryFromName(product.name) === activeCategory
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
                e clique para abrir o produto direto na loja.
              </p>
            </motion.div>

            <motion.div
              className="mt-8 flex flex-wrap gap-2"
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
                    className={`rounded-lg px-4 py-2 text-[13px] font-medium border transition-colors ${
                      isActive
                        ? "bg-[#113d5e] text-white border-[#113d5e]"
                        : "bg-white text-[#334155] border-[#E2E8F0] hover:bg-[#EFF6FF]"
                    }`}
                  >
                    {category}
                  </button>
                )
              })}
            </motion.div>

            <motion.div
              className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              {filteredProducts.map((product) => (
                <article
                  key={product.link}
                  className="group rounded-xl overflow-hidden bg-white border border-[#E2E8F0] shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#1B8DC0]/30 hover:-translate-y-1 flex flex-col"
                >
                  <ImagePlaceholder
                    label={product.name}
                    className="aspect-[4/3] sm:aspect-square w-full"
                  />
                  <div className="px-4 py-3 border-t border-[#F1F5F9] bg-white flex flex-col gap-1">
                    <p className="text-[13px] font-medium text-[#0F172A] line-clamp-2 min-h-[36px]">
                      {product.name}
                    </p>
                    <p className="text-[13px] font-semibold text-[#1B8DC0]">
                      {product.price}
                    </p>
                    <a
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center justify-center gap-2 text-[12px] font-semibold text-white bg-[#113d5e] rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-[#0c2f4a]"
                    >
                      Ver na loja
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </article>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

