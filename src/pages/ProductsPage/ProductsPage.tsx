import { Navigate } from 'react-router'
import { withAuth } from '@/hoc/withAuth'

const ProductsPage = () => {
  return <Navigate to="/" replace />
}

export default withAuth(ProductsPage)
