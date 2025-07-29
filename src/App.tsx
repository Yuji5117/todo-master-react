import { useEffect, useState } from 'react'

import { FloatingActionButton } from './components/FloatingActionButton'
import { Modal } from './components/Modal'
import { TodoCard } from './components/TodoCard'
import { paths } from './config/paths'

import type { Todo } from './types'

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [toggleModal, setToggleModal] = useState<boolean>(false)

  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await fetch(paths.app.todos.path, {
          method: 'GET',
        })

        const decodedData = await response.json()

        setTodos(decodedData)
      } catch (error) {
        console.log('error', error)
      }
    }

    getTodos()
  })

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="relative m-auto flex h-[620px] w-2/4 flex-col overflow-hidden rounded-md border border-[#E5E7EB] shadow-md">
        <div className="bg-primary flex h-12 items-center justify-center">
          <h1 className="text-xl font-semibold text-white">Todo Master</h1>
        </div>
        <div className="flex-1 flex-col space-y-4 overflow-auto py-8">
          {todos.map(todo => (
            <div key={todo.id}>
              <TodoCard title={todo.title} memo={todo.memo} isCompleted={todo.isCompleted} />
            </div>
          ))}
        </div>
        <FloatingActionButton onClick={() => setToggleModal(true)} />
      </div>
      {toggleModal && <Modal toggle={setToggleModal} />}
    </div>
  )
}
