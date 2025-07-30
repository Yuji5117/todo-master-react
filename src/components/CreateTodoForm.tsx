import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { Button } from './Button'
import { createNewTodo } from '../api/todos'

import type { CreateNewTodoPayload } from '../types'

export type CreateTodoFormProps = {
  onClose: (value: boolean) => void
}

export const CreateTodoForm: React.FC<CreateTodoFormProps> = ({ onClose }) => {
  const queryClient = useQueryClient()
  const [title, setTitle] = useState<string>('')
  const [memo, setMemo] = useState<string>('')

  const mutation = useMutation({
    mutationFn: createNewTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      onClose(false)
    },
  })

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newTodo: CreateNewTodoPayload = {
      title: title,
      memo: memo,
    }

    mutation.mutate(newTodo)
  }
  return (
    <>
      <h2 className="mb-8 text-center text-2xl font-semibold">Create New Todo</h2>
      <form onSubmit={handleFormSubmit} className="mb-4 flex flex-col space-y-8">
        <input
          type="text"
          placeholder="Enter your todo"
          onChange={e => setTitle(e.target.value)}
          className="focus:ring-opacity-50 w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
        <textarea
          rows={4}
          placeholder="Add a memo"
          onChange={e => setMemo(e.target.value)}
          className="focus:ring-opacity-50 w-full resize-y rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
        ></textarea>
        <Button text="Add Todo" size="lg" type="submit" />
      </form>
    </>
  )
}
