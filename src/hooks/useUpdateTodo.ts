import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query'

import { updateTodo } from '../api/todos'

import type { ApiResponse, Todo, UpdateTodoPayload } from '../types'

type UseUpdateTodoReturnType = UseMutationResult<
  ApiResponse<Todo>,
  Error,
  UpdateTodoPayload,
  unknown
>

export const useUpdateTodo = (onClose: () => void): UseUpdateTodoReturnType => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      onClose()
    },
  })
}
