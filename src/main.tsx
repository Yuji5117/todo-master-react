import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './app.css'
import { App } from './App.tsx'
import { Layout } from './components/Layout.tsx'

const enableMocking = async () => {
  if (!import.meta.env.DEV) return

  const { worker } = await import('./mocks/browser.ts')

  return worker.start()
}

const queryClient = new QueryClient()

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <App />
        </Layout>
      </QueryClientProvider>
    </StrictMode>,
  )
})
