import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { getTodos } from './api/todos'
import { TodoSection } from './components/TodoSection'
import { SearchBar } from './components/ui/SearchBar'
import { useDebounce } from './hooks/use-debounce'
import type { Todo } from './schemas/todo.schema'

export const App: React.FC = () => {
  const [query, setQuery] = useState<string>('')
  const debouncedQuery = useDebounce<string>(query)
  const { isPending, data, isError, error } = useQuery({
    queryKey: ['todos', debouncedQuery],
    queryFn: () => getTodos(debouncedQuery),
  })
  const [showCompleted, setShowCompleted] = useState<boolean>(true)

  const todos: Todo[] = data?.data ?? []

  const visibleTodos: Todo[] = showCompleted
    ? [...todos].sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted))
    : [...todos].filter(todo => !todo.isCompleted)

  return (
    <div className="m-auto flex w-full flex-col space-y-4 px-8 py-8">
      <div className="flex w-full items-center justify-between gap-5">
        <SearchBar value={query} onChange={setQuery} />
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={() => setShowCompleted(prev => !prev)}
            className="peer sr-only"
          />
          <div className="peer-checked:bg-success h-6 w-11 rounded-full bg-gray-300 transition-colors duration-200" />
          <div className="absolute top-0.5 left-0.5 h-5 w-5 translate-x-0 transform rounded-full bg-white shadow duration-200 peer-checked:translate-x-5" />
        </label>
      </div>
      <div className=""></div>
      <TodoSection isLoading={isPending} isError={isError} error={error} todos={visibleTodos} />
    </div>
  )
}
