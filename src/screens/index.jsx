import {redirect} from '@remix-run/react'
import * as auth from '../auth-provider'

export async function clientLoader() {
  const token = await auth.getToken()
  return redirect(token ? '/list' : '/login')
}

export default function Index() {
  return null
}
