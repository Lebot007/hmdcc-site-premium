'use client'

import Image from 'next/image'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, MapPin, X } from 'lucide-react'
import { Reveal, Section, SectionHeader } from './bits'
import { cn } from '@/lib/utils'

const facilities = [
  { src: '/images/estrutura/pilotis.jpg', name: 'Pilotis', desc: 'Acolhimento e circulação' },
  { src: '/images/estrutura/avc.jpg', name: 'Unidade de AVC', desc: 'A maior de Minas Gerais' },
  { src: '/images/estrutura/cti.jpg', name: 'CTI', desc: 'Terapia intensiva' },
  { src: '/images/estrutura/centro-cirurgico.jpg', name: 'Centro Cirúrgico', desc: 'Alta complexidade' },
  { src: '/images/estrutura/cdi-real.jpg', name: 'CDI', desc: 'Diagnóstico por imagem' },
  { src: '/images/estrutura/enfermaria.jpg', name: 'Enfermarias', desc: 'Internação clínica' },
  { src: '/images/estrutura/udc.jpg', name: 'UDC', desc: 'Unidade de Decisão Clínica' },
  { src: '/images/estrutura/ambulatorio.jpg', name: 'Ambulatório', desc: 'Consultas especializadas' },
  { src: '/images/estrutura/hospital-dia.jpg', name: 'Hospital-Dia', desc: 'Cirurgias ambulatoriais' },
  { src: '/images/estrutura/laboratorio.jpg', name: 'Laboratório', desc: 'Análises clínicas' },
  { src: '/images/estrutura/transfusional.jpg', name: 'Agência Transfusional', desc: 'Hemoterapia' },
  { src: '/images/estrutura/cme.jpg', name: 'CME', desc: 'Central de Material Esterilizado' },
  { src: '/images/estrutura/pneumatico.jpg', name: 'Correio Pneumático', desc: 'Logística interna' },
  { src: '/images/estrutura/dispensario.jpg', name: 'Dispensário Eletrônico', desc: 'Farmácia automatizada' },
  { src: '/images/estrutura/solario.jpg', name: 'Solário', desc: 'Bem-estar de pacientes e equipes' },
  { src: '/images/estrutura/sala-familia.jpg', name: 'Sala da Família', desc: 'Apoio a acompanhantes' },
  { src: '/images/estrutura/auditorio.jpg', name: 'Auditório', desc: 'Ensino e eventos científicos' },
]

const awards = [
  {
    src: '/images/premios/himss.png',
    name: 'HIMSS',
    desc: 'Certificação internacional em maturidade de gestão de tecnologia da saúde',
  },
  {
    src: '/images/premios/angels.png',
    name: 'Angels Awards',
    desc: 'Reconhecimento mundial à excelência no tratamento de AVC',
  },
  {
    src: '/images/premios/pdh21.png',
    name: 'Prêmio Dr. Décio Gomes',
    desc: 'Destaque em humanização e qualidade na saúde pública',
  },
]

export function Structure() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  function openLightbox(i: number) {
    setLightbox(i)
  }

  function step(dir: 1 | -1) {
    setLightbox((cur) =>
      cur === null ? null : (cur + dir + facilities.length) % facilities.length
    )
  }

  return (
    <>
      {/* --------------------------- Galeria Estrutura -------------------------- */}
      <Section id="galeria-estrutura" className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              eyebrow="Estrutura · Galeria"
              title={
                <>
                  Conheça o hospital <em className="italic font-light text-teal-700">por dentro</em>
                </>
              }
              description="Uma estrutura completa e avançada, pensada para o cuidado integral — da urgência à reabilitação, do diagnóstico ao ensino. Clique nas imagens para ampliar."
              className="max-w-2xl"
            />
            <Reveal delay={0.15}>
              <div className="flex items-center gap-3 rounded-2xl border border-hairline bg-ivory px-6 py-5">
                <MapPin className="h-5 w-5 text-teal-600" aria-hidden />
                <p className="text-sm leading-snug text-petrol-800">
                  <strong className="font-semibold">17 ambientes</strong>
                  <br />
                  <span className="text-ink-soft">em galeria interativa</span>
                </p>
              </div>
            </Reveal>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {facilities.map((facility, i) => (
              <Reveal key={facility.src} delay={0.03 * (i % 8)}>
                <button
                  type="button"
                  onClick={() => openLightbox(i)}
                  className={cn(
                    'group relative block w-full overflow-hidden rounded-2xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2',
                    i === 0 && 'col-span-2 row-span-2 sm:col-span-2 sm:row-span-2'
                  )}
                  aria-label={`Ampliar foto: ${facility.name}`}
                >
                  <div
                    className={cn(
                      'relative',
                      i === 0 ? 'aspect-square sm:aspect-[4/3]' : 'aspect-[4/3]'
                    )}
                  >
                    <Image
                      src={facility.src}
                      alt={`${facility.name} — Hospital Metropolitano Dr. Célio de Castro`}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-petrol-950/80 via-petrol-950/10 to-transparent opacity-80 transition-opacity group-hover:opacity-100"
                      aria-hidden
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className={cn('font-display font-medium text-white', i === 0 ? 'text-lg' : 'text-[15px]')}>
                      {facility.name}
                    </p>
                    <p className="mt-0.5 text-[11px] leading-tight text-petrol-100/75">
                      {facility.desc}
                    </p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[70] flex items-center justify-center bg-petrol-950/92 p-4 backdrop-blur-md sm:p-8"
              onClick={() => setLightbox(null)}
              role="dialog"
              aria-modal="true"
              aria-label={`Foto ampliada: ${facilities[lightbox].name}`}
            >
              <button
                className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-white transition-colors hover:bg-white/15"
                onClick={() => setLightbox(null)}
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
              <button
                className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors hover:bg-white/15 sm:left-8"
                onClick={(e) => {
                  e.stopPropagation()
                  step(-1)
                }}
                aria-label="Foto anterior"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors hover:bg-white/15 sm:right-8"
                onClick={(e) => {
                  e.stopPropagation()
                  step(1)
                }}
                aria-label="Próxima foto"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              <motion.figure
                key={lightbox}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="max-h-full max-w-4xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                  <Image
                    src={facilities[lightbox].src}
                    alt={`${facilities[lightbox].name} — Hospital Metropolitano Dr. Célio de Castro`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 900px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                  <span className="font-display text-xl font-medium text-white">
                    {facilities[lightbox].name}
                  </span>
                  <span className="text-xs font-medium tabular text-petrol-100/60">
                    {lightbox + 1} / {facilities.length}
                  </span>
                </figcaption>
              </motion.figure>
            </motion.div>
          )}
        </AnimatePresence>
      </Section>

      {/* ------------------------------ Prêmios -------------------------------- */}
      <Section id="premios" className="border-t border-hairline bg-ivory py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-10 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-teal-600" aria-hidden />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-700">
                Certificações e reconhecimentos
              </span>
            </div>
          </Reveal>
          <div className="grid items-center gap-10 sm:grid-cols-3">
            {awards.map((award, i) => (
              <Reveal key={award.name} delay={0.08 * i}>
                <div className="group flex flex-col items-center text-center">
                  <div className="flex h-28 w-full items-center justify-center rounded-2xl border border-hairline bg-white p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-petrol-950/[0.06]">
                    <Image
                      src={award.src}
                      alt={`Selo ${award.name}`}
                      width={200}
                      height={110}
                      className="max-h-16 w-auto object-contain"
                    />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-medium text-petrol-900">
                    {award.name}
                  </h3>
                  <p className="mt-1.5 max-w-[260px] text-[13px] leading-relaxed text-ink-soft">
                    {award.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
    </>
  )
}
