'use client'

import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { CheckCircle2, Loader2, MapPin, Phone, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { Reveal, Section, SectionHeader } from './bits'

const reasons = [
  { value: 'informacoes', label: 'Preciso de informações' },
  { value: 'sugestao', label: 'Quero sugerir' },
  { value: 'elogio', label: 'Quero elogiar' },
  { value: 'reclamacao', label: 'Quero reclamar' },
]

export function Contact() {
  const { toast } = useToast()
  const [sending, setSending] = useState(false)
  const [reason, setReason] = useState('informacoes')
  const [captchaA] = useState(() => Math.floor(Math.random() * 8) + 2)
  const [captchaB] = useState(() => Math.floor(Math.random() * 8) + 1)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    // Desafio matemático anti-spam
    const answer = Number(data.get('captcha'))
    if (answer !== captchaA + captchaB) {
      toast({
        title: 'Desafio incorreto',
        description: `Resolva o desafio matemático corretamente para enviar.`,
        variant: 'destructive',
      })
      return
    }

    // Validação no cliente (site estático, sem backend).
    // Ao integrar um serviço real (ex.: Formspree, API própria), envie os
    // dados via fetch para o endpoint correspondente após esta validação.
    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const subject = String(data.get('subject') || '').trim()
    const message = String(data.get('message') || '').trim()

    if (!name || !email || !subject || !message) {
      toast({
        title: 'Campos obrigatórios ausentes',
        description: 'Preencha nome, e-mail, assunto e mensagem antes de enviar.',
        variant: 'destructive',
      })
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: 'E-mail inválido',
        description: 'Informe um endereço de e-mail válido.',
        variant: 'destructive',
      })
      return
    }

    setSending(true)
    try {
      // Latência simulada para feedback visual de envio
      await new Promise((resolve) => setTimeout(resolve, 700))
      setSent(true)
      toast({
        title: 'Mensagem enviada com sucesso',
        description: 'Nossa equipe entrará em contato em breve.',
      })
      form.reset()
    } finally {
      setSending(false)
    }
  }

  return (
    <Section id="contato" className="bg-ivory py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeader
              eyebrow="Contato"
              title={
                <>
                  Estamos aqui para <em className="italic font-light text-teal-700">ouvir você</em>
                </>
              }
              description="Utilize o formulário para informações, sugestões, elogios e reclamações. Para denúncias anônimas, acesse o canal da Ouvidoria."
            />

            <div className="mt-10 space-y-4">
              <Reveal delay={0.15}>
                <div className="flex items-center gap-4 rounded-2xl border border-hairline bg-white p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-petrol-900">
                    <Phone className="h-5 w-5 text-teal-300" aria-hidden />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
                      Central de atendimento
                    </p>
                    <a
                      href="tel:+553134724000"
                      className="font-display text-lg font-medium text-petrol-900 hover:text-teal-700"
                    >
                      (31) 3472-4000
                    </a>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.22}>
                <div className="flex items-center gap-4 rounded-2xl border border-hairline bg-white p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-petrol-900">
                    <MapPin className="h-5 w-5 text-teal-300" aria-hidden />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
                      Endereço
                    </p>
                    <p className="font-display text-lg font-medium text-petrol-900">
                      Rua Dona Luiza, 311 · Milionários
                    </p>
                    <p className="text-sm text-ink-soft">Belo Horizonte / MG</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="overflow-hidden rounded-2xl border border-hairline">
                  <iframe
                    title="Mapa de localização do Hospital Metropolitano Dr. Célio de Castro"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=-44.0322%2C-19.9782%2C-43.9982%2C-19.9582&layer=mapnik"
                    className="h-56 w-full grayscale-[0.35]"
                    loading="lazy"
                  />
                </div>
              </Reveal>
            </div>
          </div>

          <Reveal delay={0.12}>
            <div className="rounded-[2rem] border border-hairline bg-white p-8 shadow-xl shadow-petrol-950/[0.05] lg:p-10">
              {sent ? (
                <div className="flex min-h-[480px] flex-col items-center justify-center text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 ring-1 ring-teal-600/20">
                    <CheckCircle2 className="h-8 w-8 text-teal-600" aria-hidden />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-medium text-petrol-900">
                    Mensagem enviada!
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
                    Agradecemos o seu contato. Nossa equipe responderá o mais
                    breve possível.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-8 rounded-full"
                    onClick={() => setSent(false)}
                  >
                    Enviar outra mensagem
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-7">
                  <div>
                    <Label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
                      Qual o motivo do seu contato?
                    </Label>
                    <RadioGroup
                      value={reason}
                      onValueChange={setReason}
                      className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2"
                    >
                      {reasons.map((r) => (
                        <Label
                          key={r.value}
                          htmlFor={`reason-${r.value}`}
                          className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                            reason === r.value
                              ? 'border-teal-600 bg-teal-50 text-petrol-950'
                              : 'border-hairline bg-ivory text-ink-soft hover:border-petrol-300'
                          }`}
                        >
                          <RadioGroupItem value={r.value} id={`reason-${r.value}`} />
                          {r.label}
                        </Label>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome completo *</Label>
                      <Input id="name" name="name" required placeholder="Seu nome" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="voce@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input id="phone" name="phone" placeholder="(31) 90000-0000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Assunto *</Label>
                      <Input id="subject" name="subject" required placeholder="Assunto da mensagem" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Escreva sua mensagem com o máximo de detalhes possível..."
                      className="resize-none"
                    />
                  </div>

                  <div className="flex flex-col gap-5 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-2">
                      <Label htmlFor="captcha">
                        Resolva o desafio para enviar: <strong>{captchaA} + {captchaB}</strong>
                      </Label>
                      <Input
                        id="captcha"
                        name="captcha"
                        inputMode="numeric"
                        required
                        className="w-32"
                        placeholder="?"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        type="reset"
                        variant="outline"
                        className="rounded-full px-6"
                        onClick={() => setReason('informacoes')}
                      >
                        Limpar campos
                      </Button>
                      <Button
                        type="submit"
                        disabled={sending}
                        className="inline-flex items-center gap-2.5 rounded-full bg-petrol-900 px-8 py-3.5 text-sm font-semibold text-white hover:bg-petrol-800"
                      >
                        {sending ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                            Enviando...
                          </>
                        ) : (
                          <>
                            Enviar formulário
                            <Send className="h-4 w-4" aria-hidden />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  <p className="text-xs leading-relaxed text-ink-soft">
                    * Caso queira realizar uma denúncia anônima, acesse o
                    formulário da{' '}
                    <a href="#ouvidoria" className="font-semibold text-teal-700 underline-offset-2 hover:underline">
                      Ouvidoria
                    </a>
                    .
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
