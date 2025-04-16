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
import { ToastContainer } from 'react-toastify'
import { useAuthStore } from '@/store'

// ------------------ CYPRESS UTILITY
if (typeof window !== 'undefined') {
  window.useAuthStore = useAuthStore
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundaryProvider>
      <QueryProvider>
        <ChakraProvider>
          <HelmetProvider>
            <ReactRouterProvider />
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </HelmetProvider>
        </ChakraProvider>
      </QueryProvider>
    </ErrorBoundaryProvider>
  </StrictMode>
)
