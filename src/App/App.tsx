import { useMemo } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router'
import { routesConfig } from '@/config/route'
import { StoreContext } from '@/store/StoreContext'
import { RootStore } from '@/store/RootStore'
import './App.module.scss'

const router = createBrowserRouter(routesConfig)

const App = () => {
  const rootStore = useMemo(() => new RootStore(), [])

  return (
    <StoreContext.Provider value={rootStore}>
      <RouterProvider router={router} />
    </StoreContext.Provider>
  )
}

export default App
