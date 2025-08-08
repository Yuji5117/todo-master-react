import { paths } from '../config/paths'
import type {
  CreateNewTodoPayload,
  IdParam,
  Todo,
  UpdateTodoCompletionPayload,
  UpdateTodoContentPayload,
} from '../schemas/todo.schema'

import type { ApiResponse } from '../types'

export const getTodos = async (query: string): Promise<ApiResponse<Todo[]>> => {
  try {
    const response = await fetch(`${paths.app.todos.path}?query=${encodeURIComponent(query)}`, {
      method: 'GET',
    })
    const decodedData: ApiResponse<Todo[]> = await response.json()

    if (!response.ok || !decodedData.success) {
      throw new Error(decodedData.message)
    }

    return decodedData
  } catch (error) {
    if (error instanceof Error) {
      console.error('getTodos error:', error)
      throw error
    }
    console.log('getTodos error:', error)
    throw new Error('Failed to fetch todos')
  }
}

export const createNewTodo = async (newTodo: CreateNewTodoPayload): Promise<ApiResponse<Todo>> => {
  try {
    const response = await fetch(paths.app.todos.path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    })

    const decodedData: ApiResponse<Todo> = await response.json()

    if (!response.ok) {
      throw new Error(decodedData.message)
    }

    return decodedData
  } catch (error) {
    if (error instanceof Error) {
      console.error('createNewTodo error:', error)
      throw error
    }
    console.log('createNewTodo error:', error)
    throw new Error('Failed to create new todo')
  }
}

export const updateTodo = async (payload: UpdateTodoContentPayload): Promise<ApiResponse<Todo>> => {
  try {
    const { id, title, memo } = payload
    const response = await fetch(`${paths.app.todos.path}${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, memo }),
    })

    const decodedData: ApiResponse<Todo> = await response.json()

    if (!response.ok || !decodedData.success) {
      throw new Error(decodedData.message)
    }

    return decodedData
  } catch (error) {
    if (error instanceof Error) {
      console.error('updateTodo error:', error)
      throw error
    }
    console.log('updateTodo error:', error)
    throw new Error('Failed to update todo')
  }
}

export const updateTodoCompletion = async (
  payload: UpdateTodoCompletionPayload,
): Promise<ApiResponse<Todo>> => {
  try {
    const { id, isCompleted } = payload
    const response = await fetch(`${paths.app.todos.path}${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isCompleted }),
    })

    const decodedData: ApiResponse<Todo> = await response.json()

    return decodedData
  } catch (error) {
    console.log('updateTodoCompletion error:', error)
    throw new Error('Failed to update todo completion')
  }
}

export const deleteTodo = async (id: string): Promise<ApiResponse<IdParam>> => {
  try {
    const response = await fetch(`${paths.app.todos.path}${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const decodedData: ApiResponse<IdParam> = await response.json()

    if (!response.ok || !decodedData.success) {
      throw new Error(decodedData.message)
    }

    return decodedData
  } catch (error) {
    if (error instanceof Error) {
      console.error('updateTodo error:', error)
      throw error
    }
    console.log('deleteTodo error:', error)
    throw new Error('Failed to delete todo')
  }
}
