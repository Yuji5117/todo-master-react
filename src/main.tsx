import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './app.css'
import { App } from './App.tsx'

const enableMocking = async () => {
  if (!import.meta.env.DEV) return

  const { worker } = await import('./mocks/browser.ts')

  return worker.start()
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
