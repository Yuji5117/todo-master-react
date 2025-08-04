import type { ErrorCode } from '../config/errorCodes'
import type { ErrorResponse } from '../types'

export class ApiError extends Error {
  public readonly statusCode: number
  public readonly errorCode: ErrorCode
  constructor(response: ErrorResponse & { statusCode: number }) {
    super(response.message)
    this.name = 'ApiError'
    this.statusCode = response.statusCode
    this.errorCode = response.errorCode
  }
}

export const badRequest = (message: string, errorCode: ErrorCode): never => {
  throw new ApiError({ message, statusCode: 400, errorCode })
}

export const notFound = (message: string, errorCode: ErrorCode): never => {
  throw new ApiError({ message, statusCode: 404, errorCode })
}
export const internalError = (message: string, errorCode: ErrorCode): never => {
  throw new ApiError({ message, statusCode: 500, errorCode })
}
