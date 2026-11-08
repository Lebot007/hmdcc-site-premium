'use client'

import {
  CalendarClock,
  DoorOpen,
  Eye,
  FileDown,
  HandHeart,
  HelpCircle,
  IdCard,
  Phone,
  VenetianMask,
} from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Reveal, Section, SectionHeader } from './bits'

const visitUnits = [
  {
    id: 'cti',
    name: 'CTI',
    boletim: 'Presencial · seg. a sex. das 9h às 12h · feriados e fins de semana das 14h às 16h',
    visitas: 'Todos os dias, das 10h às 21h',
    detalhe: 'Três visitas por dia, sendo duas por vez · duração de 20 minutos',
  },
  {
    id: 'avc',
    name: 'AVC',
    boletim: 'Presencial pela manhã',
    visitas: 'Todos os dias, das 10h às 21h',
    detalhe:
      'Três visitas por dia, duas por vez. Paciente com acompanhante: entra apenas um visitante por vez.',
  },
  {
    id: 'andares',
    name: '5°, 6°, 7° e 8° andares',
    boletim: 'Presencial pela manhã',
    visitas: 'Todos os dias, das 10h às 21h',
    detalhe:
      'Três visitas por dia, duas por vez. Paciente com acompanhante: entra apenas um visitante por vez.',
  },
  {
    id: 'udc',
    name: 'Unidade de Decisão Clínica (UDC)',
    boletim: '—',
    visitas: 'Todos os dias, das 10h às 21h',
    detalhe: 'Três visitas por dia, sendo uma por vez.',
  },
  {
    id: 'srag',
    name: 'SRAG',
    boletim:
      'Por telefone ao familiar responsável ou acompanhante · seg. a sex. das 9h às 14h · fins de semana das 9h às 18h',
    visitas: 'Paciente em isolamento respiratório não recebe visitas',
    detalhe:
      'O boletim médico é fornecido por telefone ao familiar previamente cadastrado como responsável.',
  },
]

const faqs = [
  {
    q: 'Como faço para ser atendido no HMDCC?',
    a: 'O acesso ao hospital ocorre por encaminhamento da Central de Internação de Belo Horizonte, que gerencia todas as vagas. Os pacientes chegam das UPAs ou de outros hospitais da rede pública. Como o HMDCC não possui pronto-socorro, não há atendimento sem encaminhamento da Central.',
  },
  {
    q: 'Quem tem direito a acompanhante?',
    a: 'Têm direito a acompanhante os pacientes com idade igual ou superior a 60 anos, menores de 18 anos e pessoas com necessidades especiais.',
  },
  {
    q: 'Preciso de agendamento para exames de imagem?',
    a: 'Sim. A oferta de exames de imagem no HMDCC é regulada pela Central de Marcação de Consultas e Exames da Secretaria Municipal de Saúde de BH. O hospital realiza exames de média e alta complexidade, como tomografia, endoscopia, colonoscopia, CPRE, ecocardiografia, raio X, hemodinâmica e ultrassonografia.',
  },
  {
    q: 'Como funciona a residência médica?',
    a: 'O HMDCC oferece 36 vagas para residência médica, com inscrições geralmente abertas entre outubro e novembro via PSU. Para 2027, a instituição lança o novo programa de residência em geriatria. Consulte a área de Carreiras para editais e resultados.',
  },
  {
    q: 'Como me candidatar a uma vaga de trabalho?',
    a: 'Acesse a área Trabalhe Conosco e cadastre seu currículo no banco de dados na categoria correspondente (especialidades médicas, enfermagem ou demais funções). O cadastro tem validade de 6 meses, e o primeiro contato da equipe é feito por telefone.',
  },
  {
    q: 'Como falar com a Ouvidoria?',
    a: 'O atendimento presencial funciona de segunda a sexta-feira, das 8h às 17h, e pelo telefone (31) 3472-4197. É possível registrar contato identificado — com retorno garantido — ou anônimo, mediante averiguação das tratativas.',
  },
]

export function Patient() {
  return (
    <>
      {/* ----------------------------- Sou paciente ---------------------------- */}
      <Section id="sou-paciente" className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            align="center"
            eyebrow="Sou paciente · Boletim médico e visitas"
            title={
              <>
                Informação clara para <em className="italic font-light text-teal-700">familiares e acompanhantes</em>
              </>
            }
            description="Conheça as regras de visitação e os horários de boletim médico de cada unidade. Direito a acompanhante: pacientes a partir de 60 anos, menores de 18 anos e pessoas com necessidades especiais."
          />

          <Reveal delay={0.15}>
            <Tabs defaultValue="cti" className="mt-14">
              <TabsList className="mx-auto flex h-auto max-w-full flex-wrap justify-center gap-1 rounded-2xl border border-hairline bg-sand p-1.5">
                {visitUnits.map((unit) => (
                  <TabsTrigger
                    key={unit.id}
                    value={unit.id}
                    className="rounded-xl px-4 py-2.5 text-[13px] font-medium data-[state=active]:bg-petrol-900 data-[state=active]:text-white"
                  >
                    {unit.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {visitUnits.map((unit) => (
                <TabsContent key={unit.id} value={unit.id} className="mt-8">
                  <div className="grid gap-5 md:grid-cols-3">
                    <div className="rounded-3xl border border-hairline bg-ivory p-7">
                      <CalendarClock className="h-5 w-5 text-teal-600" aria-hidden />
                      <h3 className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
                        Boletim médico
                      </h3>
                      <p className="mt-3 text-[15px] font-medium leading-relaxed text-petrol-900">
                        {unit.boletim}
                      </p>
                    </div>
                    <div className="rounded-3xl border border-hairline bg-ivory p-7">
                      <Eye className="h-5 w-5 text-teal-600" aria-hidden />
                      <h3 className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
                        Horário de visitas
                      </h3>
                      <p className="mt-3 text-[15px] font-medium leading-relaxed text-petrol-900">
                        {unit.visitas}
                      </p>
                    </div>
                    <div className="rounded-3xl bg-petrol-900 p-7">
                      <DoorOpen className="h-5 w-5 text-teal-300" aria-hidden />
                      <h3 className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-300">
                        Regras da unidade
                      </h3>
                      <p className="mt-3 text-[15px] font-medium leading-relaxed text-white">
                        {unit.detalhe}
                      </p>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex justify-center">
              <a
                href="#contato"
                className="group inline-flex items-center gap-2.5 rounded-full border border-hairline bg-ivory px-6 py-3 text-sm font-semibold text-petrol-900 transition-all hover:border-petrol-900 hover:bg-petrol-900 hover:text-white"
              >
                <FileDown className="h-4 w-4 text-teal-600 group-hover:text-teal-300" aria-hidden />
                Visualizar e baixar o guia completo de visitas
              </a>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* --------------------------------- FAQ --------------------------------- */}
      <Section id="faq" className="border-t border-hairline bg-ivory py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <SectionHeader
                eyebrow="Dúvidas frequentes"
                title={
                  <>
                    Perguntas <em className="italic font-light text-teal-700">frequentes</em>
                  </>
                }
                description="Respostas diretas para as principais dúvidas sobre atendimento, visitas, exames e processos seletivos. Não encontrou o que procura? Nossa equipe está a um contato de distância."
              />
              <Reveal delay={0.2}>
                <a
                  href="#contato"
                  className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-petrol-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-petrol-800"
                >
                  <HelpCircle className="h-4 w-4 text-teal-300" aria-hidden />
                  Enviar minha dúvida
                </a>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem
                    key={faq.q}
                    value={`item-${i}`}
                    className="border-hairline"
                  >
                    <AccordionTrigger className="gap-4 py-6 text-left font-display text-[17px] font-medium leading-snug text-petrol-900 hover:no-underline hover:text-teal-700 [&[data-state=open]>svg]:text-teal-600">
                      <span className="flex items-baseline gap-4">
                        <span className="tabular font-display text-sm font-semibold text-teal-600">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {faq.q}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 pl-10 text-[15px] leading-relaxed text-ink-soft">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ------------------------------- Ouvidoria ----------------------------- */}
      <Section id="ouvidoria" className="grain bg-petrol-900 py-24 lg:py-32">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionHeader
                dark
                eyebrow="Ouvidoria"
                title={
                  <>
                    Sua voz torna o HMDCC <em className="italic font-light text-teal-300">melhor</em>
                  </>
                }
                description="A Ouvidoria é o canal direto para elogios, sugestões, reclamações e denúncias. Todo contato é tratado com sigilo e investigado com rigor, no compromisso de sempre oferecer o melhor para cidadãos e colaboradores."
              />
              <Reveal delay={0.18}>
                <div className="mt-9 space-y-4">
                  <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-petrol-950/50 p-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-500/15 ring-1 ring-teal-400/25">
                      <Phone className="h-5 w-5 text-teal-300" aria-hidden />
                    </span>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-petrol-200">
                        Telefone
                      </p>
                      <p className="mt-0.5 font-display text-lg font-medium text-white">
                        (31) 3472-4197
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-petrol-950/50 p-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-500/15 ring-1 ring-teal-400/25">
                      <HandHeart className="h-5 w-5 text-teal-300" aria-hidden />
                    </span>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-petrol-200">
                        Atendimento presencial
                      </p>
                      <p className="mt-0.5 font-display text-lg font-medium text-white">
                        Segunda a sexta, das 8h às 17h
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="flex flex-col justify-center gap-5">
              <Reveal delay={0.1}>
                <div className="rounded-3xl border border-white/10 bg-petrol-950/50 p-8">
                  <div className="flex items-start gap-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal-600">
                      <IdCard className="h-6 w-6 text-white" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-medium text-white">
                        Contato identificado
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-petrol-100/75">
                        Informe nome, e-mail e telefone para receber retorno
                        completo da Ouvidoria sobre as tratativas do seu relato —
                        com troca de informações e acompanhamento até a conclusão.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="rounded-3xl border border-white/10 bg-petrol-950/50 p-8">
                  <div className="flex items-start gap-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-petrol-800 ring-1 ring-white/15">
                      <VenetianMask className="h-6 w-6 text-teal-300" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-medium text-white">
                        Contato anônimo
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-petrol-100/75">
                        Denúncias anônimas não permitem retorno sobre as
                        tratativas, mas recebem a mesma atenção: todas as
                        averiguações são realizadas até o fim.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
