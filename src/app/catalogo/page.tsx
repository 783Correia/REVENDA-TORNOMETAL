"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { products, type Product } from "@/lib/products-data"
import { WHATSAPP_NUMBER } from "@/lib/constants"

// ─── Types ────────────────────────────────────────────────────────────────────

interface CartItem {
  product: Product
  qty: number
}

// ─── Derived data ─────────────────────────────────────────────────────────────

const ALL_BRANDS = ["Todos", ...Array.from(new Set(products.map(p => p.brand).filter(Boolean))).sort()]
const ALL_CATEGORIES = ["Todas", ...Array.from(new Set(products.map(p => p.category))).sort()]

// ─── WhatsApp ─────────────────────────────────────────────────────────────────

function buildWhatsAppUrl(cart: CartItem[]): string {
  const lines = cart.map(({ product, qty }) => {
    const code = product.code ? ` — Ref: ${product.code}` : ""
    return `• ${product.name}${code} | Qtd: ${qty}`
  })
  const message = [
    "Olá! Gostaria de cotar os seguintes itens:",
    "",
    ...lines,
    "",
    `Total: ${cart.length} ${cart.length === 1 ? "referência" : "referências"}`,
    "",
    "Aguardo disponibilidade e preços. Obrigado!",
  ].join("\n")

  const phone = WHATSAPP_NUMBER.replace(/\D/g, "")
  return `https://wa.me/55${phone}?text=${encodeURIComponent(message)}`
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconSearch() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
    </svg>
  )
}
function IconX({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
function IconWhatsApp() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ product, inCart, onAdd }: { product: Product; inCart: boolean; onAdd: () => void }) {
  return (
    <div className="flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-[#2BAAD4]/50 hover:shadow-lg transition-all duration-200 group">
      {/* Image */}
      <div className="relative bg-white" style={{ paddingBottom: "75%" }}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-4"
          unoptimized
        />
        {product.brand && (
          <span className="absolute top-2 left-2 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#0D3D5C]">
            {product.brand}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 px-3 pt-2 pb-3 gap-2 border-t border-slate-100">
        <p className="text-[12px] font-semibold text-slate-800 leading-snug line-clamp-2 flex-1">
          {product.name}
        </p>
        {product.code && (
          <p className="text-[10px] text-slate-400 font-mono"># {product.code}</p>
        )}
        <button
          onClick={onAdd}
          className={`w-full rounded-xl py-2 text-[11px] font-bold tracking-wide uppercase transition-all duration-150 ${
            inCart
              ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
              : "bg-[#0D3D5C] text-white hover:bg-[#1B8DC0] active:scale-95"
          }`}
        >
          {inCart ? "✓ Na seleção" : "+ Adicionar"}
        </button>
      </div>
    </div>
  )
}

// ─── Cart Drawer ──────────────────────────────────────────────────────────────

function CartDrawer({ cart, onClose, onUpdateQty, onRemove }: {
  cart: CartItem[]
  onClose: () => void
  onUpdateQty: (key: string, delta: number) => void
  onRemove: (key: string) => void
}) {
  const totalItems = cart.reduce((a, i) => a + i.qty, 0)

  return (
    <motion.aside
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 320, damping: 32 }}
      className="fixed right-0 top-0 h-full w-full max-w-[400px] bg-white shadow-2xl z-50 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-[#0D3D5C]">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#2BAAD4] mb-0.5">Sua Seleção</p>
          <p className="text-white font-bold text-[17px]">
            {totalItems} {totalItems === 1 ? "item" : "itens"}
          </p>
        </div>
        <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
          <IconX />
        </button>
      </div>

      {/* Items list */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
              </svg>
            </div>
            <p className="font-semibold text-slate-700">Seleção vazia</p>
            <p className="text-slate-400 text-sm mt-1">Adicione produtos do catálogo</p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {cart.map(({ product, qty }) => {
              const key = product.code || product.name
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.18 }}
                  className="flex gap-3 items-center bg-slate-50 rounded-xl p-3 border border-slate-100"
                >
                  <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-white border border-slate-200">
                    <Image src={product.image} alt={product.name} fill className="object-contain p-1" unoptimized />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-slate-800 line-clamp-2 leading-snug">{product.name}</p>
                    {product.code && <p className="text-[10px] text-slate-400 font-mono mt-0.5"># {product.code}</p>}
                    {/* Qty */}
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <button onClick={() => onUpdateQty(key, -1)} className="w-5 h-5 rounded-md bg-white border border-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center hover:border-[#2BAAD4] transition-colors">−</button>
                      <span className="text-xs font-bold text-slate-800 w-5 text-center">{qty}</span>
                      <button onClick={() => onUpdateQty(key, +1)} className="w-5 h-5 rounded-md bg-white border border-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center hover:border-[#2BAAD4] transition-colors">+</button>
                    </div>
                  </div>
                  <button onClick={() => onRemove(key)} className="text-slate-300 hover:text-red-400 transition-colors flex-shrink-0">
                    <IconX size={12} />
                  </button>
                </motion.div>
              )
            })}
          </AnimatePresence>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-slate-100 space-y-3">
        {cart.length > 0 && (
          <p className="text-[11px] text-slate-400 text-center leading-relaxed">
            O WhatsApp abrirá com a lista formatada para o Rafael verificar disponibilidade.
          </p>
        )}
        <a
          href={cart.length > 0 ? buildWhatsAppUrl(cart) : undefined}
          target="_blank"
          rel="noopener noreferrer"
          onClick={cart.length === 0 ? e => e.preventDefault() : undefined}
          className={`flex items-center justify-center gap-2.5 w-full rounded-xl py-3.5 text-sm font-bold transition-all duration-200 ${
            cart.length > 0
              ? "bg-[#25D366] hover:bg-[#20BD5A] text-white"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
          }`}
        >
          <IconWhatsApp />
          Enviar Pedido via WhatsApp
        </a>
      </div>
    </motion.aside>
  )
}

// ─── Chip ─────────────────────────────────────────────────────────────────────

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition-all duration-150 ${
        active
          ? "bg-[#0D3D5C] text-white shadow-sm"
          : "bg-slate-100 text-slate-500 hover:bg-slate-200"
      }`}
    >
      {label}
    </button>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Catalogo() {
  const [search, setSearch] = useState("")
  const [brand, setBrand] = useState("Todos")
  const [category, setCategory] = useState("Todas")
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)

  function getKey(p: Product) { return p.code || p.name }

  function addToCart(product: Product) {
    setCart(prev => {
      if (prev.find(i => getKey(i.product) === getKey(product))) return prev
      return [...prev, { product, qty: 1 }]
    })
  }

  function updateQty(key: string, delta: number) {
    setCart(prev => prev.map(i => getKey(i.product) === key ? { ...i, qty: Math.max(1, i.qty + delta) } : i))
  }

  function removeFromCart(key: string) {
    setCart(prev => prev.filter(i => getKey(i.product) !== key))
  }

  function isInCart(p: Product) { return cart.some(i => getKey(i.product) === getKey(p)) }

  const filtered = useMemo(() => products.filter(p => {
    const matchBrand = brand === "Todos" || p.brand === brand
    const matchCat = category === "Todas" || p.category === category
    const q = search.toLowerCase()
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
    return matchBrand && matchCat && matchSearch
  }), [search, brand, category])

  const cartCount = cart.reduce((a, i) => a + i.qty, 0)

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Header ── */}
      <header className="sticky top-0 z-40 bg-[#0D3D5C] shadow-xl">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#2BAAD4]">Catálogo Exclusivo Revendas</p>
            <p className="text-white font-bold text-[15px] leading-none mt-0.5">Torno Metal Everton Lopes</p>
          </div>

          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors rounded-xl px-4 py-2.5 text-white text-[13px] font-semibold"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            <span className="hidden sm:inline">Seleção</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#00FF66] text-black text-[10px] font-black flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* ── Filters bar ── */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-30">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-3 space-y-2.5">
          {/* Search */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <IconSearch />
            </span>
            <input
              type="text"
              placeholder="Buscar por nome, código ou marca..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#2BAAD4] focus:ring-2 focus:ring-[#2BAAD4]/15 transition-all"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <IconX size={12} />
              </button>
            )}
          </div>

          {/* Brand row */}
          <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-0.5">
            {ALL_BRANDS.map(b => (
              <Chip key={b} label={b} active={brand === b} onClick={() => setBrand(b)} />
            ))}
          </div>

          {/* Category row */}
          <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-0.5">
            {ALL_CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`flex-shrink-0 rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition-all duration-150 ${
                  category === c
                    ? "bg-[#2BAAD4] text-white shadow-sm"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-6 pb-28">
        <p className="text-xs text-slate-400 mb-4">
          {filtered.length} {filtered.length === 1 ? "produto" : "produtos"} encontrados
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filtered.map(product => (
              <ProductCard
                key={getKey(product)}
                product={product}
                inCart={isInCart(product)}
                onAdd={() => { addToCart(product); setCartOpen(true) }}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-4">
              <IconSearch />
            </div>
            <p className="font-semibold text-slate-700">Nenhum produto encontrado</p>
            <p className="text-slate-400 text-sm mt-1">Tente outros filtros ou termos de busca</p>
            <button
              onClick={() => { setSearch(""); setBrand("Todos"); setCategory("Todas") }}
              className="mt-4 text-sm text-[#2BAAD4] font-semibold hover:underline"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>

      {/* ── Floating WhatsApp button (mobile, when cart has items) ── */}
      <AnimatePresence>
        {cartCount > 0 && !cartOpen && (
          <motion.button
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            onClick={() => setCartOpen(true)}
            className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-sm px-6 py-3.5 rounded-full shadow-xl sm:hidden transition-colors"
          >
            <IconWhatsApp />
            Ver seleção ({cartCount})
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Cart ── */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
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
