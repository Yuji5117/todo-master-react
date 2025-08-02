import { TodoCard } from './TodoCard'

import type { Todo } from '../types'

type TodoListProps = {
  todos: Todo[]
  showCompleted: boolean
}

export const TodoList: React.FC<TodoListProps> = ({ todos, showCompleted }) => {
  const visibleTodos: Todo[] = showCompleted
    ? [...todos].sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted))
    : [...todos].filter(todo => !todo.isCompleted)

  if (visibleTodos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <p className="mb-4 text-xl">No todos to display</p>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col space-y-4">
      {visibleTodos.map(todo => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </div>
  )
}
