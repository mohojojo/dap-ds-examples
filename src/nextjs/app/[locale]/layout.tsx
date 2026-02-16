import localFont from "next/font/local"
import { ReactNode } from "react"
import { Metadata } from "next"
import { NextIntlClientProvider, hasLocale } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import "dap-design-system/dist/light.theme.css"
import "../globals.css"
import { DesignSystemProvider } from "@/app/DesignSystemProvider"
import { ThemeProvider } from "@/app/ThemeProvider"

import "dayjs/locale/hu"
import "dayjs/locale/en"
import "dayjs/locale/de"

import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat" // ES 2015
import localeData from "dayjs/plugin/localeData"
import LocalizedFormat from "dayjs/plugin/localizedFormat"

dayjs.extend(localeData)
dayjs.extend(LocalizedFormat)
dayjs.extend(customParseFormat)

const inter = localFont({
  src: "../../public/fonts/InterVariable.woff2",
  display: "swap",
  weight: "500 700",
  style: "normal",
  declarations: [
    { prop: "font-feature-settings", value: "'liga' 1,'calt' 1,'ss02' 1" },
    { prop: "font-variation-settings", value: "'slnt' 0" },
    { prop: "font-optical-sizing", value: "auto" },
  ],
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "metadata" })
  return {
    title: t("title"),
    description: t("description"),
  }
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <DesignSystemProvider locale={locale}>
            <ThemeProvider>
              <dap-ds-skip-link href="#elethelyzetek">
                {locale === "hu"
                  ? "Ugrás az Élethelyzetekre"
                  : "Skip to Life Events"}
              </dap-ds-skip-link>
              {children}
            </ThemeProvider>
          </DesignSystemProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
