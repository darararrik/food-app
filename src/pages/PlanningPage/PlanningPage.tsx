import { Navigate } from 'react-router'
import { withAuth } from '@/hoc/withAuth'

const PlanningPage = () => {
  return <Navigate to="/" replace />
}

export default withAuth(PlanningPage)
