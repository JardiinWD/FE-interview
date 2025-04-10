import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  QueryProvider,
  ErrorBoundaryProvider,
  HelmetProvider,
  ReactRouterProvider
} from '@/providers'
import 'tailwindcss/tailwind.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundaryProvider>
      <QueryProvider>
        <HelmetProvider>
          <ReactRouterProvider />
        </HelmetProvider>
      </QueryProvider>
    </ErrorBoundaryProvider>
  </StrictMode>
)
