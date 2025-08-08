export const ErrorCode = {
  ID_MISSING: 'ID_MISSING',
  TODO_NOT_FOUND: 'TODO_NOT_FOUND',
  TITLE_MISSING: 'TITLE_MISSING',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
} as const

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode]