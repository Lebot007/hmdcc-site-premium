'use client'

import { ArrowUpRight, ChartNoAxesColumn, FileDown, LineChart } from 'lucide-react'
import { Reveal, Section, SectionHeader } from './bits'

const reports = [
  {
    year: '2025',
    highlight: 'Primeira década',
    text: 'Uma década como referência nacional em modelo de gestão inovador — sucesso demonstrado não apenas pelos números, mas pelo jeito de fazer que valoriza a experiência do profissional e do paciente.',
  },
  {
    year: '2024',
    highlight: 'Transdisciplinaridade',
    text: 'A transdisciplinaridade e a experiência do paciente nortearam projetos, processos e inovação, consolidando um legado de qualidade assistencial e humanização para a Rede SUS-BH.',
  },
  {
    year: '2023',
    highlight: 'Excelência assistencial',
    text: 'A trajetória de uma instituição 100% SUS em consolidação como referência em atendimento de excelência, eficiência na gestão financeira e cuidado com foco total no paciente.',
  },
  {
    year: '2022',
    highlight: 'Retomada',
    text: 'O início da retomada pós-pandemia, os desafios da gestão financeira e da sustentabilidade — permeados pelo cuidado centrado no usuário, em um ano de aprendizado e aperfeiçoamento.',
  },
  {
    year: '2021',
    highlight: 'Enfrentamento à COVID-19',
    text: 'Como o hospital se tornou o segundo de Minas Gerais que mais atendeu pacientes com COVID-19, enfrentou a escassez de medicamentos, inovou em equipes e desenvolveu novos projetos.',
  },
  {
    year: '2020',
    highlight: 'Vidas dedicadas',
    text: 'A experiência institucional diante do desafio da pandemia — uma publicação em homenagem às vidas salvas, às vidas perdidas e às vidas dedicadas.',
  },
  {
    year: '2019',
    highlight: 'Cultura de segurança',
    text: 'Fortalecimento da cultura de segurança, consolidação das linhas de cuidado, formação profissional, novas tecnologias e interação com a comunidade e o controle social.',
  },
  {
    year: '2018',
    highlight: 'Eficiência',
    text: 'Crescimento da produção e novas tecnologias de gestão, com reduções significativas dos tempos de espera em CTI, leitos clínicos e filas de cirurgias eletivas.',
  },
  {
    year: '2017',
    highlight: 'Ativação total',
    text: 'O maior desafio da história do hospital: a ativação total dos leitos. O primeiro relatório registra a construção da instituição até o funcionamento a 100%.',
  },
]

export function Transparency() {
  return (
    <Section id="transparencia" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Transparência"
            title={
              <>
                Relatórios de <em className="italic font-light text-teal-700">gestão</em>
              </>
            }
            description="Disponibilizamos à sociedade a história, o desempenho e a evolução dos projetos estratégicos do hospital nas áreas de gestão, assistencial e infraestrutura — de 2017 até hoje."
            className="max-w-2xl"
          />
          <Reveal delay={0.15}>
            <div className="flex items-center gap-4 rounded-2xl border border-hairline bg-ivory px-6 py-5">
              <ChartNoAxesColumn className="h-5 w-5 text-teal-600" aria-hidden />
              <p className="text-sm leading-snug text-petrol-800">
                <strong className="font-semibold">9 relatórios anuais</strong>
                <br />
                <span className="text-ink-soft">disponíveis para download</span>
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reports.map((report, i) => (
            <Reveal key={report.year} delay={0.04 * i}>
              <article className="group flex h-full flex-col rounded-3xl border border-hairline bg-ivory p-7 transition-all duration-300 hover:-translate-y-1 hover:border-petrol-200 hover:bg-white hover:shadow-xl hover:shadow-petrol-950/[0.07]">
                <div className="flex items-start justify-between">
                  <span className="font-display text-4xl font-semibold tracking-tight text-petrol-900/15 transition-colors group-hover:text-teal-600/30">
                    {report.year}
                  </span>
                  <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-teal-800 ring-1 ring-teal-600/15">
                    <LineChart className="h-3 w-3" aria-hidden />
                    {report.highlight}
                  </span>
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">
                  {report.text}
                </p>
                <a
                  href="#contato"
                  className="mt-6 inline-flex items-center gap-2 border-t border-hairline pt-5 text-[13px] font-semibold text-teal-700 transition-colors hover:text-teal-600"
                >
                  <FileDown className="h-4 w-4" aria-hidden />
                  Fazer download
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
