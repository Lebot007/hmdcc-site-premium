'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, BedDouble, ShieldCheck, Siren } from 'lucide-react'

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
}

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-petrol-950">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-fachada.jpg"
          alt="Fachada do Hospital Metropolitano Dr. Célio de Castro em Belo Horizonte"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-petrol-950/95 via-petrol-950/80 to-petrol-950/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-petrol-950 via-transparent to-petrol-950/40" />
        <div className="blueprint absolute inset-0 opacity-60" aria-hidden />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-4 pb-16 pt-40 sm:px-6 lg:px-8 lg:pb-24">
        <div className="max-w-3xl">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, ease: [0.21, 0.65, 0.35, 1] }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-teal-400/30 bg-teal-500/10 px-4 py-2 backdrop-blur-sm"
          >
            <ShieldCheck className="h-4 w-4 text-teal-300" aria-hidden />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-200">
              100% SUS · Belo Horizonte e Região Metropolitana
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.21, 0.65, 0.35, 1] }}
            className="font-display text-[2.6rem] leading-[1.05] font-medium tracking-tight text-white sm:text-6xl lg:text-[4.4rem]"
          >
            O melhor lugar
            <br />
            para receber{' '}
            <em className="font-light italic text-teal-300">cuidado</em>.
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.65, 0.35, 1] }}
            className="mt-7 max-w-xl text-base leading-relaxed text-petrol-100/85 sm:text-lg"
          >
            O Hospital Metropolitano Dr. Célio de Castro é referência nacional em
            seu modelo de gestão — um hospital geral de retaguarda com estrutura
            de alta complexidade, atendimento centrado no paciente e pioneirismo
            no tratamento de AVC pelo SUS de Belo Horizonte.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.21, 0.65, 0.35, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#modelo-atendimento"
              className="group inline-flex items-center gap-2.5 rounded-full bg-teal-600 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-teal-500 hover:shadow-xl hover:shadow-teal-500/25"
            >
              Conheça nosso atendimento
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </a>
            <a
              href="#sou-paciente"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
            >
              Sou paciente
            </a>
          </motion.div>
        </div>

        {/* Floating facts */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.21, 0.65, 0.35, 1] }}
          className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md sm:grid-cols-3"
        >
          {[
            {
              icon: BedDouble,
              value: '460',
              label: 'leitos em operação, 100% dedicados ao SUS',
            },
            {
              icon: Siren,
              value: '1ª do SUS-BH',
              label: 'a ofertar trombectomia mecânica para AVC',
            },
            {
              icon: ShieldCheck,
              value: 'Nota 100',
              label: 'no NPS de satisfação dos pacientes por 7 meses seguidos',
            },
          ].map((item) => (
            <div
              key={item.value}
              className="flex items-center gap-4 bg-petrol-950/55 px-6 py-5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-500/15 ring-1 ring-teal-400/25">
                <item.icon className="h-5 w-5 text-teal-300" aria-hidden />
              </span>
              <div>
                <p className="font-display text-xl font-semibold text-white">
                  {item.value}
                </p>
                <p className="mt-0.5 text-xs leading-snug text-petrol-100/70">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block"
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-white/25 p-1.5"
        >
          <span className="h-2 w-1 rounded-full bg-teal-300" />
        </motion.div>
      </motion.div>
    </section>
  )
}
