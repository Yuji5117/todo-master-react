import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { getTodos } from './api/todos'
import { CreateTodoForm } from './components/CreateTodoForm'
import { FloatingActionButton } from './components/FloatingActionButton'
import { LoadingSpinner } from './components/LoadingSpinner'
import { Modal } from './components/Modal'
import { TodoCard } from './components/TodoCard'

export const App: React.FC = () => {
  const [toggleModal, setToggleModal] = useState<boolean>(false)
  const { isPending, data, isError, error } = useQuery({ queryKey: ['todos'], queryFn: getTodos })

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <>
      {isPending ? (
        <LoadingSpinner />
      ) : data.data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <p className="mb-4 text-xl">You have no todos yet.</p>
          <p className="text-sm">
            Click the <span className="font-bold">+</span> button to add your first task.
          </p>
        </div>
      ) : (
        <div className="space-y-4 py-8">
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
      )}
      <FloatingActionButton onClick={() => setToggleModal(true)} />
      {toggleModal && (
        <Modal onClose={() => setToggleModal(false)}>
          <CreateTodoForm onClose={() => setToggleModal(false)} />
        </Modal>
      )}
    </>
  )
}
