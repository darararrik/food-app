import React from 'react'
import { Navigate } from 'react-router'

export const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
): React.FC<P> => {
  return (props: P) => {
    const token = localStorage.getItem('jwt')

    if (!token) {
      return <Navigate to="/" replace />
    }

    return <WrappedComponent {...props} />
  }
}
