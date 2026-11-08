'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight, CalendarDays, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal, Section, SectionHeader, Counter } from './bits'
import { allNews, type NewsItem } from '@/data/news'

const NEWS_POR_PAGINA = 10

const stats = [
  { value: 142095, label: 'Internações hospitalares' },
  { value: 66967, label: 'Cirurgias realizadas' },
  { value: 12590, label: 'Atendimentos AVC' },
  { value: 34466, label: 'Atendimentos CTI' },
  { value: 988363, label: 'Exames de imagem' },
  { value: 187225, label: 'Consultas especializadas*' },
  { value: 7863999, label: 'Exames laboratoriais' },
]

// Tags temáticas derivadas do título — mesmo padrão visual das notícias curadas
function tagFor(title: string): string {
  const t = title.toLowerCase()
  if (/avc|trombectomia|neuro/.test(t)) return 'Neurociências'
  if (/resid|fellowship|formatura|residentes|estud/.test(t)) return 'Ensino'
  if (/recorde|cirurgias|consulta/.test(t)) return 'Resultados'
  if (/nps|nota 100|selo|certific|qualidade/.test(t)) return 'Qualidade'
  if (/pr[eê]mio|vence|ouro|reconhec/.test(t)) return 'Reconhecimento'
  if (/mutir|doa[cç]/.test(t)) return 'Mutirão'
  if (/semin[aá]rio|simp[oó]sio|f[oó]rum|evento|semana/.test(t)) return 'Eventos'
  if (/covid|pandemia/.test(t)) return 'COVID-19'
  return 'Institucional'
}

// Janela de páginas 1 … 4 5 6 … 28 (mesmo padrão do portal original)
function pageWindow(current: number, total: number): (number | '…')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = new Set<number>([1, total, current - 1, current, current + 1])
  if (current <= 3) [2, 3, 4].forEach((p) => pages.add(p))
  if (current >= total - 2) [total - 3, total - 2, total - 1].forEach((p) => pages.add(p))
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b)
  const out: (number | '…')[] = []
  let prev = 0
  for (const p of sorted) {
    if (p - prev > 1) out.push('…')
    out.push(p)
    prev = p
  }
  return out
}

export function StatsAndNews() {
  const [page, setPage] = useState(1)
  const [lendo, setLendo] = useState<NewsItem | null>(null)
  const totalPaginas = Math.ceil(allNews.length / NEWS_POR_PAGINA)
  const inicio = (page - 1) * NEWS_POR_PAGINA
  const noticias = allNews.slice(inicio, inicio + NEWS_POR_PAGINA)

  return (
    <>
      {/* ------------------------------ Em números ----------------------------- */}
      <Section id="numeros" className="bg-ivory py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              eyebrow="Institucional"
              title={
                <>
                  O Hospital Célio de Castro{' '}
                  <em className="italic font-light text-teal-700">em números</em>
                </>
              }
              description="A dimensão do nosso compromisso com a saúde pública, traduzida em resultados concretos para a população."
            />
            <Reveal delay={0.2} className="shrink-0">
              <div className="rounded-2xl border border-hairline bg-white px-6 py-5 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
                  Fonte
                </p>
                <p className="mt-2 text-sm leading-relaxed text-petrol-800">
                  Sistema de Informação HMDCC/TASY
                  <br />
                  <span className="text-ink-soft">
                    Dados compilados até julho de 2026
                  </span>
                </p>
              </div>
            </Reveal>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="group relative bg-white p-7 transition-colors hover:bg-petrol-900 lg:p-8"
              >
                <Reveal delay={0.05 * i}>
                  <p className="font-display text-[2rem] font-semibold tracking-tight text-petrol-900 transition-colors group-hover:text-teal-300 lg:text-[2.4rem]">
                    <Counter value={stat.value} />
                  </p>
                  <p className="mt-2.5 text-[13px] font-medium leading-snug text-ink-soft transition-colors group-hover:text-petrol-100/85">
                    {stat.label}
                  </p>
                </Reveal>
                <span
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-teal-500 transition-transform duration-500 group-hover:scale-x-100"
                  aria-hidden
                />
              </div>
            ))}
            {/* Fill card for grid balance */}
            <div className="relative bg-petrol-900 p-7 lg:p-8">
              <Reveal delay={0.35}>
                <p className="font-display text-2xl font-medium leading-snug text-white">
                  Cuidado que se <em className="italic text-teal-300">mede</em> em
                  vidas.
                </p>
                <p className="mt-3 text-xs leading-relaxed text-petrol-100/70">
                  * Consultas reguladas pela Secretaria Municipal de Saúde de BH
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* ------------------------------- Notícias ------------------------------ */}
      <Section id="noticias" className="border-t border-hairline bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              eyebrow="Notícias HMDCC"
              title={
                <>
                  Últimas <em className="italic font-light text-teal-700">notícias</em>
                </>
              }
              description={`O arquivo completo da comunicação institucional — ${allNews.length} notícias publicadas desde abril de 2020.`}
              className="max-w-xl"
            />
            <Reveal delay={0.15}>
              <span className="inline-flex items-center gap-2 rounded-full bg-petrol-900 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-white">
                {allNews.length} notícias · 2020–2026
              </span>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {noticias.map((item, i) => (
              <Reveal key={`${item.day}-${item.month}-${item.year}-${i}`} delay={0.05 * (i % 4)}>
                <article
                  className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-hairline bg-ivory text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-petrol-200 hover:bg-white hover:shadow-xl hover:shadow-petrol-950/[0.09]"
                  onClick={() => setLendo(item)}
                >
                  <div className="relative aspect-[900/407] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-petrol-950/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      aria-hidden
                    />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/92 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-petrol-900 backdrop-blur-sm">
                      {tagFor(item.title)}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-ink-soft">
                      <CalendarDays className="h-3.5 w-3.5 text-teal-600" aria-hidden />
                      {item.day} de {item.month} de {item.year}
                    </span>
                    <h3 className="mt-3 font-display text-[17px] font-medium leading-snug tracking-tight text-petrol-900 transition-colors group-hover:text-petrol-950">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 hidden flex-1 text-[13px] leading-relaxed text-ink-soft lg:block">
                      {item.excerpt}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-teal-700">
                      Ler notícia completa
                      <ArrowUpRight
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden
                      />
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Paginação — mesmo comportamento do portal original */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-ink-soft">
              Página <strong className="text-petrol-900">{page}</strong> de{' '}
              <strong className="text-petrol-900">{totalPaginas}</strong> — mostrando{' '}
              <strong className="text-petrol-900">
                {inicio + 1}–{Math.min(inicio + NEWS_POR_PAGINA, allNews.length)}
              </strong>{' '}
              de <strong className="text-petrol-900">{allNews.length}</strong> notícias
            </p>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  setPage((p) => Math.max(1, p - 1))
                  document.getElementById('noticias')?.scrollIntoView({ behavior: 'smooth' })
                }}
                disabled={page === 1}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-hairline bg-white text-petrol-900 transition-colors hover:bg-sand disabled:opacity-40"
                aria-label="Página anterior"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden />
              </button>
              {pageWindow(page, totalPaginas).map((p, idx) =>
                p === '…' ? (
                  <span key={`ellipsis-${idx}`} className="px-1.5 text-sm text-ink-soft">
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => {
                      setPage(p as number)
                      document.getElementById('noticias')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className={`h-9 min-w-9 rounded-lg px-2 text-sm font-semibold transition-colors ${
                      p === page
                        ? 'bg-petrol-900 text-white'
                        : 'border border-hairline bg-white text-petrol-900 hover:bg-sand'
                    }`}
                    aria-current={p === page ? 'page' : undefined}
                  >
                    {p}
                  </button>
                )
              )}
              <button
                onClick={() => {
                  setPage((p) => Math.min(totalPaginas, p + 1))
                  document.getElementById('noticias')?.scrollIntoView({ behavior: 'smooth' })
                }}
                disabled={page === totalPaginas}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-hairline bg-white text-petrol-900 transition-colors hover:bg-sand disabled:opacity-40"
                aria-label="Próxima página"
              >
                <ChevronRight className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>
        </div>

        {/* Modal de leitura da notícia */}
        <AnimatePresence>
          {lendo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[70] flex items-center justify-center bg-petrol-950/70 p-4 backdrop-blur-sm"
              onClick={() => setLendo(null)}
              role="dialog"
              aria-modal="true"
              aria-label={lendo.title}
            >
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.98 }}
                transition={{ type: 'spring', damping: 28, stiffness: 320 }}
                className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setLendo(null)}
                  className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-petrol-900 shadow-md backdrop-blur-sm transition-colors hover:bg-white"
                  aria-label="Fechar"
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
                <div className="relative aspect-[900/407]">
                  <Image
                    src={lendo.image}
                    alt={lendo.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 672px"
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <span className="flex items-center gap-1.5 text-xs font-medium text-ink-soft">
                    <CalendarDays className="h-3.5 w-3.5 text-teal-600" aria-hidden />
                    {lendo.day} de {lendo.month} de {lendo.year}
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-medium leading-snug tracking-tight text-petrol-900">
                    {lendo.title}
                  </h3>
                  <p className="mt-4 whitespace-pre-line text-[15px] leading-relaxed text-petrol-800">
                    {lendo.excerpt}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Section>
    </>
  )
}
