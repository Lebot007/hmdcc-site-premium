'use client'

import Image from 'next/image'
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Brain,
  FileBadge,
  FlaskConical,
  GraduationCap,
  HeartPulse,
  Microscope,
  Route,
  ScanLine,
  Stethoscope,
  Workflow,
} from 'lucide-react'
import { Reveal, Section, SectionHeader, Counter } from './bits'

const specialties = [
  'Clínica Médica',
  'Ortopedia',
  'Cirurgia Geral',
  'Cirurgia Vascular',
  'Neurocirurgia',
  'Neurologia',
  'Urologia',
]

const capacity = [
  { value: 1500, suffix: '', label: 'internações por mês' },
  { value: 600, suffix: '', label: 'cirúrgicas mensais' },
  { value: 8000, suffix: '', label: 'exames de imagem/mês' },
  { value: 75000, suffix: '', label: 'exames laboratoriais/mês' },
]

const exams = [
  'Angiografia',
  'Angiotomografia',
  'Biópsia guiada por imagem',
  'Colonoscopia',
  'Endoscopia',
  'Gastrostomia',
  'CPRE',
  'Ecocardiografia',
  'Raio X',
  'Tomografia',
  'Ultrassonografia',
  'Arteriografia diagnóstica e terapêutica',
]

const nepePillars = [
  {
    icon: GraduationCap,
    title: 'Ensino',
    items: [
      'Convênios de estágio com instituições de ensino',
      'Visitas técnicas de acadêmicos',
      'Residência médica: matrículas e apoio aos residentes',
      'Estágio obrigatório, optativo e extracurricular',
    ],
  },
  {
    icon: FlaskConical,
    title: 'Pesquisa',
    items: [
      'Avaliação, autorização e monitoramento das pesquisas',
      'Autorização de entrada e saída de pesquisadores',
      'Parcerias com órgãos de pesquisa e estudos multicêntricos',
    ],
  },
  {
    icon: BookOpenCheck,
    title: 'Extensão',
    items: [
      'Promoção e organização de eventos científicos',
      'Atividades de extensão universitária',
    ],
  },
  {
    icon: FileBadge,
    title: 'Administrativo',
    items: [
      'Declarações e certificados de ensino e extensão',
      'Gestão documental das atividades',
      'Atendimento ao público',
    ],
  },
]

export function Services() {
  return (
    <>
      {/* ------------------------ Modelo de atendimento ------------------------ */}
      <Section id="modelo-atendimento" className="grain bg-petrol-900 py-24 lg:py-32">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <SectionHeader
                dark
                eyebrow="Modelo de atendimento"
                title={
                  <>
                    Retaguarda de alta complexidade <em className="italic font-light text-teal-300">para o SUS</em>
                  </>
                }
                description="Somos um hospital geral de retaguarda para urgência e emergência clínica, cirúrgica e AVC — referência para a Rede SUS-BH e para o Estado no atendimento de alta complexidade."
              />

              <Reveal delay={0.18}>
                <div className="mt-8 flex flex-wrap gap-2.5">
                  {specialties.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-teal-400/20 bg-teal-500/10 px-4 py-2 text-[13px] font-medium text-teal-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.26}>
                <div className="mt-10 rounded-2xl border border-white/10 bg-petrol-950/50 p-6 backdrop-blur-sm">
                  <div className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-500/15 ring-1 ring-teal-400/25">
                      <Route className="h-5 w-5 text-teal-300" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-medium text-white">
                        Como ser atendido
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-petrol-100/75">
                        O acesso se dá por encaminhamento da <strong className="font-semibold text-white">Central de Internação de BH</strong>,
                        que gerencia as vagas do hospital. Os pacientes chegam das
                        UPAs e de outros hospitais da rede pública. O HMDCC não
                        conta com pronto-socorro e, portanto, não atende sem
                        encaminhamento da Central.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="flex flex-col justify-center gap-6">
              <Reveal delay={0.12}>
                <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10">
                  {capacity.map((item) => (
                    <div key={item.label} className="bg-petrol-950/70 p-7">
                      <p className="font-display text-3xl font-semibold text-teal-300 lg:text-4xl">
                        <Counter value={item.value} />
                      </p>
                      <p className="mt-2 text-xs font-medium leading-snug text-petrol-100/70">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.22}>
                <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-petrol-900/60 p-6">
                  <Brain className="mt-0.5 h-5 w-5 shrink-0 text-teal-300" aria-hidden />
                  <p className="text-sm leading-relaxed text-petrol-100/80">
                    <strong className="font-semibold text-white">Pioneirismo no AVC:</strong>{' '}
                    primeira instituição do SUS-BH a ofertar trombectomia
                    mecânica, na maior Unidade de AVC de Minas Gerais.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* --------------------------- Estrutura / CDI --------------------------- */}
      <Section id="estrutura" className="bg-ivory py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div className="order-2 lg:order-1">
              <SectionHeader
                eyebrow="Estrutura · Centro de Diagnóstico por Imagem"
                title={
                  <>
                    Excelência diagnóstica em <em className="italic font-light text-teal-700">ambiente humanizado</em>
                  </>
                }
                description="O CDI reúne estrutura moderna e completa para exames de baixa, média e alta complexidade. Nas salas de tomografia, os pacientes são acolhidos por um projeto visual e luminotécnico que simula uma claraboia com vista para copas de ipês — com iluminação especial em técnicas de cromoterapia para aliviar a tensão."
              />
              <Reveal delay={0.2}>
                <div className="mt-9">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-soft">
                    Exames que realizamos
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {exams.map((exam) => (
                      <span
                        key={exam}
                        className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-white px-3.5 py-2 text-[13px] font-medium text-petrol-800"
                      >
                        <BadgeCheck className="h-3.5 w-3.5 text-teal-600" aria-hidden />
                        {exam}
                      </span>
                    ))}
                  </div>
                  <p className="mt-5 text-xs leading-relaxed text-ink-soft">
                    A oferta de exames de imagem é regulada pela Central de
                    Marcação de Consultas e Exames da Secretaria Municipal de
                    Saúde de BH.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="order-1 lg:order-2">
              <div className="relative">
                <div className="overflow-hidden rounded-[2rem]">
                  <Image
                    src="/images/estrutura/cdi-real.jpg"
                    alt="Centro de Diagnóstico por Imagem do HMDCC"
                    width={1200}
                    height={900}
                    className="h-[420px] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 hidden max-w-[240px] rounded-2xl border border-hairline bg-white p-5 shadow-xl shadow-petrol-950/10 sm:block">
                  <ScanLine className="h-5 w-5 text-teal-600" aria-hidden />
                  <p className="mt-2.5 font-display text-sm font-medium leading-snug text-petrol-900">
                    Salas de tomografia com claraboia e cromoterapia
                  </p>
                </div>
                <div className="absolute -top-6 -right-4 hidden rounded-2xl bg-petrol-900 p-5 shadow-xl sm:block">
                  <p className="font-display text-2xl font-semibold text-teal-300">
                    <Counter value={988363} />
                  </p>
                  <p className="mt-1 text-[11px] font-medium text-petrol-100/70">
                    exames de imagem realizados
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* --------------------------------- NEPE -------------------------------- */}
      <Section id="nepe" className="border-t border-hairline bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <SectionHeader
                eyebrow="NEPE · Núcleo de Ensino e Pesquisa"
                title={
                  <>
                    Conhecimento que <em className="italic font-light text-teal-700">transforma o cuidado</em>
                  </>
                }
                description="Inaugurado em 2018, o NEPE organiza as atividades de ensino, pesquisa e extensão do hospital. Sua missão: garantir a prática de saúde baseada em evidências e construir conhecimento voltado a um cuidado qualificado, seguro, eficiente e humanizado."
              />
              <Reveal delay={0.2}>
                <div className="mt-8 space-y-3">
                  {[
                    'Parcerias com importantes hospitais e instituições de ensino de Minas Gerais',
                    'Cenário para pesquisas de diversos órgãos brasileiros',
                    '36 vagas para residência médica, incluindo o novo programa de geriatria',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600" aria-hidden />
                      <p className="text-[15px] leading-relaxed text-petrol-800">{item}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.28}>
                <a
                  href="#carreiras"
                  className="group mt-9 inline-flex items-center gap-2 text-sm font-semibold text-teal-700"
                >
                  Conheça a residência médica
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </a>
              </Reveal>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {nepePillars.map((pillar, i) => (
                <Reveal key={pillar.title} delay={0.07 * i}>
                  <div className="h-full rounded-3xl border border-hairline bg-ivory p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-petrol-950/[0.06]">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-petrol-900">
                      <pillar.icon className="h-5 w-5 text-teal-300" aria-hidden />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-medium text-petrol-900">
                      {pillar.title}
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                      {pillar.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-teal-600" aria-hidden />
                          <span className="text-[13px] leading-relaxed text-ink-soft">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
