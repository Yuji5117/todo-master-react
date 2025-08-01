import { TodoCard } from './TodoCard'

import type { Todo } from '../types'

type TodoListProps = {
  todos: Todo[]
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  const sortedTodos: Todo[] = [...todos].sort(
    (a, b) => Number(a.isCompleted) - Number(b.isCompleted),
  )

  return (
    <div className="flex w-full flex-col space-y-4">
      {sortedTodos.map(todo => (
        <TodoCard
          key={todo.id}
          id={todo.id}
          title={todo.title}
          memo={todo.memo}
          isCompleted={todo.isCompleted}
        />
      ))}
    </div>
  )
}
