'use client'

import { ReactNode, useEffect } from 'react'

export default function ClientApplication({
  children,
}: {
  children: ReactNode
}) {
  useEffect(() => {
    async function getComponents() {
      await import('dap-design-system/dist/dds')
    }

    getComponents()
  }, [])

  return children
}
