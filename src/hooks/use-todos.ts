import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query'

import { createNewTodo, deleteTodo, updateTodo, updateTodoCompletion } from '../api/todos'

import type {
  ApiResponse,
  CreateNewTodoPayload,
  Todo,
  UpdateTodoCompletionPayload,
  UpdateTodoPayload,
} from '../types'
import { toast } from '../lib/toast'

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
      toast.success('Todo created successfully')
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

type UseUpdateTodoCompletionReturnType = UseMutationResult<
  ApiResponse<Todo>,
  Error,
  UpdateTodoCompletionPayload,
  unknown
>

export const useUpdateTodoCompletion = (): UseUpdateTodoCompletionReturnType => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateTodoCompletion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
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
