'use client'

import { useEffect, useState } from 'react'
import {
  CalendarClock,
  CheckCircle2,
  DoorOpen,
  Eye,
  FileDown,
  HandHeart,
  HelpCircle,
  IdCard,
  Loader2,
  Paperclip,
  Phone,
  Send,
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

// --------------------------------------------------------------------------- //
// Formulário da Ouvidoria — mesmos campos e opções do portal original:
// alternância CONTATO IDENTIFICADO (com anexo de até 5MB) / CONTATO ANÔNIMO,  //
// validação no cliente (site estático) e captcha matemático.                  //
// --------------------------------------------------------------------------- //
function OuvidoriaChannel() {
  const [modo, setModo] = useState<'identificado' | 'anonimo'>('identificado')
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  // Desafio matemático: valores fixos no HTML estático e re-randomizados
  // após a hidratação (evita o erro React #418 de divergência SSR/cliente).
  const [captchaA, setCaptchaA] = useState(4)
  const [captchaB, setCaptchaB] = useState(3)

  useEffect(() => {
    setCaptchaA(Math.floor(Math.random() * 8) + 2)
    setCaptchaB(Math.floor(Math.random() * 8) + 1)
  }, [])
  const [nomeArquivo, setNomeArquivo] = useState('')

  const inputClasse =
    'w-full rounded-xl border border-white/15 bg-petrol-900/70 px-4 py-3 text-sm text-white placeholder:text-petrol-200/40 transition-colors focus:border-teal-400 focus:outline-none'

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    const captcha = Number(data.get('captcha'))
    if (captcha !== captchaA + captchaB) {
      window.alert('Resolva o desafio matemático corretamente para enviar.')
      return
    }

    const camposObrigatorios =
      modo === 'identificado'
        ? ['nome', 'assunto', 'email', 'email2', 'mensagem']
        : ['assunto', 'mensagem']
    for (const campo of camposObrigatorios) {
      if (!String(data.get(campo) || '').trim()) {
        window.alert('Preencha todos os campos obrigatórios (*).')
        return
      }
    }

    if (modo === 'identificado') {
      const email = String(data.get('email') || '')
      const email2 = String(data.get('email2') || '')
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email !== email2) {
        window.alert('Informe um e-mail válido e confirme-o corretamente.')
        return
      }
    }

    setEnviando(true)
    try {
      // Site estático: validação client-side. Ao integrar backend, envie via fetch.
      await new Promise((r) => setTimeout(r, 700))
      setEnviado(true)
      form.reset()
      setNomeArquivo('')
    } finally {
      setEnviando(false)
    }
  }

  if (enviado) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-white/10 bg-petrol-950/50 p-10 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-500/15 ring-1 ring-teal-400/25">
          <CheckCircle2 className="h-8 w-8 text-teal-300" aria-hidden />
        </span>
        <h3 className="mt-6 font-display text-2xl font-medium text-white">
          Contato registrado!
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-petrol-100/75">
          {modo === 'identificado'
            ? 'Nossa Ouvidoria retornará o contato o mais breve possível.'
            : 'Sua denúncia anônima será apurada com a mesma atenção e rigor.'}
        </p>
        <button
          onClick={() => setEnviado(false)}
          className="mt-8 rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          Enviar outro contato
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/10 bg-petrol-950/50 p-8 lg:p-10"
    >
      {/* Alternância — mesmas opções do portal original */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => setModo('identificado')}
          className={`flex items-center justify-center gap-2.5 rounded-2xl border px-5 py-4 text-[12px] font-bold uppercase tracking-[0.14em] transition-all ${
            modo === 'identificado'
              ? 'border-teal-400/60 bg-teal-600 text-white shadow-lg shadow-teal-600/25'
              : 'border-white/15 bg-petrol-900/60 text-petrol-100 hover:border-white/30'
          }`}
        >
          <IdCard className="h-4 w-4" aria-hidden />
          Contato identificado
        </button>
        <button
          type="button"
          onClick={() => setModo('anonimo')}
          className={`flex items-center justify-center gap-2.5 rounded-2xl border px-5 py-4 text-[12px] font-bold uppercase tracking-[0.14em] transition-all ${
            modo === 'anonimo'
              ? 'border-teal-400/60 bg-teal-600 text-white shadow-lg shadow-teal-600/25'
              : 'border-white/15 bg-petrol-900/60 text-petrol-100 hover:border-white/30'
          }`}
        >
          <VenetianMask className="h-4 w-4" aria-hidden />
          Contato anônimo
        </button>
      </div>

      <p className="mt-5 text-[13px] leading-relaxed text-petrol-100/70">
        {modo === 'identificado' ? (
          <>Para receber retorno sobre as tratativas do seu relato, identifique-se
          com nome, e-mail e telefone — assim será possível a troca de informações
          até a conclusão.</>
        ) : (
          <>Optando pela denúncia anônima, não conseguiremos dar retorno das
          tratativas — mas todas as averiguações serão realizadas até o fim.</>
        )}
      </p>

      <div className="mt-7 space-y-5">
        {modo === 'identificado' && (
          <div className="grid gap-5 sm:grid-cols-2">
            <input name="nome" required placeholder="Seu nome: *" className={inputClasse} />
            <input name="telefone" placeholder="Telefone:" className={inputClasse} />
            <input name="email" type="email" required placeholder="Seu e-mail: *" className={inputClasse} />
            <input name="email2" type="email" required placeholder="Confirme seu e-mail: *" className={inputClasse} />
          </div>
        )}
        <input name="assunto" required placeholder="Assunto: *" className={inputClasse} />
        <textarea
          name="mensagem"
          required
          rows={5}
          placeholder="Sua mensagem: *"
          className={`${inputClasse} resize-none`}
        />

        {modo === 'identificado' && (
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-white/20 bg-petrol-900/40 px-4 py-3.5 text-sm text-petrol-100/70 transition-colors hover:border-teal-400/50">
            <Paperclip className="h-4 w-4 shrink-0 text-teal-300" aria-hidden />
            {nomeArquivo ? (
              <span className="truncate font-medium text-white">{nomeArquivo}</span>
            ) : (
              <span>
                ESCOLHER ARQUIVO… <span className="text-petrol-200/50">· tamanho máximo 5MB</span>
              </span>
            )}
            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (f && f.size > 5 * 1024 * 1024) {
                  window.alert('O arquivo excede o tamanho máximo de 5MB.')
                  e.target.value = ''
                  setNomeArquivo('')
                  return
                }
                setNomeArquivo(f ? f.name : '')
              }}
            />
          </label>
        )}

        <div className="flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[13px] text-petrol-100/70">
              Resolva o desafio para enviar:{' '}
              <strong className="text-white">{captchaA} + {captchaB}</strong>
            </p>
            <input
              name="captcha"
              inputMode="numeric"
              required
              placeholder="Resultado do desafio?"
              className={`${inputClasse} mt-2 w-52`}
            />
          </div>
          <button
            type="submit"
            disabled={enviando}
            className="inline-flex items-center gap-2.5 rounded-full bg-teal-600 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-teal-500 disabled:opacity-60"
          >
            {enviando ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                Enviando…
              </>
            ) : (
              <>
                Enviar
                <Send className="h-4 w-4" aria-hidden />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  )
}

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

// FAQ — paridade total com a página "Dúvidas Frequentes" do portal original
// (13 perguntas, mesmos textos e informações). Links úteis embutidos.
const Link = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target={href.startsWith('#') ? undefined : '_blank'}
    rel={href.startsWith('#') ? undefined : 'noreferrer'}
    className="font-semibold text-teal-700 underline decoration-teal-600/40 underline-offset-2 transition-colors hover:text-teal-800 hover:decoration-teal-700"
  >
    {children}
  </a>
)

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: 'Vocês atendem Pronto-Socorro?',
    a: 'Não. O Hospital Metropolitano Dr. Célio de Castro (HMDCC) não atende demandas espontâneas de urgência e emergência. O modelo de atendimento do Hospital é referenciado, ou seja, os pacientes atendidos aqui são encaminhados pela Central de Internação de Belo Horizonte ou SAMU.',
  },
  {
    q: 'Como agendar uma consulta?',
    a: 'As consultas ambulatoriais do HMDCC são consultas de pré e pós-operatório — de pacientes que passarão ou passaram por uma cirurgia no hospital. O ambulatório não é um ambulatório de especialidades: para uma consulta com especialista, o usuário deve procurar um Centro de Saúde.',
  },
  {
    q: 'Como agendar uma cirurgia?',
    a: 'Quem envia os pacientes que precisam de cirurgias de urgência e cirurgias programadas (eletivas) é a Central de Internação de Belo Horizonte. Ou seja, os pacientes que chegam ao HMDCC para um procedimento cirúrgico são encaminhados pela Central vindo das UPAs, Centros de Saúde ou de outros hospitais da rede pública.',
  },
  {
    q: 'Quais os documentos necessários para ser atendido no HMDCC?',
    a: (
      <>
        <strong>Cirurgia eletiva:</strong> documento com foto, Autorização de Internação
        Hospitalar (AIH), exames laboratoriais e de imagem quando realizados externamente,
        além dos termos cirúrgicos e anestésicos assinados na consulta pré-cirúrgica.{' '}
        <strong>Exames de imagem:</strong> ultrassom, endoscopia, colonoscopia, raio X,
        ecocardiograma e doppler exigem documento com foto e pedido médico; tomografia e
        arteriografia pedem também resultado recente de creatinina; embolização exige AIH,
        creatinina (últimos 30 dias) e relatório do nefrologista em caso de doença renal
        crônica; biópsia hepática pede hemograma e coagulograma (últimos 30 dias).
      </>
    ),
  },
  {
    q: 'Como agendar um exame no HMDCC?',
    a: 'O agendamento é realizado pela Central de Marcação de Consultas e Exames Especializados da Secretaria Municipal de Saúde de Belo Horizonte, que atende pedidos encaminhados pelos Centros de Saúde, UPAs e outros municípios, de acordo com a prioridade clínica e o risco de cada usuário. Dessa forma, não é possível agendar um exame diretamente no HMDCC.',
  },
  {
    q: 'Quais exames o hospital oferece?',
    a: 'O HMDCC conta com uma completa e moderna estrutura para exames: angiografia, angiotomografia, biópsia guiada por imagem, colonoscopia, endoscopia, gastrostomia, CPRE, ecocardiografia, raio X, tomografia, ultrassonografia e arteriografia diagnóstica e terapêutica (neurocirurgia e cirurgia vascular).',
  },
  {
    q: 'Como faço para solicitar um resultado de exame?',
    a: (
      <>
        Envie um e-mail com a sua solicitação para{' '}
        <Link href="mailto:spp@hmdcc.com.br">spp@hmdcc.com.br</Link>.
      </>
    ),
  },
  {
    q: 'Quais especialidades o hospital oferece?',
    a: 'O HMDCC é referência de alta complexidade em clínica médica, ortopedia, cirurgia geral, cirurgia vascular, neurocirurgia, neurologia e urologia. Também atende urgência e emergência clínica, cirúrgica e de Acidente Vascular Cerebral (AVC). Como não tem pronto-socorro, o paciente é atendido aqui referenciado pela Central de Internação de Belo Horizonte.',
  },
  {
    q: 'O Hospital tem maternidade?',
    a: 'O Hospital Metropolitano Dr. Célio de Castro não possui maternidade nem pediatria.',
  },
  {
    q: 'Como faço para trabalhar no Hospital Metropolitano Dr. Célio de Castro?',
    a: (
      <>
        As contratações ocorrem por meio da publicação de vagas em uma plataforma de
        seleção, baseada em Edital divulgado no Diário Oficial do Município (DOM) e no
        site do hospital. Acompanhe as publicações e inscreva-se em{' '}
        <Link href="https://hmdcc.gupy.io/">hmdcc.gupy.io</Link>. Trata-se de seleção
        pública com contratação CLT — não é concurso público. Para funções de apoio
        terceirizadas (auxiliar administrativo, auxiliar de serviços gerais, porteiro e
        vigilante), envie currículo para{' '}
        <Link href="mailto:stephania.almeida@verzani.com.br">
          stephania.almeida@verzani.com.br
        </Link>
        ; para recepcionista, para{' '}
        <Link href="mailto:artebrilho@artebrilhoserv.com.br">
          artebrilho@artebrilhoserv.com.br
        </Link>{' '}
        e{' '}
        <Link href="mailto:supervisor1@artebrilhoserv.com.br">
          supervisor1@artebrilhoserv.com.br
        </Link>{' '}
        — telefone (31) 3422-4515.
      </>
    ),
  },
  {
    q: 'O que é preciso para fazer residência no hospital?',
    a: 'O HMDCC possui programas de residência médica em Clínica Médica, Cirurgia Geral e Medicina Intensiva. Para concorrer a uma vaga, é necessário aguardar a publicação anual das vagas via Processo Seletivo Unificado de Minas Gerais (PSU-MG).',
  },
  {
    q: 'Como faço para fazer estágio no Hospital?',
    a: (
      <>
        <strong>Estágio de residência:</strong> verifique se há acordo de cooperação com
        o hospital de origem; caso contrário, a COREME/COREMU ou setor de ensino pode
        enviar a proposta ao NEPE ({' '}
        <Link href="mailto:ensino.pesquisa@hmdcc.com.br">ensino.pesquisa@hmdcc.com.br</Link>{' '}
        ). <strong>Estágio curricular:</strong> exige convênio firmado entre o hospital e
        a instituição de ensino; sem convênio, a coordenação de estágio pode propor o
        acordo ao NEPE. <strong>Estágio remunerado:</strong> vagas para diversos cursos
        de graduação, com ingresso por análise de currículo e entrevista — as vagas são
        divulgadas por e-mail ao banco de currículos e em editais no site, no Instagram e
        no LinkedIn.
      </>
    ),
  },
  {
    q: 'O que preciso fazer para agendar uma visita técnica?',
    a: (
      <>
        O HMDCC está de portas abertas para representantes de hospitais, empresas,
        instituições e órgãos públicos e privados. A visita de{' '}
        <strong>benchmarking</strong> é solicitada pelo formulário de visita técnica
        (dúvidas:{' '}
        <Link href="mailto:benchmarking@hmdcc.com.br">benchmarking@hmdcc.com.br</Link>);
        a visita <strong>técnico-acadêmica</strong>, destinada a estudantes, é solicitada
        pelo formulário do NEPE ({' '}
        <Link href="mailto:ensino.pesquisa@hmdcc.com.br">
          ensino.pesquisa@hmdcc.com.br
        </Link>{' '}
        ), com no máximo 18 visitantes por dia e grupos de 6 pessoas na assistência.
      </>
    ),
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
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a
                href="https://www2.hmdcc.com.br/wp-content/uploads/2025/07/BOLETIM-MEDICO-INFO-V53-15-07.pdf"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full border border-hairline bg-ivory px-6 py-3 text-sm font-semibold text-petrol-900 transition-all hover:border-petrol-900 hover:bg-petrol-900 hover:text-white"
              >
                <FileDown className="h-4 w-4 text-teal-600 group-hover:text-teal-300" aria-hidden />
                Visualizar e baixar o guia completo de visitas
              </a>
              <a
                href="https://wp.hmdcc.com.br/wp-content/uploads/2025/07/FOLDER-HORIZONTAL-DIGITAL-2025.pdf"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full border border-hairline bg-ivory px-6 py-3 text-sm font-semibold text-petrol-900 transition-all hover:border-petrol-900 hover:bg-petrol-900 hover:text-white"
              >
                <IdCard className="h-4 w-4 text-teal-600 group-hover:text-teal-300" aria-hidden />
                Folder do paciente (PDF oficial)
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

            <div className="flex flex-col justify-center">
              <Reveal delay={0.1}>
                <OuvidoriaChannel />
              </Reveal>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
