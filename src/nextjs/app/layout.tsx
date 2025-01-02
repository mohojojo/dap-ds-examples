
import localFont from 'next/font/local'
import { ReactNode, Suspense } from 'react'
import 'dap-design-system/dist/light.theme.css'

import ClientApplication from '@/app/clientApplication'

const inter = localFont({
  src: '../public/fonts/InterVariable.woff2',
  display: 'swap',
  weight: '500 700',
  style: 'normal',
  declarations: [
    { prop: 'font-feature-settings', value: "'liga' 1,'calt' 1,'ss02' 1" },
    { prop: 'font-variation-settings', value: "'slnt' 0" },
    { prop: 'font-optical-sizing', value: 'auto' },
  ],
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientApplication>
          <Suspense>
            <dap-ds-snackbar></dap-ds-snackbar>
            <main className="main" id="root">
              {children}
            </main>
          </Suspense>
        </ClientApplication>
      </body>
    </html>
  )
}

