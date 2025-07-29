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

export type CreateNewTodo = Omit<Todo, 'id'>

export type ApiResponse<T> = {
  data: T
  message: string
  error?: string | null
  statusCode: number
}
