/**
 * DÁP Design System theme configuration.
 * @see https://services.gov.hu/design-system-dev/themes
 */

export const DAP_DS_VERSION = '0.52.10'
export const THEME_CSS_BASE = `https://cdn.jsdelivr.net/npm/dap-design-system@${DAP_DS_VERSION}/dist`

export type DapThemeId =
  | 'light'
  | 'dark'
  | 'high-contrast'
  | 'oklch'
  | 'teal'
  | 'cold-grey'
  | 'azure'
  | 'violet'

/** Themes that require a body class (scoped in the theme CSS). */
export const THEME_BODY_CLASS: Partial<Record<DapThemeId, string>> = {
  dark: 'dark-theme',
  'high-contrast': 'high-contrast-theme',
}

export const THEMES: { id: DapThemeId; label: string; group: 'core' | 'color' }[] = [
  { id: 'light', label: 'Light (indigo)', group: 'core' },
  { id: 'dark', label: 'Dark', group: 'core' },
  { id: 'high-contrast', label: 'High contrast', group: 'core' },
  { id: 'oklch', label: 'OKLCH (wide gamut)', group: 'core' },
  { id: 'teal', label: 'Teal', group: 'color' },
  { id: 'cold-grey', label: 'Cold grey', group: 'color' },
  { id: 'azure', label: 'Azure', group: 'color' },
  { id: 'violet', label: 'Violet', group: 'color' },
]

export function themeStylesheetHref(themeId: DapThemeId): string {
  const file = themeId === 'cold-grey' ? 'cold-grey.theme.css' : `${themeId}.theme.css`
  return `${THEME_CSS_BASE}/${file}`
}

export function bodyClassForTheme(themeId: DapThemeId): string | undefined {
  return THEME_BODY_CLASS[themeId]
}
