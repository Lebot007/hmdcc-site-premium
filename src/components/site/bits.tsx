'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

/* ---------------------------------- Reveal --------------------------------- */

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: React.ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.65, 0.35, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* -------------------------------- Counter ---------------------------------- */

export function Counter({
  value,
  duration = 2,
  className,
}: {
  value: number
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    let raf: number
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - p, 4)
      const current = Math.round(value * eased)
      setDisplay(current.toLocaleString('pt-BR'))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])

  return (
    <span ref={ref} className={cn('tabular', className)}>
      {display}
    </span>
  )
}

/* ------------------------------ Section header ------------------------------ */

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  dark = false,
  className,
}: {
  eyebrow: string
  title: React.ReactNode
  description?: string
  align?: 'left' | 'center'
  dark?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      <Reveal>
        <div
          className={cn(
            'flex items-center gap-3 mb-5',
            align === 'center' && 'justify-center'
          )}
        >
          <span className="h-px w-8 bg-teal-600" aria-hidden />
          <span
            className={cn(
              'text-[11px] font-semibold uppercase tracking-[0.22em]',
              dark ? 'text-teal-300' : 'text-teal-700'
            )}
          >
            {eyebrow}
          </span>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={cn(
            'font-display text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.12] font-medium tracking-tight text-balance',
            dark ? 'text-white' : 'text-petrol-900'
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.16}>
          <p
            className={cn(
              'mt-5 text-base sm:text-lg leading-relaxed',
              dark ? 'text-petrol-100/80' : 'text-ink-soft'
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  )
}

/* ------------------------------- Page shell -------------------------------- */

export function Section({
  id,
  className,
  children,
}: {
  id?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className={cn('relative', className)}>
      {children}
    </section>
  )
}
