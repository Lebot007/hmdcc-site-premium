'use client'

import {
  ArrowUpRight,
  Briefcase,
  ClipboardList,
  Clock3,
  FileText,
  GraduationCap,
  ScrollText,
  Stethoscope,
  UserPlus,
} from 'lucide-react'
import { Reveal, Section, SectionHeader } from './bits'
import { Badge } from '@/components/ui/badge'

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

const editais = [
  { edital: 'Resultados dos processos seletivos de 2026', year: '2026', status: 'EM ANDAMENTO' },
  { edital: 'Edital Processo Seletivo HMDCC 2026', year: '2026', status: 'EM ANDAMENTO' },
  { edital: 'Veja as vagas disponíveis do HMDCC na plataforma Gupy', year: '2026', status: 'EM ANDAMENTO' },
  { edital: 'Resultados dos processos seletivos de 2025', year: '2025', status: 'VENCIDO' },
  { edital: 'Edital Processo Seletivo HMDCC 2025', year: '2025', status: 'VENCIDO' },
]

const procurement = [
  {
    code: 'CG 35/2026',
    process: '324/2026',
    object: 'Fornecimento sob demanda de copos e embalagens descartáveis · 36 meses',
    opening: '17/11/2026',
    status: 'PUBLICADO',
  },
  {
    code: 'CG 32/2026',
    process: '254/2026',
    object: 'Fornecimento sob demanda de materiais médico-hospitalares · 24 meses',
    opening: '15/10/2026',
    status: 'PUBLICADO',
  },
  {
    code: 'CG 30/2026',
    process: '239/2026',
    object: 'Serviço médico especializado em neurorradiologia e anestesiologia · 18 meses',
    opening: '07/10/2026',
    status: 'PUBLICADO',
  },
  {
    code: 'CG 23/2026',
    process: '182/2026',
    object: 'OPMEs para ortopedia e coluna, com consignação e comodato · 24 meses',
    opening: '04/11/2026',
    status: 'REAGENDADO',
  },
  {
    code: 'CG 20/2026',
    process: '145/2026',
    object: 'Fornecimento sob demanda de materiais médico-hospitalares · 24 meses',
    opening: '06/07/2026',
    status: 'HOMOLOGADO',
  },
  {
    code: 'PC 19/2026',
    process: '265/2026',
    object: 'Consultoria: LTCAT, laudos de insalubridade e periculosidade, AET',
    opening: '22/10/2026',
    status: 'REAGENDADO',
  },
  {
    code: 'PC 18/2026',
    process: '257/2026',
    object: 'Instrumentais cirúrgicos e ótica para videolaparoscopia',
    opening: '14/09/2026',
    status: 'HOMOLOGADO',
  },
  {
    code: 'CG 17/2026',
    process: '129/2026',
    object: 'Materiais médico-hospitalares — fios cirúrgicos · 24 meses',
    opening: '11/06/2026',
    status: 'HOMOLOGADO',
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
    default:
      return 'bg-petrol-50 text-petrol-700 ring-petrol-600/15'
  }
}

export function CareersProcurement() {
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

          {/* Editais */}
          <div className="mt-16">
            <Reveal>
              <div className="mb-6 flex items-center gap-3">
                <ScrollText className="h-4 w-4 text-teal-300" aria-hidden />
                <h3 className="font-display text-lg font-medium text-white">
                  Editais e resultados
                </h3>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <div className="hidden grid-cols-[1fr_90px_140px] gap-4 bg-petrol-900 px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-petrol-200 md:grid">
                  <span>Edital</span>
                  <span>Ano</span>
                  <span>Status</span>
                </div>
                <div className="divide-y divide-white/[0.07]">
                  {editais.map((item) => (
                    <div
                      key={item.edital}
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
              description="Processos de aquisição conduzidos com transparência, nas modalidades abaixo. Consulte também o Banco de Marcas, o Regulamento de Compras e a Portaria HMDCC 28/2026."
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

          <Reveal delay={0.1}>
            <div className="mt-12 overflow-hidden rounded-3xl border border-hairline bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left">
                  <thead>
                    <tr className="border-b border-hairline bg-sand/60">
                      {['Seleção', 'Processo', 'Objeto', 'Abertura', 'Situação'].map((h) => (
                        <th
                          key={h}
                          className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-hairline">
                    {procurement.map((row) => (
                      <tr key={row.code} className="group transition-colors hover:bg-sand/40">
                        <td className="whitespace-nowrap px-6 py-4">
                          <span className="font-display text-sm font-semibold text-petrol-900">
                            {row.code}
                          </span>
                        </td>
                        <td className="tabular whitespace-nowrap px-6 py-4 text-sm text-ink-soft">
                          {row.process}
                        </td>
                        <td className="px-6 py-4 text-sm leading-relaxed text-petrol-800">
                          {row.object}
                        </td>
                        <td className="tabular whitespace-nowrap px-6 py-4 text-sm text-ink-soft">
                          {row.opening}
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            variant="outline"
                            className={`border-0 text-[10px] font-semibold tracking-wider ${statusColor(row.status)}`}
                          >
                            {row.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-6 text-xs leading-relaxed text-ink-soft">
              Processos homologados e históricos completos, incluindo datas de
              publicação, julgamento e homologação, estão disponíveis na área de
              Compras do portal. Para dúvidas, fale com a nossa equipe de
              Suprimentos.
            </p>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
