import { z } from 'zod'

export const SearchQuerySchema = z
  .string()
  .trim()
  .max(100, '検索クエリは100文字以下である必要があります')
  .transform(str => str.replace(/[<>]/g, ''))
  .transform(str => (str === '' ? undefined : str))
  .optional()

export type SearchQuery = z.infer<typeof SearchQuerySchema>
