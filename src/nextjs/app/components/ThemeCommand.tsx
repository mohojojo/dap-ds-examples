"use client"

import { useState } from "react"
import { useDesignSystemReady } from "@/app/DesignSystemProvider"
import { useTheme } from "@/app/ThemeProvider"
import { THEMES, type DapThemeId } from "@/app/theme-config"

export default function ThemeCommand() {
  const dsReady = useDesignSystemReady()
  const { theme, setTheme } = useTheme()
  const [opened, setOpened] = useState(false)

  const coreThemes = THEMES.filter((t) => t.group === "core")
  const colorThemes = THEMES.filter((t) => t.group === "color")

  const handleItemClick = (e: CustomEvent<{ value: string }>) => {
    const value = e.detail?.value as DapThemeId | undefined
    if (value) {
      setTheme(value)
      setOpened(false)
    }
  }

  // Only render dap-ds-command after the design system is loaded so custom
  // elements are defined and React's event props bind correctly (avoids
  // click handlers not firing after hard refresh due to upgrade timing).
  if (!dsReady) {
    return (
      <div
        className="size-10 flex items-center justify-center rounded-md opacity-50"
        aria-hidden
        title="Téma váltása (betöltés…)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path d="M12 2C17.5222 2 22 5.97778 22 10.8889C22 13.9556 19.5111 16.4444 16.4444 16.4444H14.4778C13.5556 16.4444 12.8111 17.1889 12.8111 18.1111C12.8111 18.5333 12.9778 18.9222 13.2333 19.2111C13.5 19.5111 13.6667 19.9 13.6667 20.3333C13.6667 21.2556 12.9 22 12 22C6.47778 22 2 17.5222 2 12C2 6.47778 6.47778 2 12 2Z" />
        </svg>
      </div>
    )
  }

  return (
    <dap-ds-command
      value={theme}
      opened={opened}
      ondds-opened={() => setOpened(true)}
      ondds-closed={() => setOpened(false)}
      aria-labelledby="theme-command-label"
    >
      <dap-ds-icon-button
        slot="trigger"
        label="Téma váltása"
        variant="neutral"
        size="lg"
        id="theme-command-label"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2C17.5222 2 22 5.97778 22 10.8889C22 13.9556 19.5111 16.4444 16.4444 16.4444H14.4778C13.5556 16.4444 12.8111 17.1889 12.8111 18.1111C12.8111 18.5333 12.9778 18.9222 13.2333 19.2111C13.5 19.5111 13.6667 19.9 13.6667 20.3333C13.6667 21.2556 12.9 22 12 22C6.47778 22 2 17.5222 2 12C2 6.47778 6.47778 2 12 2ZM10.8111 18.1111C10.8111 16.0843 12.451 14.4444 14.4778 14.4444H16.4444C18.4065 14.4444 20 12.851 20 10.8889C20 7.1392 16.4677 4 12 4C7.58235 4 4 7.58235 4 12C4 16.19 7.2226 19.6285 11.324 19.9718C10.9948 19.4168 10.8111 18.7761 10.8111 18.1111ZM7.5 12C6.67157 12 6 11.3284 6 10.5C6 9.67157 6.67157 9 7.5 9C8.32843 9 9 9.67157 9 10.5C9 11.3284 8.32843 12 7.5 12ZM16.5 12C15.6716 12 15 11.3284 15 10.5C15 9.67157 15.6716 9 16.5 9C17.3284 9 18 9.67157 18 10.5C18 11.3284 17.3284 12 16.5 12ZM12 9C11.1716 9 10.5 8.32843 10.5 7.5C10.5 6.67157 11.1716 6 12 6C12.8284 6 13.5 6.67157 13.5 7.5C13.5 8.32843 12.8284 9 12 9Z"></path>
        </svg>
      </dap-ds-icon-button>

      <dap-ds-command-group label="Alap témák" exclusive>
        {coreThemes.map((t) => (
          <dap-ds-command-item
            key={t.id}
            value={t.id}
            selected={theme === t.id}
            closeOnSelect
            ondds-command-item-click={handleItemClick}
          >
            {t.label}
          </dap-ds-command-item>
        ))}
      </dap-ds-command-group>

      <dap-ds-command-group label="Színváltozatok" exclusive>
        {colorThemes.map((t) => (
          <dap-ds-command-item
            key={t.id}
            value={t.id}
            selected={theme === t.id}
            closeOnSelect
            ondds-command-item-click={handleItemClick}
          >
            {t.label}
          </dap-ds-command-item>
        ))}
      </dap-ds-command-group>
    </dap-ds-command>
  )
}
