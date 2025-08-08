import { MessageOptionsType } from './src/types/types'
import 'dap-design-system/dist/manifest/types/vue/index.js'

declare global {
  interface Window {
    showDapSnackbar?: (message: string, options?: MessageOptionsType) => void
  }
}

export {}
