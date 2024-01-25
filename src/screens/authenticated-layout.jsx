import * as React from 'react'
import * as auth from '../auth-provider'

const AuthenticatedApp = React.lazy(() => import('../authenticated-app'))

export async function clientLoader() {
  const token = await auth.getToken()
  if (!token) {
    return redirect('/login')
  }
  return null
}

export default function AuthLayout() {
  return <AuthenticatedApp />
}
