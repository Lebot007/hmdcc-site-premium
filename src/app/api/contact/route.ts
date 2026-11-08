import { NextResponse } from 'next/server'

interface ContactPayload {
  name?: string
  email?: string
  phone?: string
  subject?: string
  message?: string
  reason?: string
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload

    const { name, email, subject, message, reason } = body

    if (!name || !email || !subject || !message || !reason) {
      return NextResponse.json(
        { error: 'Campos obrigatórios ausentes.' },
        { status: 400 }
      )
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!emailOk) {
      return NextResponse.json({ error: 'E-mail inválido.' }, { status: 400 })
    }

    // In production this would persist to the database / notify the team.
    console.log('[HMDCC Contato]', {
      name,
      email,
      phone: body.phone ?? '',
      subject,
      reason,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json(
      { error: 'Não foi possível processar a mensagem.' },
      { status: 500 }
    )
  }
}
