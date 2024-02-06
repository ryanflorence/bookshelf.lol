import {redirect} from '@remix-run/react'
import * as auth from '../auth-provider'
import AuthenticatedApp from '../authenticated-app'

export async function clientLoader() {
  const token = await auth.getToken()
  if (!token) {
    return redirect('/login')
  }
  return null
}

export default AuthenticatedApp
