import { type ReactNode } from 'react'

import { CreateTodoForm } from './CreateTodoForm'
import { FloatingActionButton } from './FloatingActionButton'
import { Modal } from './Modal'
import { useModal } from '../hooks/useModal'

type LayoutProps = {
  children: ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isOpen, openModal, closeModal } = useModal()
  return (
    <div className="relative m-auto flex h-screen max-w-2xl flex-col overflow-hidden bg-[#F9FAFB]">
      <header className="bg-primary flex h-12 items-center justify-center">
        <h1 className="text-xl font-semibold text-white">Todo Master</h1>
      </header>
      <main className="relative flex-1 overflow-y-auto">{children}</main>
      <FloatingActionButton onClick={openModal} />
      {isOpen && (
        <Modal onClose={closeModal}>
          <CreateTodoForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  )
}
