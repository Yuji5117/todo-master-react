import type { ReactNode } from 'react'

type LayoutProps = {
  children: ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="m-auto flex h-screen max-w-2xl flex-col overflow-hidden">
      <header className="bg-primary flex h-12 items-center justify-center">
        <h1 className="text-xl font-semibold text-white">Todo Master</h1>
      </header>
      <main className="overflow-y-aut relative flex-1">{children}</main>
    </div>
  )
}
