import { useMutation, useQueryClient } from '@tanstack/react-query'
import { clsx } from 'clsx'
import { FaTrashAlt } from 'react-icons/fa'

import { Button } from './Button'
import { CheckBox } from './CheckBox'
import { Modal } from './Modal'
import { UpdateTodoForm } from './UpdateTodoForm'
import { deleteTodo, updateTodoCompletion } from '../api/todos'
import { useModal } from '../hooks/use-modal'

export type TodoCardType = {
  id: string
  title: string
  memo?: string
  isCompleted: boolean
}

export const TodoCard: React.FC<TodoCardType> = ({ id, title, memo = '', isCompleted }) => {
  const { isOpen, openModal, closeModal } = useModal()
  const queryClient = useQueryClient()
  const updateTodoMutation = useMutation({
    mutationFn: updateTodoCompletion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const handleCheck = (id: string, checked: boolean) =>
    updateTodoMutation.mutate({ id, isCompleted: checked })

  const handleDeleteTodo = async (id: string) => {
    const ok = confirm('Are you sure to delete this todo?')
    if (!ok) return

    deleteTodoMutation.mutate(id)
  }

  return (
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
            onChange={(checked: boolean) => handleCheck(id, checked)}
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
  )
}
