import { RouterProvider } from 'react-router-dom'
import router from '@/routes/Routes'

/**
 * @description ReactRouterProvider wraps its children with a RouterProvider to provide routing functionality.
 */
export const ReactRouterProvider = () => {
  return <RouterProvider router={router} />
}
