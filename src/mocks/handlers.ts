import { delay, http, HttpResponse } from 'msw'
import { v4 as uuid } from 'uuid'

import { paths } from '../config/paths'

import type { ApiResponse, CreateNewTodoPayload, Todo } from '../types'

const todos: Todo[] = [
  {
    id: '1',
    title: 'Buy groceries',
    memo: 'Milk, eggs, bread, and orange juice',
    isCompleted: false,
    createdAt: new Date(1722200000000).toISOString(),
  },
  {
    id: '2',
    title: 'Send project update',
    memo: 'Email the client about the current status and upcoming tasks',
    isCompleted: true,
    createdAt: new Date(1722201000000).toISOString(),
  },
  {
    id: '3',
    title: 'Workout',
    memo: '1 hour at the gym: cardio and legs',
    isCompleted: false,
    createdAt: new Date(1722202000000).toISOString(),
  },
  {
    id: '4',
    title: 'Call mom',
    memo: 'Check in and ask about weekend plans',
    isCompleted: true,
    createdAt: new Date(1722203000000).toISOString(),
  },
  {
    id: '5',
    title: 'Prepare meeting slides',
    memo: 'Include Q2 results and marketing roadmap',
    isCompleted: false,
    createdAt: new Date(1722204000000).toISOString(),
  },
  {
    id: '6',
    title: 'Read new article on AI trends',
    memo: 'The Verge just posted an interesting analysis on GPT-5',
    isCompleted: false,
    createdAt: new Date(1722205000000).toISOString(),
  },
]

export const handlers = [
  http.get(paths.app.todos.path, async () => {
    await delay()
    const response: ApiResponse<Todo[]> = {
      data: todos,
      message: 'Fetched successfully',
      statusCode: 200,
    }
    return HttpResponse.json(response)
  }),

  http.post(paths.app.todos.path, async ({ request }) => {
    const newTodo = (await request.json()) as CreateNewTodoPayload
    const todoWithId: Todo = {
      ...newTodo,
      id: uuid(),
      isCompleted: false,
      createdAt: new Date().toISOString(),
    }
    todos.push(todoWithId)
    return HttpResponse.json(todoWithId)
  }),

  http.patch(`${paths.app.todos.path}:id`, async ({ request, params }) => {
    const { id } = params
    const { isCompleted } = (await request.json()) as { isCompleted: boolean }
    const index = todos.findIndex(todo => id === todo.id)
    if (index === -1)
      return HttpResponse.json({
        message: 'Todo not found',
        error: 'Invalid ID',
        data: null,
        statusCode: 404,
      })

    todos[index].isCompleted = isCompleted

    return HttpResponse.json({
      data: todos[index],
      message: 'Todo updated successfully',
      statusCode: 200,
    })
  }),
]
