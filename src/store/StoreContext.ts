import { createContext, useContext } from 'react'
import { RootStore } from './rootStore'

export const StoreContext = createContext<RootStore | null>(null)

export const useStore = () => {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must be used within StoreContext.Provider')
  }
  return context
}
