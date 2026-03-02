# CLAUDE.md — Torno Metal Everton Lopes | Landing Page Revendas

## Visão do Projeto

Landing page B2B para converter revendas de peças agrícolas e oficinas mecânicas em compradores recorrentes da Torno Metal — fabricante direto de peças para plantadeiras.

**Público:** Profissionais técnicos que já compram peças para plantadeiras em volume. Sabem o que querem. Não precisam ser educados sobre o produto.

**Tom:** Direto, técnico, sem enrolação. Zero comparação com concorrentes.

---

## Stack

- Next.js 14 (App Router)
- Tailwind CSS
- shadcn/ui
- Framer Motion
- TypeScript

---

## Design System

### Cores (globals.css)

```css
:root {
  --color-primary:        #1B8DC0;
  --color-primary-dark:   #0D3D5C;
  --color-primary-light:  #2BAAD4;
  --color-bg:             #E8EAEC;
  --color-surface:        #FFFFFF;
  --color-dark:           #0A1628;
  --color-text:           #0F172A;
  --color-text-muted:     #475569;
  --color-border:         #E2E8F0;
  --color-whatsapp:       #25D366;
}
```

### Tipografia

```css
/* Google Fonts: Inter */
/* Importar em layout.tsx */

--text-hero:  clamp(40px, 6vw, 72px) / font-weight: 700 / line-height: 1.05;
--text-h2:    clamp(28px, 3.5vw, 44px) / font-weight: 600 / line-height: 1.15;
--text-h3:    22px / font-weight: 600;
--text-body:  16px / font-weight: 400 / line-height: 1.7;
--text-label: 11px / font-weight: 700 / uppercase / letter-spacing: 0.1em;
```

### Espaçamento

```
Section padding Y: py-24 (desktop) / py-14 (mobile)
Container: max-w-[1200px] mx-auto px-6
Card border-radius: rounded-2xl
Button border-radius: rounded-lg
```

---

## Componentes Base

### ImagePlaceholder
**IMPORTANTE: Usar em TODOS os lugares de imagem. Nunca usar URLs externas ou gerar imagens.**

```tsx
// components/ImagePlaceholder.tsx
interface Props {
  label: string
  className?: string
}

export function ImagePlaceholder({ label, className = '' }: Props) {
  return (
    <div className={`bg-gray-300 flex flex-col items-center justify-center gap-2 ${className}`}>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <path d="m21 15-5-5L5 21"/>
      </svg>
      <span className="text-gray-500 text-xs font-medium text-center px-4">{label}</span>
    </div>
  )
}
```

### Botão WhatsApp

```tsx
// Link padrão para todos os CTAs
const WHATSAPP_URL = "https://wa.me/55XXXXXXXXXXX?text=Olá,%20quero%20consultar%20estoque%20e%20preços"
// SUBSTITUIR o número antes de publicar
```

### Animações Framer Motion (padrão do projeto)

```tsx
// lib/animations.ts
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } }
}

export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
}

export const float = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 3.5, ease: 'easeInOut', repeat: Infinity }
  }
}

// Sempre usar viewport={{ once: true, margin: "-80px" }} nos whileInView
```

---

## Assets

| Arquivo | Caminho | Uso |
|---|---|---|
| Logo principal | `/public/Logo_Torno_Metal.png` | Navbar (fundo escuro) |
| Logo branco | `/public/Logo_Torno_Metal_white.png` | Footer |

---

## Regras Globais

1. **Sempre mobile first** — todas as seções devem funcionar em 375px
2. **Scroll suave** — `html { scroll-behavior: smooth }` no globals.css
3. **Animações com viewport** — `viewport={{ once: true, margin: "-80px" }}`
4. **ImagePlaceholder obrigatório** — nunca `<img src="url-externa">` ou URLs de stock
5. **Sem conteúdo inventado** — só o copy do PRD, sem adicionar texto próprio
6. **TypeScript** — todos os componentes com tipagem
7. **Acessibilidade** — sempre `alt` em imagens, `aria-label` em botões de ícone

---

## Seções do Projeto (ordem)

1. Navbar
2. Hero
3. Métricas
4. Copy Central
5. Benefícios
6. Categorias
7. Depoimentos
8. CTA Final
9. Footer
