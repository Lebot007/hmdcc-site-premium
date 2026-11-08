'use client'

import { useEffect, useState } from 'react'
import {
  ArrowUp,
  Cookie,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Youtube,
} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const footerNav = {
  Institucional: [
    { label: 'O HMDCC', href: '#o-hmdcc' },
    { label: 'História e PPP', href: '#o-hmdcc' },
    { label: 'Transparência', href: '#transparencia' },
    { label: 'Notícias', href: '#noticias' },
  ],
  Atendimento: [
    { label: 'Modelo de Atendimento', href: '#modelo-atendimento' },
    { label: 'Estrutura e Exames', href: '#estrutura' },
    { label: 'NEPE', href: '#nepe' },
    { label: 'Dúvidas Frequentes', href: '#faq' },
  ],
  'Para você': [
    { label: 'Sou Paciente', href: '#sou-paciente' },
    { label: 'Boletim e Visitas', href: '#sou-paciente' },
    { label: 'Ouvidoria', href: '#ouvidoria' },
    { label: 'Contato', href: '#contato' },
  ],
  Oportunidades: [
    { label: 'Trabalhe Conosco', href: '#carreiras' },
    { label: 'Vagas e Editais', href: '#carreiras' },
    { label: 'Residência Médica', href: '#nepe' },
    { label: 'Compras e Fornecedores', href: '#compras' },
  ],
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-2.31-2.83V9.35a6.35 6.35 0 1 0 5.76 6.39V8.74a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.17z" />
    </svg>
  )
}

const socials = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://br.linkedin.com/company/hmdcc' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/hmdccsusquedacerto/' },
  { icon: Youtube, label: 'YouTube', href: 'https://www.youtube.com/@hmdcc' },
  { icon: TikTokIcon, label: 'TikTok', href: 'https://www.tiktok.com/@susquedacerto' },
]

export function Footer() {
  return (
    <footer className="grain relative mt-auto bg-petrol-950 text-petrol-100">
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <a href="#inicio" className="flex items-center gap-3" aria-label="Início">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-500/15 ring-1 ring-teal-400/30">
                <Image
                  src="/images/logo-hmdcc-branca.png"
                  alt=""
                  width={44}
                  height={19}
                  className="h-6 w-auto"
                />
              </span>
              <span className="leading-tight">
                <span className="block font-display text-lg font-semibold tracking-tight text-white">
                  Hospital Célio de Castro
                </span>
                <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.24em] text-teal-300">
                  Metropolitano · SUS BH
                </span>
              </span>
            </a>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-petrol-100/65">
              Hospital Metropolitano Dr. Célio de Castro — um Serviço Social
              Autônomo, sem fins lucrativos, dedicado integralmente ao SUS.
              O melhor lugar para receber cuidado.
            </p>
            <div className="mt-7 space-y-3">
              <a
                href="tel:+553134724000"
                className="flex items-center gap-3 text-sm font-medium text-petrol-100 transition-colors hover:text-teal-300"
              >
                <Phone className="h-4 w-4 text-teal-400" aria-hidden />
                (31) 3472-4000
              </a>
              <p className="flex items-center gap-3 text-sm text-petrol-100/75">
                <MapPin className="h-4 w-4 text-teal-400" aria-hidden />
                Rua Dona Luiza, 311 — Milionários · Belo Horizonte/MG
              </p>
            </div>
            <div className="mt-8 flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-petrol-100 transition-all hover:border-teal-400/40 hover:bg-teal-500/10 hover:text-teal-300"
                >
                  <social.icon className="h-4 w-4" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {Object.entries(footerNav).map(([group, links]) => (
              <div key={group}>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-300">
                  {group}
                </h3>
                <ul className="mt-5 space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-petrol-100/70 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-petrol-100/50">
            © {new Date().getFullYear()} Hospital Metropolitano Dr. Célio de Castro ·
            Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a href="#inicio" className="text-xs text-petrol-100/50 transition-colors hover:text-teal-300">
              Política de Cookies
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-petrol-100 transition-all hover:border-teal-400/40 hover:text-teal-300"
              aria-label="Voltar ao topo"
            >
              <ArrowUp className="h-3.5 w-3.5" aria-hidden />
              Topo
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ------------------------------ Cookie banner ------------------------------ */

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem('hmdcc-cookies')
    if (!accepted) {
      const t = setTimeout(() => setVisible(true), 1600)
      return () => clearTimeout(t)
    }
  }, [])

  function choose(value: 'accepted' | 'rejected') {
    localStorage.setItem('hmdcc-cookies', value)
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.45, ease: [0.21, 0.65, 0.35, 1] }}
          className="fixed bottom-4 left-4 right-4 z-[60] mx-auto max-w-2xl"
          role="dialog"
          aria-label="Aviso de cookies"
        >
          <div className="rounded-2xl border border-white/10 bg-petrol-950/95 p-6 shadow-2xl backdrop-blur-xl sm:p-7">
            <div className="flex items-start gap-4">
              <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-500/15 ring-1 ring-teal-400/25 sm:flex">
                <Cookie className="h-5 w-5 text-teal-300" aria-hidden />
              </span>
              <div>
                <p className="text-sm leading-relaxed text-petrol-100/90">
                  Este site usa cookies — pequenos arquivos de texto colocados em
                  sua máquina para ajudar o site a fornecer uma melhor experiência
                  de usuário.{' '}
                  <a href="#inicio" className="font-semibold text-teal-300 underline-offset-2 hover:underline">
                    Política de Cookies
                  </a>
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Button
                    size="sm"
                    className="rounded-full bg-teal-600 px-6 hover:bg-teal-500"
                    onClick={() => choose('accepted')}
                  >
                    Aceitar todos os cookies
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full border-white/20 bg-transparent px-6 text-petrol-100 hover:bg-white/10 hover:text-white"
                    onClick={() => choose('rejected')}
                  >
                    Rejeitar todos os cookies
                  </Button>
                  <span className="text-[11px] text-petrol-100/45">
                    Você pode modificar suas preferências a qualquer momento.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
