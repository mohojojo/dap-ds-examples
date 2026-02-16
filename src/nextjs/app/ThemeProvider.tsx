'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  bodyClassForTheme,
  themeStylesheetHref,
  THEME_BODY_CLASS,
  type DapThemeId,
} from './theme-config'

const STORAGE_KEY = 'dap-ds-theme'

type ThemeContextValue = {
  theme: DapThemeId
  setTheme: (theme: DapThemeId) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<DapThemeId>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as DapThemeId | null
    if (stored && ['light', 'dark', 'high-contrast', 'oklch', 'teal', 'cold-grey', 'azure', 'violet'].includes(stored)) {
      setThemeState(stored)
    }
    setMounted(true)
  }, [])

  const setTheme = useCallback((next: DapThemeId) => {
    setThemeState(next)
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, next)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    const linkId = 'dap-ds-theme-link'
    let link = document.getElementById(linkId) as HTMLLinkElement | null
    if (!link) {
      link = document.createElement('link')
      link.id = linkId
      link.rel = 'stylesheet'
      document.head.appendChild(link)
    }
    link.href = themeStylesheetHref(theme)

    const bodyClass = bodyClassForTheme(theme)
    const classesToRemove = Object.values(THEME_BODY_CLASS).filter(Boolean) as string[]
    classesToRemove.forEach((c) => document.body.classList.remove(c))
    if (bodyClass) document.body.classList.add(bodyClass)

    return () => {
      // Optionally remove link on unmount; keeping it is fine for SPA
    }
  }, [mounted, theme])

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
