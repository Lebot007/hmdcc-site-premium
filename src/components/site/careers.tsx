'use client'

import { useState } from 'react'
import {
  ArrowUpRight,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Clock3,
  ExternalLink,
  FileText,
  GraduationCap,
  ScrollText,
  Stethoscope,
  UserPlus,
} from 'lucide-react'
import { Reveal, Section, SectionHeader } from './bits'
import { Badge } from '@/components/ui/badge'
import { editais } from '@/data/editais'
import { compras } from '@/data/compras'

const COMPRAS_POR_PAGINA = 10

const jobCategories = [
  {
    icon: Stethoscope,
    title: 'Especialidades Médicas',
    text: 'Banco de currículos para médicos especialistas nas diversas áreas da instituição.',
  },
  {
    icon: Briefcase,
    title: 'Enfermagem',
    text: 'Enfermeiros, técnicos e auxiliares de enfermagem para as linhas de cuidado.',
  },
  {
    icon: ClipboardList,
    title: 'Demais funções',
    text: 'Profissionais administrativos e de apoio para todas as áreas do hospital.',
  },
]

const selectionSteps = [
  {
    icon: UserPlus,
    title: 'Cadastre seu currículo',
    text: 'Acesse o formulário e preencha os dados solicitados. O cadastro é válido por 6 meses.',
  },
  {
    icon: Clock3,
    title: 'Aguarde o contato',
    text: 'Com o surgimento da vaga, consideramos os perfis adequados — prioridade ao cadastro mais antigo. O primeiro contato é feito por telefone.',
  },
  {
    icon: FileText,
    title: 'Comprovação documental',
    text: 'Ao aceitar a vaga, você recebe por e-mail a solicitação de documentos que comprovem os dados informados.',
  },
  {
    icon: GraduationCap,
    title: 'Contratação temporária',
    text: 'Prazo determinado de até 6 meses, prorrogável por até 24 meses em casos de justificada necessidade.',
  },
]

// Links oficiais de documentos, idênticos aos do portal original
const comprasDocs = [
  {
    label: 'Banco de Marcas',
    href: 'https://hmdcc.com.br/banco-de-marcas',
  },
  {
    label: 'Regulamento de Compras',
    href: 'https://www2.hmdcc.com.br/wp-content/uploads/2026/07/REGULAMENTO-DE-COMPRAS-VERSAO-DEZ-2025.pdf',
  },
  {
    label: 'Portaria HMDCC 28/2026',
    href: 'https://www2.hmdcc.com.br/wp-content/uploads/2026/11/PORTARIA-HMDCC-No-028-Designa-empregados-para-funcoes-do-sistema-Licitacao-E.pdf',
  },
]

const procurementModalities = [
  { code: 'CR', name: 'Credenciamento' },
  { code: 'CG', name: 'Convocação Geral' },
  { code: 'CP', name: 'Coleta de Preços' },
  { code: 'PC', name: 'Pedido de Cotação' },
]

function statusColor(status: string) {
  switch (status) {
    case 'PUBLICADO':
    case 'EM ANDAMENTO':
      return 'bg-teal-50 text-teal-800 ring-teal-600/20'
    case 'REAGENDADO':
      return 'bg-amber-50 text-amber-800 ring-amber-600/20'
    case 'CANCELADO':
    case 'VENCIDO':
      return 'bg-rose-50 text-rose-800 ring-rose-600/20'
    default:
      return 'bg-petrol-50 text-petrol-700 ring-petrol-600/15'
  }
}

// Janela de páginas 1 … 4 5 6 … 50 (mesmo padrão do portal original)
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

export function CareersProcurement() {
  const [comprasPage, setComprasPage] = useState(1)
  const totalPaginas = Math.ceil(compras.length / COMPRAS_POR_PAGINA)
  const inicio = (comprasPage - 1) * COMPRAS_POR_PAGINA
  const comprasVisiveis = compras.slice(inicio, inicio + COMPRAS_POR_PAGINA)

  return (
    <>
      {/* ------------------------------ Carreiras ------------------------------ */}
      <Section id="carreiras" className="grain bg-petrol-950 py-24 lg:py-32">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            dark
            align="center"
            eyebrow="Trabalhe conosco"
            title={
              <>
                Faça parte de uma equipe que <em className="italic font-light text-teal-300">faz a diferença</em>
              </>
            }
            description="O Regulamento de Seleção de Pessoal do HMDCC autoriza processos seletivos simplificados para contratação temporária, com impessoalidade e agilidade, mantendo um banco de currículos sempre ativo."
          />

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {jobCategories.map((item, i) => (
              <Reveal key={item.title} delay={0.07 * i}>
                <div className="group h-full rounded-3xl border border-white/10 bg-petrol-900/60 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/30">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/15 ring-1 ring-teal-400/25">
                    <item.icon className="h-5 w-5 text-teal-300" aria-hidden />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-medium text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-petrol-100/70">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Steps */}
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-4">
            {selectionSteps.map((step, i) => (
              <div key={step.title} className="relative bg-petrol-950/80 p-7">
                <Reveal delay={0.06 * i}>
                  <span className="absolute right-5 top-5 font-display text-4xl font-semibold text-white/[0.07]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <step.icon className="h-5 w-5 text-teal-300" aria-hidden />
                  <h3 className="mt-4 font-display text-[15px] font-medium text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-petrol-100/65">
                    {step.text}
                  </p>
                </Reveal>
              </div>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-col items-center gap-5 rounded-3xl border border-teal-400/20 bg-gradient-to-r from-teal-500/10 via-petrol-900/60 to-petrol-900/60 p-8 text-center sm:flex-row sm:justify-between sm:text-left">
              <div>
                <h3 className="font-display text-xl font-medium text-white">
                  Residência médica 2027
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-petrol-100/70">
                  36 vagas ofertadas nos programas de residência, incluindo o novo
                  programa de geriatria. Inscrições via PSU, conforme edital.
                </p>
              </div>
              <a
                href="#contato"
                className="shrink-0 inline-flex items-center gap-2 rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-500"
              >
                Consultar edital
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </Reveal>

          {/* Editais — arquivo completo: 47 registros, 2017–2026 */}
          <div className="mt-16">
            <Reveal>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <ScrollText className="h-4 w-4 text-teal-300" aria-hidden />
                  <h3 className="font-display text-lg font-medium text-white">
                    Editais e resultados
                  </h3>
                </div>
                <span className="rounded-full bg-teal-500/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-teal-300 ring-1 ring-teal-400/25">
                  {editais.length} editais · 2017–2026
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <div className="hidden grid-cols-[1fr_90px_140px] gap-4 bg-petrol-900 px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-petrol-200 md:grid">
                  <span>Edital</span>
                  <span>Ano</span>
                  <span>Status</span>
                </div>
                <div className="max-h-[520px] divide-y divide-white/[0.07] overflow-y-auto">
                  {editais.map((item, i) => (
                    <div
                      key={`${item.year}-${i}`}
                      className="grid grid-cols-1 gap-2 bg-petrol-950/60 px-6 py-4 transition-colors hover:bg-petrol-900/70 md:grid-cols-[1fr_90px_140px] md:items-center md:gap-4"
                    >
                      <span className="text-sm font-medium text-petrol-100">
                        {item.edital}
                      </span>
                      <span className="tabular text-sm text-petrol-100/60">{item.year}</span>
                      <span>
                        <Badge
                          variant="outline"
                          className={`border-0 text-[10px] font-semibold tracking-wider ${statusColor(item.status)}`}
                        >
                          {item.status}
                        </Badge>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* -------------------------------- Compras ------------------------------ */}
      <Section id="compras" className="bg-ivory py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              eyebrow="Compras · Seleção de fornecedores"
              title={
                <>
                  Relações com <em className="italic font-light text-teal-700">fornecedores</em>
                </>
              }
              description="Processos de aquisição conduzidos com transparência, nas modalidades CR, CG, CP e PC — arquivo histórico completo desde 2017."
              className="max-w-2xl"
            />
            <Reveal delay={0.15}>
              <div className="grid grid-cols-2 gap-3">
                {procurementModalities.map((m) => (
                  <div
                    key={m.code}
                    className="flex items-center gap-3 rounded-2xl border border-hairline bg-white px-5 py-4"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-petrol-900 font-display text-xs font-bold text-teal-300">
                      {m.code}
                    </span>
                    <span className="text-[13px] font-medium text-petrol-800">{m.name}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Documentos oficiais — mesmos links do portal original */}
          <Reveal delay={0.12}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
                Documentos:
              </span>
              {comprasDocs.map((doc) => (
                <a
                  key={doc.label}
                  href={doc.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-petrol-900/15 bg-white px-4 py-2 text-[12.5px] font-semibold text-petrol-900 transition-all hover:border-teal-600 hover:text-teal-700"
                >
                  {doc.label}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 overflow-hidden rounded-3xl border border-hairline bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1080px] text-left">
                  <thead>
                    <tr className="border-b border-hairline bg-sand/60">
                      {[
                        'Seleção',
                        'Processo',
                        'Objeto',
                        'Publicação',
                        'Abertura',
                        'Esclar./Impugnação',
                        'Julgamento',
                        'Homologação',
                        'Situação',
                      ].map((h) => (
                        <th
                          key={h}
                          className="whitespace-nowrap px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-hairline">
                    {comprasVisiveis.map((row, i) => (
                      <tr
                        key={`${row.code}-${i}`}
                        className="group transition-colors hover:bg-sand/40"
                      >
                        <td className="whitespace-nowrap px-5 py-4">
                          <span className="font-display text-sm font-semibold text-petrol-900">
                            {row.code}
                          </span>
                        </td>
                        <td className="tabular whitespace-nowrap px-5 py-4 text-sm text-ink-soft">
                          {row.process}
                        </td>
                        <td className="max-w-[420px] px-5 py-4 text-sm leading-relaxed text-petrol-800">
                          <span className="line-clamp-2">{row.object}</span>
                        </td>
                        <td className="tabular whitespace-nowrap px-5 py-4 text-sm text-ink-soft">
                          {row.publication || '—'}
                        </td>
                        <td className="tabular whitespace-nowrap px-5 py-4 text-sm text-ink-soft">
                          {row.opening || '—'}
                        </td>
                        <td className="tabular whitespace-nowrap px-5 py-4 text-sm text-ink-soft">
                          {row.clarif || '—'}
                        </td>
                        <td className="tabular whitespace-nowrap px-5 py-4 text-sm text-ink-soft">
                          {row.judgment || '—'}
                        </td>
                        <td className="tabular whitespace-nowrap px-5 py-4 text-sm text-ink-soft">
                          {row.homolog || '—'}
                        </td>
                        <td className="px-5 py-4">
                          <Badge
                            variant="outline"
                            className={`border-0 text-[10px] font-semibold tracking-wider ${statusColor(row.status)}`}
                          >
                            {row.status || '—'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Paginação — mesmo comportamento do portal original */}
              <div className="flex flex-col items-center justify-between gap-4 border-t border-hairline bg-ivory/70 px-6 py-4 sm:flex-row">
                <p className="text-xs text-ink-soft">
                  Mostrando <strong className="text-petrol-900">{inicio + 1}–{Math.min(inicio + COMPRAS_POR_PAGINA, compras.length)}</strong> de{' '}
                  <strong className="text-petrol-900">{compras.length}</strong> processos
                </p>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setComprasPage((p) => Math.max(1, p - 1))}
                    disabled={comprasPage === 1}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-hairline bg-white text-petrol-900 transition-colors hover:bg-sand disabled:opacity-40"
                    aria-label="Página anterior"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden />
                  </button>
                  {pageWindow(comprasPage, totalPaginas).map((p, idx) =>
                    p === '…' ? (
                      <span key={`ellipsis-${idx}`} className="px-1.5 text-sm text-ink-soft">
                        …
                      </span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => setComprasPage(p as number)}
                        className={`h-9 min-w-9 rounded-lg px-2 text-sm font-semibold transition-colors ${
                          p === comprasPage
                            ? 'bg-petrol-900 text-white'
                            : 'border border-hairline bg-white text-petrol-900 hover:bg-sand'
                        }`}
                        aria-current={p === comprasPage ? 'page' : undefined}
                      >
                        {p}
                      </button>
                    )
                  )}
                  <button
                    onClick={() => setComprasPage((p) => Math.min(totalPaginas, p + 1))}
                    disabled={comprasPage === totalPaginas}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-hairline bg-white text-petrol-900 transition-colors hover:bg-sand disabled:opacity-40"
                    aria-label="Próxima página"
                  >
                    <ChevronRight className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-6 text-xs leading-relaxed text-ink-soft">
              Dados íntegros do sistema de compras do HMDCC — modalidades CR, CG, CP e
              PC, com datas de publicação, esclarecimentos, julgamento e homologação.
              Para dúvidas, fale com a nossa equipe de Suprimentos.
            </p>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
