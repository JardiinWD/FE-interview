import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryProvider } from '@/providers'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      Project
    </QueryProvider>
  </StrictMode>,
)
