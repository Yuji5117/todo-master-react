export const SuccessCode = {
  TODOS_FETCHED: 'TODOS_FETCHED',
  TODO_CREATED: 'TODO_CREATED',
  TODO_UPDATED: 'TODO_UPDATED',
  TODO_DELETED: 'TODO_DELETED',
} as const

export const successMessages = {
  [SuccessCode.TODOS_FETCHED]: 'Todoを取得しました。',
  [SuccessCode.TODO_CREATED]: '新しいTodoを作成しました。',
  [SuccessCode.TODO_UPDATED]: 'Todoを更新しました。',
  [SuccessCode.TODO_DELETED]: 'Todoを削除しました。',
}
