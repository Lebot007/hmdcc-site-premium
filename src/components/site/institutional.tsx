'use client'

import Image from 'next/image'
import { Building2, Handshake, Layers, UsersRound } from 'lucide-react'
import { Reveal, Section, SectionHeader } from './bits'

const timeline = [
  {
    year: '2015',
    title: 'Um presente para Belo Horizonte',
    text: 'Inaugurado em 12 de dezembro com 47 leitos, o hospital nasceu para ampliar o acesso da população da capital e da Região Metropolitana a serviços hospitalares.',
  },
  {
    year: '2016',
    title: 'Primeira expansão',
    text: 'Em setembro, a capacidade operacional cresce para 90 leitos em funcionamento.',
  },
  {
    year: '2017',
    title: 'Ativação total',
    text: 'No aniversário de 120 anos de BH, o hospital alcança 460 leitos — 100% da capacidade de atendimento, um presente entregue à população.',
  },
  {
    year: 'Hoje',
    title: 'Referência nacional',
    text: 'Primeiro hospital do SUS-BH a ofertar trombectomia mecânica para AVC, com a maior unidade dedicada dessa especialidade em Minas Gerais.',
  },
]

const beds = [
  { value: '240', label: 'Leitos clínicos' },
  { value: '35', label: 'Leitos de AVC' },
  { value: '80', label: 'Especialidades cirúrgicas' },
  { value: '80', label: 'Leitos de CTI' },
  { value: '15', label: 'Hospital-dia cirúrgico' },
  { value: '10', label: 'Unidade de Decisão Clínica (UDC)' },
]

const careLines = [
  {
    icon: Layers,
    title: 'Gestão participativa',
    text: 'Times multiprofissionais que decidem juntos, com autonomia e corresponsabilidade pelos resultados.',
  },
  {
    icon: UsersRound,
    title: 'Atendimento centrado no usuário',
    text: 'Olhamos para o paciente de forma integral — além da doença, a pessoa e suas circunstâncias.',
  },
  {
    icon: Handshake,
    title: 'Continuidade da assistência',
    text: 'Três linhas de cuidado — paciente clínico, cirúrgico e crítico — acompanham todo o percurso dentro do hospital.',
  },
]

export function Institutional() {
  return (
    <>
      {/* ------------------------------ O HMDCC ------------------------------ */}
      <Section id="o-hmdcc" className="grain overflow-hidden bg-petrol-950 py-24 lg:py-32">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionHeader
                dark
                eyebrow="O HMDCC · História"
                title={
                  <>
                    Uma década de saúde pública <em className="italic font-light text-teal-300">de excelência</em>
                  </>
                }
                description="O Hospital Metropolitano Dr. Célio de Castro (HMDCC) homenageia em seu nome o médico e ex-prefeito de Belo Horizonte. Somos um Serviço Social Autônomo de direito privado, sem fins lucrativos e com título de filantropia, dedicado exclusivamente aos usuários do Sistema Único de Saúde."
              />

              <div className="mt-12 space-y-0">
                {timeline.map((item, i) => (
                  <Reveal key={item.year} delay={0.08 * i}>
                    <div className="relative flex gap-6 pb-10 last:pb-0">
                      {i < timeline.length - 1 && (
                        <span
                          className="absolute left-[27px] top-14 h-[calc(100%-3.2rem)] w-px bg-gradient-to-b from-teal-500/50 to-petrol-800"
                          aria-hidden
                        />
                      )}
                      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-teal-400/25 bg-petrol-900 font-display text-sm font-semibold text-teal-300">
                        {item.year}
                      </span>
                      <div className="pt-1.5">
                        <h3 className="font-display text-lg font-medium text-white">
                          {item.title}
                        </h3>
                        <p className="mt-2 max-w-md text-sm leading-relaxed text-petrol-100/70">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <Reveal delay={0.1}>
                <div className="relative overflow-hidden rounded-3xl">
                  <Image
                    src="/images/estrutura/pilotis.jpg"
                    alt="Pilotis do Hospital Metropolitano Dr. Célio de Castro"
                    width={1200}
                    height={675}
                    className="h-72 w-full object-cover transition-transform duration-700 hover:scale-[1.03] sm:h-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-petrol-950/70 to-transparent" />
                  <p className="absolute bottom-5 left-6 font-display text-lg font-medium text-white">
                    Região do Barreiro · Belo Horizonte
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="rounded-3xl border border-white/10 bg-petrol-900/60 p-8 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-teal-300" aria-hidden />
                    <h3 className="font-display text-lg font-medium text-white">
                      Capacidade instalada
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-petrol-100/70">
                    Localizado na região do Barreiro, com 100% dos leitos
                    dedicados exclusivamente aos usuários do SUS:
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-3">
                    {beds.map((bed) => (
                      <div key={bed.label} className="bg-petrol-950/70 p-4">
                        <p className="font-display text-2xl font-semibold text-teal-300">
                          {bed.value}
                        </p>
                        <p className="mt-1 text-[11px] leading-tight text-petrol-100/65">
                          {bed.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* ------------------------- Nosso jeito de cuidar ------------------------- */}
      <Section className="bg-ivory py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            align="center"
            eyebrow="Nosso jeito de cuidar"
            title={
              <>
                Pessoas cuidando de <em className="italic font-light text-teal-700">pessoas</em>
              </>
            }
            description="No HMDCC, o usuário encontra uma estrutura completa e avançada em saúde — e um modelo assistencial que garante continuidade do cuidado em todo o percurso do paciente."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {careLines.map((item, i) => (
              <Reveal key={item.title} delay={0.08 * i}>
                <div className="group h-full rounded-3xl border border-hairline bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-petrol-950/[0.07]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 ring-1 ring-teal-600/15 transition-colors group-hover:bg-teal-600">
                    <item.icon className="h-5 w-5 text-teal-700 transition-colors group-hover:text-white" aria-hidden />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-medium text-petrol-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* --------------------------------- PPP --------------------------------- */}
      <Section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <SectionHeader
                eyebrow="Parceria Público-Privada"
                title={
                  <>
                    Um modelo pioneiro, <em className="italic font-light text-teal-700">referência para o país</em>
                  </>
                }
                description="O HMDCC é resultado de uma parceria público-privada (PPP) inédita no país — um arranjo institucional em que cada parte atua com papel claramente definido."
              />
              <Reveal delay={0.2}>
                <p className="mt-6 text-[15px] leading-relaxed text-ink-soft">
                  A Prefeitura de Belo Horizonte, por meio da Secretaria Municipal
                  de Saúde (SMSA-BH), é o poder concedente: gestora e fiscalizadora
                  do contrato e responsável pela remuneração mensal do parceiro
                  privado. A Opy Health Metropolitano — que substituiu a Novo
                  Metropolitano em fevereiro de 2020 — é a Sociedade de Propósito
                  Específico (SPE) concessionária, responsável pelas atividades não
                  assistenciais e dedicada exclusivamente ao hospital.
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                  O hospital em si é um Serviço Social Autônomo (SSA-HMDCC),
                  organizado conforme as diretrizes do SUS — acesso universal e
                  gratuito. Por isso, o HMDCC não é parte da PPP: é o seu
                  resultado.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <div className="relative">
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-teal-100/60 via-transparent to-petrol-100/50" aria-hidden />
                <div className="relative space-y-4">
                  {[
                    {
                      sigla: 'PBH / SMSA-BH',
                      role: 'Poder concedente',
                      text: 'Gestão e fiscalização do contrato da PPP e remuneração mensal do parceiro privado pelos serviços prestados.',
                    },
                    {
                      sigla: 'Opy Health Metropolitano',
                      role: 'Concessionária · SPE',
                      text: 'Responsável pelas atividades não assistenciais. Como SPE, existe exclusivamente para servir ao HMDCC.',
                    },
                    {
                      sigla: 'SSA-HMDCC',
                      role: 'Serviço Social Autônomo',
                      text: 'Presta os serviços assistenciais com exclusividade ao SUS, sob as diretrizes do sistema.',
                    },
                  ].map((item, i) => (
                    <div
                      key={item.sigla}
                      className="flex gap-5 rounded-2xl border border-hairline bg-white p-6 shadow-sm transition-shadow hover:shadow-lg hover:shadow-petrol-950/[0.06]"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-petrol-900 font-display text-sm font-bold text-teal-300">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-700">
                          {item.role}
                        </p>
                        <h3 className="mt-1 font-display text-lg font-medium text-petrol-900">
                          {item.sigla}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  )
}
