import { RouterProvider, createBrowserRouter } from 'react-router'
import { routesConfig } from '@/config/route'
import './App.module.scss'

const router = createBrowserRouter(routesConfig)

const App = () => {
  return <RouterProvider router={router} />
}

export default App
