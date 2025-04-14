import { IProduct } from '@/api/types'
import { create } from 'zustand'

interface IModalStore {
  // --> State
  isModalOpen: boolean
  productData: IProduct | null
  // --> Actions
  openModal: () => void
  closeModal: () => void
}

const useModalStore = create<IModalStore>((set) => ({
  // --> Initial state
  isModalOpen: false,
  productData: null,
  // --> Actions
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false, productData: null })
}))

export default useModalStore
