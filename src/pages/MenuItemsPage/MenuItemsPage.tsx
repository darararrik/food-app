import { Navigate } from 'react-router'
import { withAuth } from '@/shared/hoc/withAuth'

const MenuItemsPage = () => {
  return <Navigate to="/" replace />
}

export default withAuth(MenuItemsPage)
