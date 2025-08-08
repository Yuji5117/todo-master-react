import z from 'zod'

export const BaseEntitySchema = z.object({
  id: z.string(),
  createdAt: z.string(),
})

export const TodoSchema = BaseEntitySchema.extend({
  title: z
    .string()
    .min(1, 'タイトルは必須です。')
    .max(100, 'タイトルは100文字以内で入力してください。'),
  memo: z.string().max(155, 'メモは150文字以内で入力してください。').optional(),
  isCompleted: z.boolean(),
})

export type Todo = z.infer<typeof TodoSchema>

export const CreateNewTodoPayloadSchema = TodoSchema.pick({
  title: true,
  memo: true,
})

export type CreateNewTodoPayload = z.infer<typeof CreateNewTodoPayloadSchema>

export const IdParamSchema = z.object({ id: z.string() })

export type IdParam = z.infer<typeof IdParamSchema>

export const UpdateTodoContentPayloadSchema = TodoSchema.pick({
  id: true,
  title: true,
  memo: true,
})

export const UpdateTodoCompletionPayloadSchema = TodoSchema.pick({
  id: true,
  isCompleted: true,
})

export const UpdateTodoPayloadSchema = z.union([
  UpdateTodoContentPayloadSchema,
  UpdateTodoCompletionPayloadSchema,
])

export type UpdateTodoContentPayload = z.infer<typeof UpdateTodoContentPayloadSchema>
export type UpdateTodoCompletionPayload = z.infer<typeof UpdateTodoCompletionPayloadSchema>
export type UpdateTodoPayload = z.infer<typeof UpdateTodoPayloadSchema>
