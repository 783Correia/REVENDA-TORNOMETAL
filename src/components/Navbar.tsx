"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Info, Star, Package } from "lucide-react"

const navLinks = [
  { label: "Sobre", href: "/#sobre", icon: <Info size={16} /> },
  { label: "Benefícios", href: "/#beneficios", icon: <Star size={16} /> },
  { label: "Produtos", href: "/#produtos", icon: <Package size={16} /> },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 w-full h-[72px] lg:h-20 z-50 transition-all duration-300 ${scrolled || menuOpen
        ? "bg-[#113d5e]/95 backdrop-blur-md border-b border-white/[0.06] shadow-sm"
        : "bg-transparent border-b border-transparent"
        }`}
    >
      <div className="max-w-[1120px] h-full w-full mx-auto px-5 flex items-center justify-between">
        <a href="/" aria-label="Torno Metal Everton Lopes — Início">
          <Image
            src="/Logo_Torno_Metal.png"
            alt="Torno Metal Everton Lopes"
            width={56}
            height={56}
            priority
            className="h-12 md:h-14 w-auto"
          />
        </a>

        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/50 text-[13px] font-medium hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#formulario"
          className="hidden lg:flex items-center gap-2 rounded-lg px-4 py-2 text-[13px] font-semibold text-black transition-all duration-200 hover:scale-[1.02]"
          style={{ background: "linear-gradient(90deg, #00FFcc 0%, #00FF66 100%)" }}
        >
          Garanta seu estoque
        </a>

        <button
          className="lg:hidden text-white/70"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="fixed top-[80px] right-4 w-[280px] z-[100] flex flex-col bg-[#0F172A]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl py-3 transform animate-in fade-in slide-in-from-top-4 lg:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-white/80 text-[15px] font-medium hover:text-white hover:bg-white/5 rounded-xl transition-all"
            >
              <div className="bg-white/10 p-1.5 rounded-md text-[#2BAAD4]">
                {link.icon}
              </div>
              {link.label}
            </a>
          ))}

          <div className="h-px bg-white/10 w-full my-2"></div>

          <a
            href="#formulario"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center gap-2 mt-1 mx-2 rounded-xl px-5 py-3 font-semibold text-black transition-colors"
            style={{ background: "linear-gradient(90deg, #00FFcc 0%, #00FF66 100%)" }}
          >
            Garanta seu estoque
          </a>
        </div>
      )}
    </nav>
  )
}
