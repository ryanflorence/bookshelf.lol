import * as React from 'react'
const AuthenticatedApp = React.lazy(() => import('../authenticated-app'))

export default function AuthLayout() {
  return <AuthenticatedApp />
}
