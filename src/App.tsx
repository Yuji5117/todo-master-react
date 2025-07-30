import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { getTodos } from './api/todo'
import { CreateTodoForm } from './components/CreateTodoForm'
import { FloatingActionButton } from './components/FloatingActionButton'
import { Modal } from './components/Modal'
import { TodoCard } from './components/TodoCard'

export const App: React.FC = () => {
  const [toggleModal, setToggleModal] = useState<boolean>(false)
  const { isPending, data, isError, error } = useQuery({ queryKey: ['todos'], queryFn: getTodos })

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="relative m-auto flex h-[620px] w-2/4 flex-col overflow-hidden rounded-md border border-[#E5E7EB] shadow-md">
        <div className="bg-primary flex h-12 items-center justify-center">
          <h1 className="text-xl font-semibold text-white">Todo Master</h1>
        </div>
        <div className="flex-1 flex-col space-y-4 overflow-auto py-8">
          {data.data.map(todo => (
            <div key={todo.id}>
              <TodoCard
                id={todo.id}
                title={todo.title}
                memo={todo.memo}
                isCompleted={todo.isCompleted}
              />
            </div>
          ))}
        </div>
        <FloatingActionButton onClick={() => setToggleModal(true)} />
      </div>
      {toggleModal && (
        <Modal onClose={() => setToggleModal(false)}>
          <CreateTodoForm onClose={() => setToggleModal(false)} />
        </Modal>
      )}
    </div>
  )
}
