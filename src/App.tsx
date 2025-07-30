import { useQuery } from '@tanstack/react-query'

import { getTodos } from './api/todos'
import { LoadingSpinner } from './components/LoadingSpinner'
import { TodoCard } from './components/TodoCard'

export const App: React.FC = () => {
  const { isPending, data, isError, error } = useQuery({ queryKey: ['todos'], queryFn: getTodos })

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
        <div className="w-full space-y-4 py-8">
          {data.data
            .slice()
            .sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted))
            .map(todo => (
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
    </>
  )
}
