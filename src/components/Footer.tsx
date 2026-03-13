import Image from "next/image"
import { WHATSAPP_URL, WHATSAPP_NUMBER, INSTAGRAM_URL, INSTAGRAM_HANDLE, WEBSITE_URL, COMPANY_LOCATION } from "@/lib/constants"

const navLinks = [
  { label: "Sobre", href: "/#sobre" },
  { label: "Benefícios", href: "/#beneficios" },
  { label: "Catálogo", href: "/produtos" },
]

export function Footer() {
  return (
    <footer id="footer" className="bg-[#113d5e] border-t border-white/[0.06]">
      <div className="max-w-[1120px] mx-auto px-5 pt-14 pb-8">
        <div className="grid md:grid-cols-4 gap-10 pb-10 border-b border-white/[0.06]">
          {/* Brand */}
          <div className="md:col-span-2">
            <Image
              src="/Logo_Torno_Metal_white.png"
              alt="Torno Metal Everton Lopes"
              width={140}
              height={40}
              className="h-9 w-auto"
            />
            <p className="text-white/30 text-[13px] mt-3 max-w-[280px] leading-relaxed">
              Fabricante de peças para plantadeiras há mais de 25 anos. Atendendo revendas e oficinas em todo o Brasil.
            </p>
            <p className="text-white/20 text-[12px] mt-3 flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[#2BAAD4] inline-block" />
              {COMPANY_LOCATION}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50 mb-4 block">
              Navegação
            </span>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white/30 hover:text-white/60 text-[13px] transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-white/60 text-[13px] transition-colors duration-200"
              >
                WhatsApp
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50 mb-4 block">
              Contato
            </span>
            <div className="flex flex-col gap-2">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-white/60 text-[13px] transition-colors duration-200"
              >
                WhatsApp: {WHATSAPP_NUMBER}
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-white/60 text-[13px] transition-colors duration-200"
              >
                Instagram: {INSTAGRAM_HANDLE}
              </a>
              <a
                href={WEBSITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-white/60 text-[13px] transition-colors duration-200"
              >
                Loja: tornometalevertonlopes.com.br
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-white/15 text-[12px]">
            © {new Date().getFullYear()} Torno Metal Everton Lopes. Todos os direitos reservados.
          </p>
          <p className="text-white/15 text-[12px]">
            {COMPANY_LOCATION}
          </p>
        </div>
      </div>
    </footer>
  )
}
