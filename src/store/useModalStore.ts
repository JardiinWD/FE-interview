import { IProduct } from '@/api/types'
import { create } from 'zustand'

interface IModalStore {
  // --> State
  isProductModalOpen: boolean
  productData: IProduct | null
  // --> Actions
  openProductModal: (productData: IProduct) => void
  closeProductModal: () => void
}

const useModalStore = create<IModalStore>((set) => ({
  // --> Initial state
  isProductModalOpen: false,
  productData: null,
  // --> Actions
  openProductModal: (productData: IProduct) =>
    set({ isProductModalOpen: true, productData }),
  closeProductModal: () => set({ isProductModalOpen: false, productData: null })
}))

export default useModalStore
