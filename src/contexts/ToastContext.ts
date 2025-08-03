import { createContext } from 'react'

export type ToastType = {
  message: string
  type: 'success' | 'error'
}

type ToastContextType = {
  addToast: (message: string, type: ToastType['type']) => void
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined)
