import { paths } from '../config/paths'

import type { ApiResponse, CreateNewTodoPayload, Todo, UpdateTodoCompletionPayload } from '../types'

export const getTodos = async (): Promise<ApiResponse<Todo[]>> => {
  try {
    const response = await fetch(paths.app.todos.path, {
      method: 'GET',
    })

    const decodedData: ApiResponse<Todo[]> = await response.json()

    return decodedData
  } catch (error) {
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

    return decodedData
  } catch (error) {
    console.log('createNewTodo error:', error)
    throw new Error('Failed to create new todo')
  }
}

export const updateTodoCompletion = async (
  payload: UpdateTodoCompletionPayload,
): Promise<ApiResponse<Todo>> => {
  try {
    const { id, isCompleted } = payload
    const response = await fetch(`${paths.app.todos.path}:${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isCompleted }),
    })

    const decodedData: ApiResponse<Todo> = await response.json()

    return decodedData
  } catch (error) {
    console.log('updateTodoCompletio error:', error)
    throw new Error('Failed to update todo completion')
  }
}
