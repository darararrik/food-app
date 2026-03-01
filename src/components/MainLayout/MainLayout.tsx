import { Outlet } from 'react-router'
import Header from '@/components/Header'
import '@/shared/styles/global.scss'

const MainLayout = () => (
  <div>
    <Header />
    <main>
      <Outlet />
    </main>
  </div>
)

export default MainLayout
