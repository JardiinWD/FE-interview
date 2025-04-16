import {
  Home,
  Error as ErrorPage,
  Cart,
  Product,
  Login,
  UserInfo,
  Checkout
} from '@/pages'
import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/layout/Layout'
import ProtectedRoute from '@/routes/ProtectedRoute'

const router = createBrowserRouter([
  {
    path: '/login',
    caseSensitive: true,
    element: <Login />,
    errorElement: <ErrorPage />
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        caseSensitive: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />
      },
      {
        path: '/home',
        caseSensitive: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />
      },
      {
        path: '/product/:id',
        caseSensitive: true,
        element: (
          <ProtectedRoute>
            <Product />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />
      },
      {
        path: '/cart',
        caseSensitive: true,
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />
      },
      {
        path: '/user-info',
        caseSensitive: true,
        element: (
          <ProtectedRoute>
            <UserInfo />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />
      },
      {
        path: '/checkout',
        caseSensitive: true,
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />
      }
    ]
  },
  {
    path: '*',
    caseSensitive: true,
    element: <ErrorPage />,
    errorElement: <ErrorPage />
  }
])

export default router
