import type { Todo } from '../schemas/todo.schema'
import { TodoList } from './TodoList'
import { LoadingSpinner } from './ui/LoadingSpinner'

type TodoSectionProps = {
  isLoading: boolean
  isError: boolean
  error?: Error | null
  todos: Todo[]
}
export const TodoSection: React.FC<TodoSectionProps> = ({ isLoading, isError, error, todos }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center pt-12">
        <LoadingSpinner />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="text-error flex flex-col items-center justify-center py-12">
        <h2 className="mb-2 text-xl font-semibold">エラーが発生しました</h2>
        <p className="text-sm text-gray-600">エラーメッセージ: {error?.message}</p>
      </div>
    )
  }

  return <TodoList todos={todos} />
}
