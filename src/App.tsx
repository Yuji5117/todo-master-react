import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { getTodos } from './api/todos'
import { TodoList } from './components/TodoList'
import { LoadingSpinner } from './components/ui/LoadingSpinner'

export const App: React.FC = () => {
  const { isPending, data, isError, error } = useQuery({ queryKey: ['todos'], queryFn: getTodos })
  const [showCompleted, setShowCompleted] = useState<boolean>(true)

  if (isPending) {
    return <LoadingSpinner />
  }

  if (isError) {
    return (
      <div className="text-error flex flex-col items-center justify-center py-12">
        <h2 className="mb-2 text-xl font-semibold">Something went wrong</h2>
        <p className="text-sm text-gray-600">Error message: {error.message}</p>
      </div>
    )
  }

  if (data.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <p className="mb-4 text-xl">You have no todos yet.</p>
        <p className="text-sm">
          Click the <span className="font-bold">+</span> button to add your first task.
        </p>
      </div>
    )
  }

  return (
    <div className="m-auto flex w-full flex-col space-y-4 px-8 py-8">
      <label className="relative inline-flex cursor-pointer items-center self-end">
        <input
          type="checkbox"
          checked={showCompleted}
          onChange={() => setShowCompleted(prev => !prev)}
          className="peer sr-only"
        />
        <div className="peer-checked:bg-success h-6 w-11 rounded-full bg-gray-300 transition-colors duration-200" />
        <div className="absolute top-0.5 left-0.5 h-5 w-5 translate-x-0 transform rounded-full bg-white shadow duration-200 peer-checked:translate-x-5" />
      </label>
      <TodoList todos={data.data} showCompleted={showCompleted} />
    </div>
  )
}
