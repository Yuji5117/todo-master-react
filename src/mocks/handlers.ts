import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/todos', () => {
    return HttpResponse.json([
      { id: '1', title: 'test', memo: 'memo test', isCompleted: false },
      { id: '2', title: 'test2', memo: 'memo test2', isCompleted: true },
    ])
  }),
]
