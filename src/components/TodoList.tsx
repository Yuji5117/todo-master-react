import { TodoCard } from './TodoCard'

import type { Todo } from '../types'

type TodoListProps = {
  todos: Todo[]
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <div className="flex w-full flex-col space-y-4">
      {todos
        .slice()
        .sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted))
        .map(todo => (
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
