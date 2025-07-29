import { paths } from '../config/paths'

import type { ApiResponse, Todo } from '../types'

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
