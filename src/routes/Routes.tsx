import { Home, Error as ErrorPage, Cart, Product } from '@/pages'
import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/layout/Layout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        caseSensitive: true,
        element: <Home />,
        errorElement: <ErrorPage />
      },
      {
        path: '/home',
        caseSensitive: true,
        element: <Home />,
        errorElement: <ErrorPage />
      },
      {
        path: '/product/:id',
        caseSensitive: true,
        element: <Product />,
        errorElement: <ErrorPage />
      },
      {
        path: '/cart',
        caseSensitive: true,
        element: <Cart />,
        errorElement: <ErrorPage />
      },
      {
        path: '*',
        caseSensitive: true,
        element: <ErrorPage />,
        errorElement: <ErrorPage />
      }
    ],
    errorElement: <ErrorPage />
  }
])

export default router
