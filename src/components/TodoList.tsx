import { TodoCard } from './TodoCard'

import type { Todo } from '../types'

type TodoListProps = {
  todos: Todo[]
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <>
      {todos
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
    </>
  )
}
