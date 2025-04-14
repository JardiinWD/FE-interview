import { z } from 'zod'

// -------------
// ------------- LOGIN FORM
// -------------

// --> Login Schema Definition
export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required!'),
  password: z.string().min(6, 'Password is required!')
})

// --> Login Form Values Type
export type TLoginFormValues = z.infer<typeof loginSchema>
