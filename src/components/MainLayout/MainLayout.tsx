import { useEffect } from 'react'
import { Outlet } from 'react-router'
import { observer } from 'mobx-react-lite'
import Header from '@/components/Header'
import { useStore } from '@/store/StoreContext'
import '@/shared/styles/global.scss'

const MainLayout = observer(() => {
  const { favoriteStore, userStore } = useStore()

  useEffect(() => {
    if (userStore.isAuthenticated) {
      favoriteStore.fetchFavorites()
    }
  }, [userStore.isAuthenticated])

  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
})

export default MainLayout
