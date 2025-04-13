import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  // --> State
  userId: number | null
  // --> Actions
  setUserId: (id: number) => void
  clearUserId: () => void
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userId: 34, // Default Value
      setUserId: (id: number) => set({ userId: id }),
      clearUserId: () => set({ userId: null })
    }),
    {
      name: 'Sikuro Group - FE Technical Interview'
    }
  )
)

export default useAuthStore
