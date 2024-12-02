export {}

declare global {
  interface Window {
    showDapSnackbar?: (message: string, options?: any) => void
  }
}
