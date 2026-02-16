'use client'

import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import LifeEventCards from '../components/LifeEventCards'
import LatestNews from '../components/LatestNews'
import ServiceCards from '../components/ServiceCards'
import WebAdminSection from '../components/WebAdminSection'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <dap-ds-official-website-banner></dap-ds-official-website-banner>
      <Header />
      <main id="main-content">
        <HeroSection />
        <LifeEventCards />
        <ServiceCards />
        <LatestNews />
        <WebAdminSection />
      </main>
      <Footer />
    </>
  )
}
