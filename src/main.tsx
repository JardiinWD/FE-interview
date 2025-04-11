import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/assets/styles/index.scss'
import {
  QueryProvider,
  ErrorBoundaryProvider,
  HelmetProvider,
  ReactRouterProvider,
  ChakraProvider
} from '@/providers'
import 'tailwindcss/tailwind.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundaryProvider>
      <QueryProvider>
        <ChakraProvider>
          <HelmetProvider>
            <ReactRouterProvider />
          </HelmetProvider>
        </ChakraProvider>
      </QueryProvider>
    </ErrorBoundaryProvider>
  </StrictMode>
)
