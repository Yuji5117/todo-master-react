import { clsx } from 'clsx'
import { useEffect } from 'react'

export type ToastProps = {
  message: string
  duration?: number
  onClose: () => void
  type: 'success' | 'error'
}

export const Toast: React.FC<ToastProps> = ({ message, duration = 3000, onClose, type }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  const variant = {
    success: 'bg-success',
    error: 'bg-error',
  }

  return (
    <div className="flex justify-center">
      <div className={clsx(variant[type], 'fixed bottom-20 rounded px-4 py-2 text-white shadow')}>
        {message}
      </div>
    </div>
  )
}
