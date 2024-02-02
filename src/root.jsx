import 'bootstrap/dist/css/bootstrap-reboot.css'
import '@reach/dialog/styles.css'
import '@reach/menu-button/styles.css'
import '@reach/tooltip/styles.css'
import './styles/global.css'
import * as React from 'react'
import {
  Links,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from '@remix-run/react'
import * as auth from './auth-provider'
import {Profiler} from 'components/profiler'
import {client} from 'utils/api-client'
import {FullPageErrorFallback, FullPageSpinner} from 'components/lib'

export async function clientLoader() {
  const token = await auth.getToken()
  if (token) {
    const {listItems, user} = await client('bootstrap', {token}, 'bootstrap')
    return {listItems, user}
  }
  return {listItems: null, user: null}
}

export default function Root() {
  return (
    <>
      <Links />
      <Profiler id="App Root" phases={['mount']}>
        <Outlet />
      </Profiler>
      <Scripts />
      <ScrollRestoration />
    </>
  )
}

export function HydrateFallback() {
  return (
    <>
      <Links />
      <FullPageSpinner />
      <Scripts />
    </>
  )
}

export function ErrorBoundary() {
  let error = useRouteError()
  console.error(error)
  return <FullPageErrorFallback error={error} />
}
