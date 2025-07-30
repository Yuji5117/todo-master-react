import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { Button } from './Button'
import { CheckBox } from './CheckBox'
import { Modal } from './Modal'
import { updateTodoCompletion } from '../api/todos'

export type TodoCardType = {
  id: string
  title: string
  memo?: string
  isCompleted: boolean
}

export const TodoCard: React.FC<TodoCardType> = ({ id, title, memo = '', isCompleted }) => {
  const [toggleModal, setToggleModal] = useState<boolean>(false)
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: updateTodoCompletion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const handleCheck = (id: string, checked: boolean) =>
    mutation.mutate({ id, isCompleted: checked })

  return (
    <div className="m-auto flex w-3/4 justify-between rounded-md bg-white px-4 py-3 shadow-md">
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
      <div className="flex items-center">
        <Button text="Edit" onClick={() => setToggleModal(true)} variant="primary" size="sm" />
      </div>
      {toggleModal && (
        <Modal onClose={() => setToggleModal(false)}>
          <div>test</div>
        </Modal>
      )}
    </div>
  )
}
