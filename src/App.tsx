import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { getTodos } from './api/todos'
import { LoadingSpinner } from './components/LoadingSpinner'
import { TodoList } from './components/TodoList'

export const App: React.FC = () => {
  const { isPending, data, isError, error } = useQuery({ queryKey: ['todos'], queryFn: getTodos })
  const [showCompleted, setShowCompleted] = useState<boolean>(true)

  if (isError) {
    return (
      <div className="text-error flex flex-col items-center justify-center py-12">
        <h2 className="mb-2 text-xl font-semibold">Something went wrong</h2>
        <p className="text-sm text-gray-600">Error message: {error.message}</p>
      </div>
    )
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
        <div className="m-auto flex w-full flex-col space-y-4 px-8 py-8">
          <label className="flex cursor-pointer justify-end bg-amber-200">
            <input
              type="checkbox"
              checked={showCompleted}
              onChange={() => setShowCompleted(prev => !prev)}
              className="peer sr-only"
            />
            <div className="peer-checked:bg-success relative h-5 w-9 rounded-full bg-gray-300 transition-colors">
              <div className="absolute top-[2px] left-[2px] h-4 w-4 rounded-full bg-white transition-all peer-checked:translate-x-4"></div>
            </div>
          </label>
          <TodoList todos={data.data} />
        </div>
      )}
    </>
  )
}
