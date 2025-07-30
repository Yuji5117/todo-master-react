import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { Button } from './Button'
import { updateTodo } from '../api/todos'

import type { UpdateTodoPayload } from '../types'

export type UpdateTodoFormProps = {
  id: string
  title: string
  memo?: string
  onClose: (value: boolean) => void
}

export const UpdateTodoForm: React.FC<UpdateTodoFormProps> = ({ id, title, memo, onClose }) => {
  const queryClient = useQueryClient()
  const [editedTitle, setEditedTitle] = useState<string>(title)
  const [editedMemo, setEditedMemo] = useState<string>(memo ?? '')

  const mutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      onClose(false)
    },
  })

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const updatedTodo: UpdateTodoPayload = {
      id: id,
      title: title,
      memo: memo,
    }

    mutation.mutate(updatedTodo)
  }
  return (
    <>
      <h2 className="mb-8 text-center text-2xl font-semibold">Update Todo</h2>
      <form onSubmit={handleFormSubmit} className="mb-4 flex flex-col space-y-8">
        <input
          type="text"
          placeholder="Enter your todo"
          value={editedTitle}
          onChange={e => setEditedTitle(e.target.value)}
          className="focus:ring-opacity-50 w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
        <textarea
          rows={4}
          placeholder="Add a memo"
          value={editedMemo}
          onChange={e => setEditedMemo(e.target.value)}
          className="focus:ring-opacity-50 w-full resize-y rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
        ></textarea>
        <Button text="Update Todo" size="lg" type="submit" />
      </form>
    </>
  )
}
