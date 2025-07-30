import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'

import { Button } from './Button'
import { CheckBox } from './CheckBox'
import { Modal } from './Modal'
import { UpdateTodoForm } from './UpdateTodoForm'
import { deleteTodo, updateTodoCompletion } from '../api/todos'

export type TodoCardType = {
  id: string
  title: string
  memo?: string
  isCompleted: boolean
}

export const TodoCard: React.FC<TodoCardType> = ({ id, title, memo = '', isCompleted }) => {
  const [toggleModal, setToggleModal] = useState<boolean>(false)
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
    <div className="m-auto flex mx-8 justify-between rounded-md bg-white px-4 py-3 shadow-md">
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
        <Button text="Edit" onClick={() => setToggleModal(true)} variant="primary" size="sm" />
        <FaTrashAlt
          onClick={() => handleDeleteTodo(id)}
          className="text-error cursor-pointer text-sm transition-colors duration-200 hover:text-red-300"
        />
      </div>
      {toggleModal && (
        <Modal onClose={() => setToggleModal(false)}>
          <UpdateTodoForm id={id} title={title} memo={memo} onClose={() => setToggleModal(false)} />
        </Modal>
      )}
    </div>
  )
}
