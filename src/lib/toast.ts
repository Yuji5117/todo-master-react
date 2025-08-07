import { toastFn } from '../contexts/ToastProvider'

export const toast = {
  success: (message: string) => {
    toastFn(message, 'success')
  },
  error: (message: string) => {
    toastFn(message, 'error')
  },
}
