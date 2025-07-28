import { TodoCard } from './components/TodoCard'

import type { Todo } from './types'

const dummyTodos: Todo[] = Array.from({ length: 20 }, (_, i) => ({
  id: (i + 1).toString(),
  createdAt: Date.now() - i * 1000 * 60,
  title: `Todo Item ${i + 1}`,
  memo: `This is a memo for Todo ${i + 1}`,
  isCompleted: i % 2 === 0,
}))

export const App: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="m-auto flex h-[620px] w-2/4 flex-col overflow-hidden rounded-md border border-[#E5E7EB] shadow-md">
        <div className="bg-primary flex h-12 items-center justify-center">
          <h1 className="text-xl font-semibold text-white">Todo Master</h1>
        </div>
        <div className="flex-1 flex-col space-y-4 overflow-auto py-8">
          {dummyTodos.map(todo => (
            <div key={todo.id}>
              <TodoCard title={todo.title} memo={todo.memo} isCompleted={todo.isCompleted} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
