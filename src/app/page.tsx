'use client'

import { Header } from '@/components/site/header'
import { Hero } from '@/components/site/hero'
import { StatsAndNews } from '@/components/site/stats-news'
import { Institutional } from '@/components/site/institutional'
import { Services } from '@/components/site/services'
import { CareersProcurement } from '@/components/site/careers'
import { Patient } from '@/components/site/patient'
import { Transparency } from '@/components/site/transparency'
import { Contact } from '@/components/site/contact'
import { Structure } from '@/components/site/structure'
import { CookieBanner, Footer } from '@/components/site/footer'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-ivory">
      <Header />
      <main className="flex-1">
        <Hero />
        <StatsAndNews />
        <Institutional />
        <Structure />
        <Services />
        <CareersProcurement />
        <Patient />
        <Transparency />
        <Contact />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  )
}
