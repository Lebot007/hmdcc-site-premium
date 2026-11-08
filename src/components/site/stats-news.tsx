'use client'

import Image from 'next/image'
import { ArrowUpRight, CalendarDays } from 'lucide-react'
import { Reveal, Section, SectionHeader, Counter } from './bits'

const stats = [
  { value: 142095, label: 'Internações hospitalares' },
  { value: 66967, label: 'Cirurgias realizadas' },
  { value: 12590, label: 'Atendimentos AVC' },
  { value: 34466, label: 'Atendimentos CTI' },
  { value: 988363, label: 'Exames de imagem' },
  { value: 187225, label: 'Consultas especializadas*' },
  { value: 7863999, label: 'Exames laboratoriais' },
]

const news = [
  {
    day: '30',
    month: 'out',
    year: 2026,
    tag: 'Segurança do Paciente',
    image: '/images/noticias/seminario-realizado.jpg',
    alt: 'I Seminário de Segurança do Paciente do Hospital Célio de Castro',
    title:
      'Hospital Célio de Castro estreia I Seminário de Segurança do Paciente com casa cheia',
    excerpt:
      'Vagas esgotadas, programação de qualidade e público interessado marcaram a primeira edição do seminário, uma iniciativa do Grupo Acelerador de Prevenção de Lesão por Pressão.',
  },
  {
    day: '09',
    month: 'out',
    year: 2026,
    tag: 'Reconhecimento',
    image: '/images/noticias/premio-ser-humano.jpg',
    alt: 'Equipe do HMDCC premiada no Prêmio Ser Humano',
    title: 'Célio de Castro vence duas categorias do Prêmio Ser Humano 2026',
    excerpt:
      'Uma noite de emoção: a instituição saiu vencedora em duas categorias de um dos maiores reconhecimentos em gestão de pessoas do país, promovido pela ABRH.',
  },
  {
    day: '06',
    month: 'out',
    year: 2026,
    tag: 'Inovação',
    image: '/images/noticias/trombectomia.jpg',
    alt: 'Serviço de Trombectomia Mecânica do HMDCC',
    title:
      'HMDCC é primeiro hospital do SUS-BH a ofertar trombectomia mecânica para tratamento do AVC',
    excerpt:
      'O serviço foi inaugurado na maior Unidade de AVC de Minas Gerais — e a instituição é também a segunda do estado a oferecer o procedimento aos usuários do SUS.',
  },
  {
    day: '01',
    month: 'out',
    year: 2026,
    tag: 'Eventos',
    image: '/images/noticias/seminario-inscricoes.jpg',
    alt: 'Inscrições abertas para o I Seminário de Segurança do Paciente',
    title:
      'Inscreva-se no I Seminário de Segurança do Paciente do Hospital Célio de Castro',
    excerpt:
      'Evento gratuito e aberto a profissionais de saúde de outras instituições, com o olhar multiprofissional para a prevenção de lesão por pressão.',
  },
  {
    day: '28',
    month: 'set',
    year: 2026,
    tag: 'Ensino',
    image: '/images/noticias/residencia-medica.jpg',
    alt: 'Residência Médica 2027 do Hospital Célio de Castro',
    title: 'Hospital Célio de Castro oferta 36 vagas para residência médica',
    excerpt:
      'Inscrições abertas para os Programas de Residência Médica via PSU — incluindo o novo programa de geriatria, que estreia em 2027.',
  },
  {
    day: '19',
    month: 'set',
    year: 2026,
    tag: 'Institucional',
    image: '/images/noticias/video-institucional.jpg',
    alt: 'Vídeo institucional do Hospital Célio de Castro',
    title: 'O gigante que a gente sente. Hospital Célio de Castro lança novo vídeo',
    excerpt:
      'Nascido no aniversário de Belo Horizonte como um presente para a população, o hospital celebra um modelo de gestão pioneiro que hoje é referência para todo o país.',
  },
  {
    day: '21',
    month: 'ago',
    year: 2026,
    tag: 'Mutirão',
    image: '/images/noticias/brasil-sem-varizes.jpg',
    alt: 'Mutirão Brasil Sem Varizes',
    title: "Hospital Célio de Castro presente no mutirão 'Brasil Sem Varizes'",
    excerpt:
      'Uma convocação nacional mobilizou 100 serviços de saúde. Em um só dia, 1.191 cirurgias foram realizadas em 18 estados — com o HMDCC entre as instituições mineiras participantes.',
  },
  {
    day: '13',
    month: 'ago',
    year: 2026,
    tag: 'Qualidade',
    image: '/images/noticias/nota-100.jpg',
    alt: 'Nota 100 no NPS de satisfação dos pacientes',
    title:
      'Hospital Célio de Castro recebe nota 100 de pacientes pelo sétimo mês seguido',
    excerpt:
      'Na zona de excelência da pesquisa de satisfação NPS há mais de cinco anos, o hospital registrou nota 100 de janeiro a julho de 2026 — reconhecimento da qualidade e da segurança do cuidado.',
  },
]

export function StatsAndNews() {
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
              className="max-w-xl"
            />
            <Reveal delay={0.15}>
              <a
                href="https://www.hmdcc.com.br/noticias"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-petrol-900/15 px-6 py-3 text-sm font-semibold text-petrol-900 transition-all hover:border-petrol-900 hover:bg-petrol-900 hover:text-white"
              >
                Ver mais notícias
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </a>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {news.map((item, i) => (
              <Reveal key={item.title} delay={0.05 * (i % 4)}>
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-hairline bg-ivory transition-all duration-300 hover:-translate-y-1.5 hover:border-petrol-200 hover:bg-white hover:shadow-xl hover:shadow-petrol-950/[0.09]">
                  <div className="relative aspect-[900/407] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-petrol-950/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      aria-hidden
                    />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/92 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-petrol-900 backdrop-blur-sm">
                      {item.tag}
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
        </div>
      </Section>
    </>
  )
}
