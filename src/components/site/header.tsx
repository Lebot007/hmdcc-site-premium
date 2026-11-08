'use client'

import { useEffect, useState } from 'react'
import {
  Activity,
  Contrast,
  ChevronDown,
  FileQuestion,
  HandHeart,
  Menu,
  Phone,
  ScrollText,
  Stethoscope,
  Users,
  X,
} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const quickLinks = [
  { label: 'Dúvidas Frequentes', href: '#faq', icon: FileQuestion },
  { label: 'Modelo de Atendimento', href: '#modelo-atendimento', icon: Stethoscope },
  { label: 'Trabalhe Conosco', href: '#carreiras', icon: Users },
  { label: 'Ouvidoria', href: '#ouvidoria', icon: HandHeart },
  { label: 'Boletim Médico e Visitas', href: '#sou-paciente', icon: ScrollText },
]

const navLinks = [
  { label: 'O HMDCC', href: '#o-hmdcc' },
  { label: 'Compras', href: '#compras' },
  { label: 'NEPE', href: '#nepe' },
  { label: 'Vagas', href: '#carreiras' },
  { label: 'Sou Paciente', href: '#sou-paciente' },
  { label: 'Contato', href: '#contato' },
  { label: 'Notícias', href: '#noticias' },
  { label: 'Transparência', href: '#transparencia' },
]

// No menu desktop "Sou Paciente" fica apenas no dropdown Atendimento e na
// barra de utilidades — evita quebra de linha na largura do breakpoint xl
const desktopLinks = navLinks.filter((l) => l.label !== 'Sou Paciente')

function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <a href="#inicio" className="flex items-center gap-3 group" aria-label="Início">
      <span
        className={cn(
          'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors',
          dark ? 'bg-teal-500/15 ring-1 ring-teal-400/30' : 'bg-petrol-900'
        )}
      >
        <Image
          src="/images/logo-hmdcc-branca.png"
          alt=""
          width={40}
          height={17}
          className="h-[22px] w-auto"
        />
      </span>
      <span className="leading-none">
        <span
          className={cn(
            'block font-display text-[17px] font-semibold tracking-tight',
            dark ? 'text-white' : 'text-petrol-900'
          )}
        >
          Hospital Célio de Castro
        </span>
        <span
          className={cn(
            'mt-1 block text-[10px] font-medium uppercase tracking-[0.24em]',
            dark ? 'text-teal-300' : 'text-teal-700'
          )}
        >
          Metropolitano · SUS BH
        </span>
      </span>
    </a>
  )
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [altoContraste, setAltoContraste] = useState(false)

  useEffect(() => {
    // Alto contraste persistente (acessibilidade) — aplica a classe no HTML
    // e reflete no botão após o paint para evitar re-render em cascata
    const salvo = localStorage.getItem('hmdcc-alto-contraste') === 'on'
    document.documentElement.classList.toggle('alto-contraste', salvo)
    const t = setTimeout(() => setAltoContraste(salvo), 0)
    return () => clearTimeout(t)
  }, [])

  function alternarContraste() {
    setAltoContraste((atual) => {
      const novo = !atual
      document.documentElement.classList.toggle('alto-contraste', novo)
      localStorage.setItem('hmdcc-alto-contraste', novo ? 'on' : 'off')
      return novo
    })
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Utility bar */}
      <div
        className={cn(
          'bg-petrol-950 text-petrol-100 transition-all duration-500 overflow-hidden',
          scrolled ? 'max-h-0' : 'max-h-12'
        )}
      >
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="hidden lg:flex items-center gap-6">
            {quickLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group inline-flex items-center gap-1.5 whitespace-nowrap text-[11.5px] font-medium tracking-wide text-petrol-200 transition-colors hover:text-teal-300"
              >
                <link.icon className="h-3 w-3 text-teal-400" aria-hidden />
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="tel:+553134724000"
            className="inline-flex items-center gap-2 whitespace-nowrap text-[11.5px] font-semibold tracking-wide text-white lg:ml-auto"
          >
            <Phone className="h-3.5 w-3.5 text-teal-400" aria-hidden />
            (31) 3472-4000
          </a>
          <span className="hidden whitespace-nowrap text-[11px] text-petrol-300/70 xl:block">
            Rua Dona Luiza, 311 · Milionários · Belo Horizonte/MG
          </span>
          <button
            onClick={alternarContraste}
            aria-pressed={altoContraste}
            title="Alto contraste"
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition-colors ${
              altoContraste
                ? 'bg-teal-400 text-petrol-950'
                : 'bg-white/10 text-petrol-100 hover:bg-white/20'
            }`}
          >
            <Contrast className="h-3.5 w-3.5" aria-hidden />
            <span className="hidden 2xl:inline">Alto contraste</span>
          </button>
        </div>
      </div>

      {/* Main header */}
      <div
        className={cn(
          'transition-all duration-500',
          scrolled
            ? 'bg-ivory/90 shadow-[0_1px_0_0_var(--color-hairline),0_12px_32px_-16px_rgba(8,46,56,0.25)] backdrop-blur-xl'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          <Logo dark={!scrolled} />

          <nav className="hidden xl:flex items-center gap-0.5" aria-label="Navegação principal">
            {desktopLinks.slice(0, 3).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'whitespace-nowrap rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors 2xl:px-3 2xl:text-[13.5px]',
                  scrolled
                    ? 'text-petrol-800 hover:bg-petrol-900/[0.06] hover:text-petrol-950'
                    : 'text-ivory hover:bg-white/10 hover:text-teal-300'
                )}
              >
                {link.label}
              </a>
            ))}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className={cn(
                  'inline-flex items-center gap-1 whitespace-nowrap rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors 2xl:px-3 2xl:text-[13.5px]',
                  scrolled
                    ? 'text-petrol-800 hover:bg-petrol-900/[0.06] hover:text-petrol-950'
                    : 'text-ivory hover:bg-white/10 hover:text-teal-300'
                )}
                aria-expanded={servicesOpen}
              >
                Atendimento
                <ChevronDown
                  className={cn('h-3.5 w-3.5 transition-transform', servicesOpen && 'rotate-180')}
                  aria-hidden
                />
              </button>
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-2"
                  >
                    <div className="overflow-hidden rounded-2xl border border-hairline bg-white p-2 shadow-xl shadow-petrol-950/10">
                      {[
                        { label: 'Modelo de Atendimento', href: '#modelo-atendimento' },
                        { label: 'Estrutura e Exames (CDI)', href: '#estrutura' },
                        { label: 'NEPE — Ensino e Pesquisa', href: '#nepe' },
                        { label: 'Boletim Médico e Visitas', href: '#sou-paciente' },
                        { label: 'Dúvidas Frequentes', href: '#faq' },
                      ].map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          className="block rounded-xl px-4 py-3 text-sm font-medium text-petrol-800 transition-colors hover:bg-sand hover:text-petrol-950"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {desktopLinks.slice(3).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'whitespace-nowrap rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors 2xl:px-3 2xl:text-[13.5px]',
                  scrolled
                    ? 'text-petrol-800 hover:bg-petrol-900/[0.06] hover:text-petrol-950'
                    : 'text-ivory hover:bg-white/10 hover:text-teal-300'
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contato"
              className={cn(
                'hidden sm:inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold text-white transition-all hover:shadow-lg',
                scrolled
                  ? 'bg-petrol-900 hover:bg-petrol-800 hover:shadow-petrol-900/20'
                  : 'bg-teal-600 hover:bg-teal-500 hover:shadow-teal-600/30'
              )}
            >
              <Activity className="h-4 w-4 text-white" aria-hidden />
              Fale conosco
            </a>
            <button
              className={cn(
                'inline-flex h-11 w-11 items-center justify-center rounded-xl border transition-colors xl:hidden',
                scrolled
                  ? 'border-hairline bg-white/80 text-petrol-900'
                  : 'border-white/25 bg-white/10 text-white backdrop-blur-sm'
              )}
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-petrol-950/60 backdrop-blur-sm xl:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-hairline px-6 py-5">
                <Logo />
                <button
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sand text-petrol-900"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Fechar menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-4 py-6" aria-label="Menu móvel">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                    className="flex items-center justify-between rounded-xl px-4 py-3.5 font-display text-lg font-medium text-petrol-900 transition-colors hover:bg-sand"
                  >
                    {link.label}
                    <ChevronDown className="h-4 w-4 -rotate-90 text-teal-600" aria-hidden />
                  </motion.a>
                ))}
                <div className="mt-6 border-t border-hairline pt-6">
                  <p className="px-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-soft">
                    Acesso rápido
                  </p>
                  <div className="mt-2 space-y-1">
                    {quickLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-petrol-800 transition-colors hover:bg-sand"
                      >
                        <link.icon className="h-4 w-4 text-teal-600" aria-hidden />
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </nav>
              <div className="border-t border-hairline bg-ivory px-6 py-5">
                <a
                  href="tel:+553134724000"
                  className="flex items-center gap-3 text-sm font-semibold text-petrol-900"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-petrol-900">
                    <Phone className="h-4 w-4 text-teal-300" aria-hidden />
                  </span>
                  (31) 3472-4000
                </a>
                <p className="mt-3 text-xs leading-relaxed text-ink-soft">
                  Rua Dona Luiza, 311 — Milionários · Belo Horizonte/MG
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
