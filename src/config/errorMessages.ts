import { ErrorCode } from './errorCodes'

export const errorMesages = {
  [ErrorCode.ID_MISSING]: 'Required ID is missing for the operation.',
  [ErrorCode.TODO_NOT_FOUND]: 'The specified todo could not be found.',
  [ErrorCode.TITLE_MISSING]: 'Title is required.',
}
