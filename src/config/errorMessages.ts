import { ErrorCode } from './errorCodes'

export const errorMesages = {
  [ErrorCode.TODO_NOT_FOUND]: '該当するTodoが存在しません。',
  [ErrorCode.INTERNAL_SERVER_ERROR]: '予期しないエラーが発生しました。',
  [ErrorCode.INVALID_SEARCH_QUERY]: 'The search query format is invalid.',
}
