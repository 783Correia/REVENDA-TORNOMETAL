"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { products, type Product } from "@/lib/products-data"
import { WHATSAPP_NUMBER } from "@/lib/constants"

// ─── Types ───────────────────────────────────────────────────────────────────

interface CartItem {
  product: Product
  qty: number
}

// ─── Derived data ────────────────────────────────────────────────────────────

const ALL_BRANDS = ["Todos", ...Array.from(new Set(products.map(p => p.brand).filter(Boolean))).sort()]
const ALL_CATEGORIES = ["Todas", ...Array.from(new Set(products.map(p => p.category))).sort()]

// ─── WhatsApp message builder ─────────────────────────────────────────────────

function buildWhatsAppUrl(cart: CartItem[]): string {
  const lines = cart.map(({ product, qty }) => {
    const code = product.code ? ` (${product.code})` : ""
    return `• ${product.name}${code} — ${qty} un`
  })
  const message = [
    "Olá! Gostaria de cotar os seguintes itens:",
    "",
    ...lines,
    "",
    `Total: ${cart.length} ${cart.length === 1 ? "item" : "itens"}`,
  ].join("\n")

  const phone = WHATSAPP_NUMBER.replace(/\D/g, "")
  return `https://wa.me/55${phone}?text=${encodeURIComponent(message)}`
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({
  product,
  inCart,
  onAdd,
}: {
  product: Product
  inCart: boolean
  onAdd: () => void
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.22 }}
      className="group flex flex-col rounded-xl border border-[#E2E8F0] bg-white overflow-hidden hover:shadow-md hover:border-[#2BAAD4]/40 transition-all duration-200"
    >
      {/* Image */}
      <div className="relative aspect-square bg-[#F8FAFC] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
          unoptimized
        />
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-3 gap-2">
        {product.brand && (
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#2BAAD4]">
            {product.brand}
          </span>
        )}
        <p className="text-[12px] font-medium text-[#0F172A] leading-snug line-clamp-3 flex-1">
          {product.name}
        </p>
        {product.code && (
          <p className="text-[10px] text-[#94A3B8] font-mono">{product.code}</p>
        )}

        <button
          onClick={onAdd}
          className={`mt-1 w-full rounded-lg py-2 text-[12px] font-bold transition-all duration-200 ${
            inCart
              ? "bg-[#00FF66]/15 text-[#00AA44] border border-[#00FF66]/40"
              : "bg-[#0D3D5C] text-white hover:bg-[#1B8DC0]"
          }`}
        >
          {inCart ? "✓ Adicionado" : "+ Adicionar"}
        </button>
      </div>
    </motion.div>
  )
}

// ─── Cart Drawer ──────────────────────────────────────────────────────────────

function CartDrawer({
  cart,
  onClose,
  onUpdateQty,
  onRemove,
}: {
  cart: CartItem[]
  onClose: () => void
  onUpdateQty: (code: string, name: string, delta: number) => void
  onRemove: (code: string, name: string) => void
}) {
  const total = cart.reduce((acc, i) => acc + i.qty, 0)

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed right-0 top-0 h-full w-full max-w-[380px] bg-white shadow-2xl z-50 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0] bg-[#0D3D5C]">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#2BAAD4]">Seleção</p>
          <h2 className="text-white font-bold text-lg">
            {total} {total === 1 ? "item" : "itens"} selecionados
          </h2>
        </div>
        <button
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Fechar carrinho"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
            <p className="text-4xl mb-3">📋</p>
            <p className="text-[#475569] text-sm">Nenhum item selecionado ainda.</p>
            <p className="text-[#94A3B8] text-xs mt-1">Adicione produtos do catálogo.</p>
          </div>
        ) : (
          <AnimatePresence>
            {cart.map(({ product, qty }) => {
              const key = product.code || product.name
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex gap-3 items-start rounded-xl border border-[#E2E8F0] p-3 bg-[#F8FAFC]"
                >
                  <div className="relative w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-white border border-[#E2E8F0]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-1"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-medium text-[#0F172A] leading-tight line-clamp-2">
                      {product.name}
                    </p>
                    {product.code && (
                      <p className="text-[10px] text-[#94A3B8] font-mono mt-0.5">{product.code}</p>
                    )}
                    {/* Qty controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onUpdateQty(product.code, product.name, -1)}
                        className="w-6 h-6 rounded-md bg-white border border-[#E2E8F0] text-[#0F172A] text-sm font-bold flex items-center justify-center hover:border-[#2BAAD4] transition-colors"
                      >
                        −
                      </button>
                      <span className="text-sm font-bold text-[#0F172A] w-6 text-center">{qty}</span>
                      <button
                        onClick={() => onUpdateQty(product.code, product.name, +1)}
                        className="w-6 h-6 rounded-md bg-white border border-[#E2E8F0] text-[#0F172A] text-sm font-bold flex items-center justify-center hover:border-[#2BAAD4] transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemove(product.code, product.name)}
                    className="text-[#94A3B8] hover:text-red-400 transition-colors mt-0.5 flex-shrink-0"
                    aria-label="Remover"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </button>
                </motion.div>
              )
            })}
          </AnimatePresence>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-[#E2E8F0] flex flex-col gap-3">
        {cart.length > 0 && (
          <div className="rounded-xl bg-[#F0F9FF] border border-[#2BAAD4]/20 p-3">
            <p className="text-[11px] text-[#475569] leading-relaxed">
              Ao clicar em enviar, abrirá o WhatsApp com a lista formatada para o Rafael verificar disponibilidade e preços.
            </p>
          </div>
        )}
        <a
          href={cart.length > 0 ? buildWhatsAppUrl(cart) : undefined}
          target="_blank"
          rel="noopener noreferrer"
          onClick={cart.length === 0 ? (e) => e.preventDefault() : undefined}
          className={`flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition-all duration-200 ${
            cart.length > 0
              ? "bg-[#25D366] text-white hover:bg-[#20BD5A]"
              : "bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed"
          }`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Enviar Pedido via WhatsApp
        </a>
      </div>
    </motion.div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Catalogo() {
  const [search, setSearch] = useState("")
  const [brand, setBrand] = useState("Todos")
  const [category, setCategory] = useState("Todas")
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)

  // Cart helpers
  function getCartKey(p: Product) {
    return p.code || p.name
  }

  function addToCart(product: Product) {
    setCart(prev => {
      const key = getCartKey(product)
      const exists = prev.find(i => getCartKey(i.product) === key)
      if (exists) return prev
      return [...prev, { product, qty: 1 }]
    })
  }

  function updateQty(code: string, name: string, delta: number) {
    setCart(prev =>
      prev
        .map(i => {
          const key = getCartKey(i.product)
          if (key === (code || name)) return { ...i, qty: Math.max(1, i.qty + delta) }
          return i
        })
    )
  }

  function removeFromCart(code: string, name: string) {
    setCart(prev => prev.filter(i => getCartKey(i.product) !== (code || name)))
  }

  function isInCart(product: Product) {
    return cart.some(i => getCartKey(i.product) === getCartKey(product))
  }

  // Filtered products
  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchBrand = brand === "Todos" || p.brand === brand
      const matchCat = category === "Todas" || p.category === category
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.code.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase())
      return matchBrand && matchCat && matchSearch
    })
  }, [search, brand, category])

  const cartTotal = cart.reduce((acc, i) => acc + i.qty, 0)

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0D3D5C] border-b border-white/10 shadow-lg">
        <div className="max-w-[1200px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Logo text fallback */}
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#2BAAD4]">
                Catálogo Exclusivo
              </span>
              <span className="text-white font-bold text-[15px] leading-tight">
                Torno Metal Everton Lopes
              </span>
            </div>
          </div>

          {/* Cart button */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors px-4 py-2.5 text-white text-sm font-semibold"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <span className="hidden sm:inline">Seleção</span>
            {cartTotal > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#00FF66] text-[10px] font-black text-black">
                {cartTotal}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white border-b border-[#E2E8F0] sticky top-16 z-30 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-4 py-3 flex flex-col gap-3">
          {/* Search */}
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Buscar por nome, código ou marca..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] pl-9 pr-4 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#2BAAD4] focus:outline-none focus:ring-2 focus:ring-[#2BAAD4]/20 transition-all"
            />
          </div>

          {/* Brand chips */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {ALL_BRANDS.map(b => (
              <button
                key={b}
                onClick={() => setBrand(b)}
                className={`flex-shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold transition-all ${
                  brand === b
                    ? "bg-[#0D3D5C] text-white"
                    : "bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"
                }`}
              >
                {b}
              </button>
            ))}
          </div>

          {/* Category chips */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {ALL_CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`flex-shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold transition-all ${
                  category === c
                    ? "bg-[#2BAAD4] text-white"
                    : "bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="max-w-[1200px] mx-auto px-4 py-3">
        <p className="text-[12px] text-[#94A3B8]">
          {filtered.length} {filtered.length === 1 ? "produto encontrado" : "produtos encontrados"}
        </p>
      </div>

      {/* Product grid */}
      <div className="max-w-[1200px] mx-auto px-4 pb-24">
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          <AnimatePresence mode="popLayout">
            {filtered.map(product => (
              <ProductCard
                key={product.code || product.name}
                product={product}
                inCart={isInCart(product)}
                onAdd={() => {
                  addToCart(product)
                  setCartOpen(true)
                }}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-[#475569] font-medium">Nenhum produto encontrado</p>
            <p className="text-[#94A3B8] text-sm mt-1">Tente outros filtros ou termos de busca</p>
          </div>
        )}
      </div>

      {/* Floating cart button (mobile) */}
      <AnimatePresence>
        {cartTotal > 0 && !cartOpen && (
          <motion.button
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            onClick={() => setCartOpen(true)}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 rounded-full bg-[#25D366] px-6 py-3.5 text-white font-bold shadow-lg hover:bg-[#20BD5A] transition-colors sm:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Ver seleção ({cartTotal})
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cart backdrop + drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setCartOpen(false)}
            />
            <CartDrawer
              cart={cart}
              onClose={() => setCartOpen(false)}
              onUpdateQty={updateQty}
              onRemove={removeFromCart}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
