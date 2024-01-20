import {Outlet, redirect} from '@remix-run/react'
import * as auth from '../auth-provider'

export default Outlet

export async function clientLoader() {
  const token = await auth.getToken()
  if (!token) {
    return redirect('/login')
  }
  return null
}
