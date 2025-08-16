import { useState } from 'react'

import { Button } from './ui/Button'
import { Form } from './ui/Form'
import { useUpdateTodo } from '../hooks/use-todos'
import type { UpdateTodoPayload } from '../schemas/todo.schema'

export type UpdateTodoFormProps = {
  id: string
  title: string
  memo?: string
  onClose: () => void
}

export const UpdateTodoForm: React.FC<UpdateTodoFormProps> = ({ id, title, memo, onClose }) => {
  const updateTodo = useUpdateTodo(onClose)
  const [editedTitle, setEditedTitle] = useState<string>(title)
  const [editedMemo, setEditedMemo] = useState<string>(memo ?? '')
  const [error, setError] = useState<string>('')

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const updatedTodo: UpdateTodoPayload = {
      id: id,
      title: editedTitle,
      memo: editedMemo,
    }

    if (updatedTodo.title.length === 0) {
      setError('Title is required')
      return
    }

    updateTodo.mutate(updatedTodo)
  }
  return (
    <Form title="Update Todo" onSubmit={handleFormSubmit}>
      <div>
        <input
          type="text"
          placeholder="Enter your todo"
          value={editedTitle}
          onChange={e => setEditedTitle(e.target.value)}
          className="focus:ring-opacity-50 w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
        {error && <p className="text-error mt-1 px-4 text-sm">{error}</p>}
      </div>
      <textarea
        rows={4}
        placeholder="Add a memo"
        value={editedMemo}
        onChange={e => setEditedMemo(e.target.value)}
        className="focus:ring-opacity-50 w-full resize-y rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
      ></textarea>
      <Button text="Update Todo" size="lg" type="submit" />
    </Form>
  )
}
