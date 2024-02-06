import {login, register} from '../auth-provider'
import {redirect} from '@remix-run/react'

import UnauthenticatedApp from '../unauthenticated-app'

export async function clientAction({request}) {
  let formData = await request.formData()
  let {username, password, intent} = Object.fromEntries(formData)
  let fn = intent === 'login' ? login : register
  try {
    await fn({username, password})
    return redirect('/list')
  } catch (error) {
    return {error}
  }
}

export default function Login() {
  return <UnauthenticatedApp />
}
