'use client'

import { useTranslations } from 'next-intl'

export default function HeroSection() {
  const t = useTranslations('hero')

  return (
    <section className="hero-section py-16 md:py-24">
      <div className="w-full max-w-(--dds-containers-xlarge) mx-auto px-4 text-center">
        <dap-ds-stack spacing={400} style={{ alignItems: 'center' }}>
          <dap-ds-typography
            variant="h1"
            style={{ color: 'white' }}
          >
            {t('title')}
          </dap-ds-typography>
          <dap-ds-typography
            variant="body-lg"
            inverted
          >
            {t('subtitle')}
          </dap-ds-typography>
          <div className="w-full max-w-xl mt-4">
            <dap-ds-search
              placeholder={t('searchPlaceholder')}
              size="lg"
            >
            </dap-ds-search>
          </div>
        </dap-ds-stack>
      </div>
    </section>
  )
}
