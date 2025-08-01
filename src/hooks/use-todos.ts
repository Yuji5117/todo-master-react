import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query'

import { createNewTodo, deleteTodo, updateTodo } from '../api/todos'

import type { ApiResponse, CreateNewTodoPayload, Todo, UpdateTodoPayload } from '../types'

type UseCreateTodoReturnType = UseMutationResult<
  ApiResponse<Todo>,
  Error,
  CreateNewTodoPayload,
  unknown
>

export const UseCreateTodo = (onClose: () => void): UseCreateTodoReturnType => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createNewTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      onClose()
    },
  })
}

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

type UseDeleteTodoReturnType = UseMutationResult<ApiResponse<string>, Error, string, unknown>

export const useDeleteTodo = (): UseDeleteTodoReturnType => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
