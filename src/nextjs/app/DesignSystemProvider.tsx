'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

type DesignSystemContextValue = {
  ready: boolean
}

const DesignSystemContext = createContext<DesignSystemContextValue>({ ready: false })

export function useDesignSystemReady(): boolean {
  return useContext(DesignSystemContext).ready
}

export function DesignSystemProvider({
  locale,
  children,
}: {
  locale: string
  children: ReactNode
}) {
  const [ready, setReady] = useState(false)

  const loadDesignSystem = useCallback(async () => {
    await import('dap-design-system')
    setReady(true)
  }, [])

  useEffect(() => {
    loadDesignSystem()
  }, [loadDesignSystem])

  useEffect(() => {
    if (!ready) return
    import('dap-design-system').then((mod) => {
      if (mod.i18next) {
        mod.i18next.changeLanguage(locale)
      }
    })
  }, [ready, locale])

  return (
    <DesignSystemContext.Provider value={{ ready }}>
      {children}
    </DesignSystemContext.Provider>
  )
}
