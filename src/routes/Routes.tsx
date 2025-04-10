import { Home, Error as ErrorPage, Cart } from '@/pages';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/layout/Layout';

const router = createBrowserRouter([
    {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        caseSensitive: true,
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/cart',
        caseSensitive: true,
        element: <Cart />,
        errorElement: <ErrorPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
])

export default router;