import { useContext, useState } from 'react'

import { Button } from './ui/Button'
import { Form } from './ui/Form'
import { ToastContext } from '../contexts/ToastContext'
import { UseCreateTodo } from '../hooks/use-todos'

import type { CreateNewTodoPayload } from '../types'

export type CreateTodoFormProps = {
  onClose: () => void
}

export const CreateTodoForm: React.FC<CreateTodoFormProps> = ({ onClose }) => {
  const createTodo = UseCreateTodo(onClose)
  const addToast = useContext(ToastContext)
  const [title, setTitle] = useState<string>('')
  const [memo, setMemo] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newTodo: CreateNewTodoPayload = {
      title: title,
      memo: memo,
    }

    if (newTodo.title.length === 0) {
      setError('Title is required')
      return
    }

    setError('')
    createTodo.mutate(newTodo)
    addToast?.addToast('新しいTodoを追加しました。', 'success')
  }
  return (
    <Form title="Create New Todo" onSubmit={handleFormSubmit}>
      <div>
        <input
          type="text"
          placeholder="Enter your todo"
          onChange={e => setTitle(e.target.value)}
          className="focus:ring-opacity-50 w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
        {error && <p className="text-error mt-1 px-4 text-sm">{error}</p>}
      </div>
      <textarea
        rows={4}
        placeholder="Add a memo"
        onChange={e => setMemo(e.target.value)}
        className="focus:ring-opacity-50 w-full resize-y rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
      ></textarea>
      <Button text="Add Todo" size="lg" type="submit" />
    </Form>
  )
}
