export const ErrorCode = {
  ID_MISSING: 'ID_MISSING',
  TODO_NOT_FOUND: 'TODO_NOT_FOUND',
  TITLE_MISSING: 'TITLE_MISSING',
} as const

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode]