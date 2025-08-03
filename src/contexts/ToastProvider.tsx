import React, { useCallback, useState, type ReactNode } from 'react'

import { ToastContext, type ToastType } from './ToastContext'
import { Toast } from '../components/ui/Toast'

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<ToastType | null>(null)

  const addToast = useCallback((message: string, type: ToastType['type']) => {
    setToast({ message, type })
  }, [])

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {toast && <Toast message={toast.message} onClose={() => setToast(null)} />}
    </ToastContext.Provider>
  )
}
