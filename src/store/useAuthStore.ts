import { IAuthData } from '@/api/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  // --> State
  userId: number | null
  token: string | null
  allUserData: IAuthData | null
  // --> Actions
  setUserId: (id: number) => void
  setToken: (token: string) => void
  clearUserId: () => void
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userId: null,
      token: null,
      allUserData: null,
      setToken: (token: string) => set({ token }),
      setUserId: (id: number) => set({ userId: id }),
      clearUserId: () => set({ userId: null, token: null, allUserData: null })
    }),
    {
      name: 'Sikuro Group - FE Technical Interview'
    }
  )
)

export default useAuthStore
