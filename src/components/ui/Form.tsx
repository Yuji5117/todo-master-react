import type { ReactNode } from 'react'

type FormProps = {
  children: ReactNode
  title: string
  onSubmit: (e: React.FormEvent) => void
}

export const Form: React.FC<FormProps> = ({ children, title, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="mb-4 flex flex-col space-y-8">
      <h2 className="mb-8 text-center text-2xl font-semibold">{title}</h2>
      {children}
    </form>
  )
}
