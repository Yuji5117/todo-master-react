import { clsx } from 'clsx'
import { FaTrashAlt } from 'react-icons/fa'

import { Button } from './ui/Button'
import { CheckBox } from './ui/CheckBox'
import { Modal } from './ui/Modal'
import { UpdateTodoForm } from './UpdateTodoForm'
import { useModal } from '../hooks/use-modal'
import { useDeleteTodo, useUpdateTodoCompletion } from '../hooks/use-todos'
import type { Todo } from '../schemas/todo.schema'

export type TodoCardType = {
  todo: Todo
}

export const TodoCard: React.FC<TodoCardType> = ({ todo }) => {
  const { isOpen, openModal, closeModal } = useModal()
  const updateTodoCompletion = useUpdateTodoCompletion()
  const deleteTodo = useDeleteTodo()

  const { id, title, memo, isCompleted } = todo

  const handleDeleteTodo = (id: string) => {
    const ok = confirm('本当に削除しますか？ この操作は元に戻せません。')
    if (!ok) return

    deleteTodo.mutate(id)
  }

  return (
    <>
      <div
        className={clsx(
          'flex justify-between rounded-md px-4 py-3 shadow-md transition-colors duration-200',
          isCompleted ? 'border border-green-300 bg-green-50' : 'bg-white',
        )}
      >
        <div className="flex space-x-4">
          <div className="flex items-center">
            <CheckBox
              checked={isCompleted}
              onChange={(checked: boolean) =>
                updateTodoCompletion.mutate({ id, isCompleted: checked })
              }
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg">{title}</h2>
            {memo && <p className="text-sm font-light text-[#111827]">{memo}</p>}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button text="Edit" onClick={openModal} variant="primary" size="sm" />
          <FaTrashAlt
            onClick={() => handleDeleteTodo(id)}
            className="text-error cursor-pointer text-sm transition-colors duration-200 hover:text-red-300"
          />
        </div>
        {isOpen && (
          <Modal onClose={closeModal}>
            <UpdateTodoForm id={id} title={title} memo={memo} onClose={closeModal} />
          </Modal>
        )}
      </div>
    </>
  )
}
