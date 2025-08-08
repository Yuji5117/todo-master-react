import { delay, http, HttpResponse } from 'msw'
import { v4 as uuid } from 'uuid'

import { paths } from '../config/paths'

import type { ApiResponse } from '../types'
import { ErrorCode } from '../config/errorCodes'
import {
  CreateNewTodoPayloadSchema,
  type IdParam,
  type Todo,
  type UpdateTodoPayload,
} from '../schemas/todo.schema'
import { SearchQuerySchema } from '../schemas/search.schema'

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
    try {
      await delay()
      const url = new URL(request.url)

      const rawQuery = url.searchParams.get('query')

      const validation = SearchQuerySchema.safeParse(rawQuery)

      if (!validation.success) {
        console.error('Invalid search query:', rawQuery, validation.error)

        return HttpResponse.json<ApiResponse<never>>(
          {
            success: false,
            message: '検索クエリが不正です。',
            errorCode: ErrorCode.INVALID_SEARCH_QUERY,
            data: null,
          },
          { status: 400 },
        )
      }

      const searchQuery = validation.data

      const filteredTodos = searchQuery
        ? todos.filter(todo => todo.title.toLowerCase().includes(searchQuery.toLowerCase()))
        : todos

      const response: ApiResponse<Todo[]> = {
        success: true,
        data: filteredTodos,
        message: 'Fetched successfully',
      }
      return HttpResponse.json(response, { status: 200 })
    } catch (error) {
      console.error('[MSW] Unexpected error in GET todos handler:', error)

      const errorResponse: ApiResponse<never> = {
        success: false,
        message: 'Todoの取得中に予期しないエラーが発生しました。',
        errorCode: ErrorCode.INTERNAL_SERVER_ERROR,
        data: null,
      }
      return HttpResponse.json(errorResponse, { status: 500 })
    }
  }),

  http.post(paths.app.todos.path, async ({ request }) => {
    try {
      const rawPayload = await request.json()

      const validation = CreateNewTodoPayloadSchema.safeParse(rawPayload)

      if (!validation.success) {
        console.error('Invalid todo payload:', rawPayload, validation.error)

        return HttpResponse.json<ApiResponse<never>>(
          {
            success: false,
            message: 'Todo作成データが不正です。',
            errorCode: ErrorCode.TITLE_MISSING,
            data: null,
          },
          { status: 400 },
        )
      }

      const newTodo = validation.data
      const todoWithId: Todo = {
        ...newTodo,
        id: uuid(),
        isCompleted: false,
        createdAt: new Date().toISOString(),
      }
      todos.push(todoWithId)

      const response: ApiResponse<Todo> = {
        success: true,
        data: todoWithId,
        message: '新しいTodoを作成しました。',
      }

      return HttpResponse.json<ApiResponse<Todo>>(response, { status: 201 })
    } catch (error) {
      console.error('[MSW] Unexpected error in POST todos handler:', error)

      const errorResponse: ApiResponse<never> = {
        success: false,
        message: 'Todoの作成中に予期しないエラーが発生しました。',
        errorCode: ErrorCode.INTERNAL_SERVER_ERROR,
        data: null,
      }
      return HttpResponse.json(errorResponse, { status: 500 })
    }
  }),

  http.patch(`${paths.app.todos.path}:id`, async ({ request, params }) => {
    const { id } = params

    if (!id) {
      return HttpResponse.json<ApiResponse<Todo>>(
        {
          success: false,
          message: 'IDが不正です。',
          errorCode: ErrorCode.ID_MISSING,
          data: null,
        },
        { status: 400 },
      )
    }

    const updates = (await request.json()) as UpdateTodoPayload
    const index = todos.findIndex(todo => id === todo.id)
    if (index === -1)
      return HttpResponse.json<ApiResponse<Todo>>(
        {
          success: false,
          message: '該当するTodoが存在しません。',
          errorCode: ErrorCode.TODO_NOT_FOUND,
          data: null,
        },
        { status: 404 },
      )

    todos[index] = { ...todos[index], ...updates }

    return HttpResponse.json<ApiResponse<Todo>>(
      {
        success: true,
        data: todos[index],
        message: 'Todo updated successfully',
      },
      { status: 200 },
    )
  }),

  http.delete(`${paths.app.todos.path}:id`, async ({ params }) => {
    const { id } = params

    if (!id) {
      return HttpResponse.json(
        {
          success: false,
          message: '削除対象のIDが指定されていません。',
          errorCode: ErrorCode.ID_MISSING,
        },
        { status: 400 },
      )
    }

    if (typeof id !== 'string') {
      return HttpResponse.json(
        {
          success: false,
          message: 'IDの形式が不正です。',
          errorCode: ErrorCode.ID_MISSING,
        },
        { status: 400 },
      )
    }

    const index = todos.findIndex(todo => id === todo.id)
    if (index === -1)
      return HttpResponse.json(
        {
          success: false,
          message: '該当するTodoが存在しません。',
          errorCode: ErrorCode.TODO_NOT_FOUND,
        },
        { status: 404 },
      )

    todos = todos.filter(todo => id !== todo.id)

    return HttpResponse.json<ApiResponse<IdParam>>(
      {
        success: true,
        message: 'Todo deleted successfully',
        data: { id },
      },
      { status: 200 },
    )
  }),
]
