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

export type ErrorResponse = {
  success: false
  message: string
  errorCode: ErrorCode
  data: null
}

export type SuccessResponse<T> = {
  success: true
  data: T
  message: string
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse
