import type { ErrorCode } from '../config/errorCodes'

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
