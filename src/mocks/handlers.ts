import { delay, http, HttpResponse } from 'msw'
import { v4 as uuid } from 'uuid'

import { paths } from '../config/paths'

import type { ApiResponse, BaseUpdateTodoPayload, CreateNewTodoPayload, Todo } from '../types'

let todos: Todo[] = [
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
  {
    id: '7',
    title: 'Walk the dog',
    memo: 'Evening walk around the neighborhood',
    isCompleted: false,
    createdAt: new Date(1722206000000).toISOString(),
  },
  {
    id: '8',
    title: 'Fix bug in login form',
    memo: 'Issue with form validation on submit',
    isCompleted: true,
    createdAt: new Date(1722207000000).toISOString(),
  },
  {
    id: '9',
    title: 'Plan weekend trip',
    memo: 'Book hotel and check weather',
    isCompleted: false,
    createdAt: new Date(1722208000000).toISOString(),
  },
  {
    id: '10',
    title: 'Read a chapter of a book',
    memo: 'Continue reading Clean Code',
    isCompleted: false,
    createdAt: new Date(1722209000000).toISOString(),
  },
  {
    id: '11',
    title: 'Water plants',
    memo: 'Check balcony and living room plants',
    isCompleted: true,
    createdAt: new Date(1722210000000).toISOString(),
  },
  {
    id: '12',
    title: 'Write blog post',
    memo: 'Topic: Introduction to React Query',
    isCompleted: false,
    createdAt: new Date(1722211000000).toISOString(),
  },
  {
    id: '13',
    title: 'Review pull requests',
    memo: 'Check frontend and backend PRs',
    isCompleted: true,
    createdAt: new Date(1722212000000).toISOString(),
  },
  {
    id: '14',
    title: 'Email teammate',
    memo: 'Follow up on API design',
    isCompleted: false,
    createdAt: new Date(1722213000000).toISOString(),
  },
  {
    id: '15',
    title: 'Cook dinner',
    memo: 'Try a new pasta recipe',
    isCompleted: false,
    createdAt: new Date(1722214000000).toISOString(),
  },
]

export const handlers = [
  http.get(paths.app.todos.path, async ({ request }) => {
    await delay()
    const url = new URL(request.url)
    const searchQuery = url.searchParams.get('query')

    const filteredTodos = searchQuery
      ? todos.filter(todo => todo.title.toLowerCase().includes(searchQuery.toLowerCase()))
      : todos

    const response: ApiResponse<Todo[]> = {
      data: filteredTodos,
      message: 'Fetched successfully',
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
    const updates = (await request.json()) as BaseUpdateTodoPayload
    const index = todos.findIndex(todo => id === todo.id)
    if (index === -1)
      return HttpResponse.json({
        message: 'Todo not found',
        error: 'Invalid ID',
        data: null,
        statusCode: 404,
      })

    todos[index] = { ...todos[index], ...updates }

    return HttpResponse.json({
      data: todos[index],
      message: 'Todo updated successfully',
      statusCode: 200,
    })
  }),

  http.delete(`${paths.app.todos.path}:id`, async ({ params }) => {
    const { id } = params

    const index = todos.findIndex(todo => id === todo.id)
    if (index === -1)
      return HttpResponse.json({
        message: 'Todo not found',
        error: 'Invalid ID',
        data: null,
        statusCode: 404,
      })

    todos = todos.filter(todo => id !== todo.id)

    return HttpResponse.json({
      message: 'Todo deleted successfully',
      data: { id },
      statusCode: 200,
    })
  }),
]
