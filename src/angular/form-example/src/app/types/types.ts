export type AlertType = 'default' | 'information' | 'successful' | 'error'
export type LinkTarget = '_blank' | '_self' | '_parent' | '_top'

// If a function is set, show it as a button,
// otherwise as a link with all properties (target, rel, href).
export type ActionType = {
  href?: string
  target?: LinkTarget
  rel?: string
  text?: string
  func?: () => void
}

export type MessageOptionsType = {
  duration?: number
  alertType?: AlertType
  actions?: ActionType[]
  closeButton?: string
}
