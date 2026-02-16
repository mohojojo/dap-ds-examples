'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'

const localeLabels: Record<string, string> = {
  hu: 'HU',
  en: 'EN',
}

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleSwitch = () => {
    const nextLocale = locale === 'hu' ? 'en' : 'hu'
    router.replace(pathname, { locale: nextLocale })
  }

  const nextLocale = locale === 'hu' ? 'en' : 'hu'

  return (
    <dap-ds-button
      variant="ghost"
      size="sm"
      onClick={handleSwitch}
      aria-label={`Switch to ${localeLabels[nextLocale]}`}
    >
      {localeLabels[nextLocale]}
    </dap-ds-button>
  )
}
