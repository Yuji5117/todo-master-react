import { TodoCard } from './TodoCard'

import type { Todo } from '../types'

type TodoListProps = {
  todos: Todo[]
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <p className="mb-4 text-xl">No todos to display</p>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col space-y-4">
      {todos.map(todo => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </div>
  )
}
