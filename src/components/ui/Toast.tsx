import { useEffect } from 'react'

export type ToastProps = {
  message: string
  duration?: number
  onClose: () => void
}

export const Toast: React.FC<ToastProps> = ({ message, duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  return <div className="bg-success fixed top-4 right-4 rounded px-4 py-2 shadow">{message}</div>
}
