import {redirect} from '@remix-run/react'
import * as auth from '../auth-provider'

export async function clientAction() {
  await auth.logout()
  return redirect('/login')
}

export default function Logout() {
  return null
}
