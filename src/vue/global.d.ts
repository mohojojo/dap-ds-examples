import { MessageOptionsType } from './src/types/types';

declare global {
  interface Window {
    showDapSnackbar?: (message: string, options?: MessageOptionsType) => void
  }
}

export {}

