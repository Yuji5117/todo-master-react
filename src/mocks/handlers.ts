import { http, HttpResponse } from 'msw'

import type { Todo } from '../types'

export const handlers = [
  http.get('/api/todos', () => {
    const Todos: Todo[] = [
      {
        id: '1',
        title: 'Buy groceries',
        memo: 'Milk, eggs, bread, and orange juice',
        isCompleted: false,
        createdAt: 1722200000000,
      },
      {
        id: '2',
        title: 'Send project update',
        memo: 'Email the client about the current status and upcoming tasks',
        isCompleted: true,
        createdAt: 1722201000000,
      },
      {
        id: '3',
        title: 'Workout',
        memo: '1 hour at the gym: cardio and legs',
        isCompleted: false,
        createdAt: 1722202000000,
      },
      {
        id: '4',
        title: 'Call mom',
        memo: 'Check in and ask about weekend plans',
        isCompleted: true,
        createdAt: 1722203000000,
      },
      {
        id: '5',
        title: 'Prepare meeting slides',
        memo: 'Include Q2 results and marketing roadmap',
        isCompleted: false,
        createdAt: 1722204000000,
      },
      {
        id: '6',
        title: 'Read new article on AI trends',
        memo: 'The Verge just posted an interesting analysis on GPT-5',
        isCompleted: false,
        createdAt: 1722205000000,
      },
    ]
    return HttpResponse.json(Todos)
  }),
]
