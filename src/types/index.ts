import type { ErrorCode } from '../config/errorCodes'

export type BaseEntity = {
  id: string
  createdAt: string
}

export type Entity<T> = {
  [K in keyof T]: T[K]
} & BaseEntity

export type User = Entity<{
  firstName: string
  lastName: string
  email: string
}>

export type Todo = Entity<{
  title: string
  memo?: string
  isCompleted: boolean
}>

export type CreateNewTodoPayload = Pick<Todo, 'title' | 'memo'>

export type BaseUpdateTodoPayload = Partial<Pick<Todo, 'title' | 'memo' | 'isCompleted'>>
export type UpdateTodoPayload = Pick<Todo, 'id' | 'title' | 'memo'>
export type UpdateTodoCompletionPayload = Pick<Todo, 'id' | 'isCompleted'>

export type ErrorResponse = {
  success: false
  message: string
  errorCode: ErrorCode
}

export type SuccessResponse<T> = {
  success: true
  data: T
  message: string
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse
