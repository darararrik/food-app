import React from 'react'
import { Navigate } from 'react-router'
import { useStore } from '@/store/StoreContext'
import { observer } from 'mobx-react-lite'

export const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
): React.FC<P> => {
  return observer((props: P) => {
    const { userStore: userStore } = useStore()

    if (!userStore.isAuthenticated) {
      return <Navigate to="/" replace />
    }

    return <WrappedComponent {...props} />
  })
}
