import { useState, type ReactNode } from 'react'

import { CreateTodoForm } from './CreateTodoForm'
import { FloatingActionButton } from './FloatingActionButton'
import { Modal } from './Modal'

type LayoutProps = {
  children: ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [toggleModal, setToggleModal] = useState<boolean>(false)
  return (
    <div className="relative m-auto flex h-screen max-w-2xl flex-col overflow-hidden bg-[#F9FAFB]">
      <header className="bg-primary flex h-12 items-center justify-center">
        <h1 className="text-xl font-semibold text-white">Todo Master</h1>
      </header>
      <main className="relative flex-1 overflow-y-auto">{children}</main>
      <FloatingActionButton onClick={() => setToggleModal(true)} />
      {toggleModal && (
        <Modal onClose={() => setToggleModal(false)}>
          <CreateTodoForm onClose={() => setToggleModal(false)} />
        </Modal>
      )}
    </div>
  )
}
