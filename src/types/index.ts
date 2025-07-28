export type BaseEntity = {
  id: string
  createdAt: number
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
