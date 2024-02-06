import 'bootstrap/dist/css/bootstrap-reboot.css'
import '@reach/dialog/styles.css'
import '@reach/menu-button/styles.css'
import '@reach/tooltip/styles.css'
import './styles/global.css'
import * as React from 'react'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from '@remix-run/react'
import * as auth from './auth-provider'
import {Profiler} from 'components/profiler'
import {client} from 'utils/api-client'
import {FullPageErrorFallback, FullPageSpinner} from 'components/lib'

export async function clientLoader({request}) {
  const token = await auth.getToken()
  if (token) {
    const {listItems, user} = await client(
      'bootstrap',
      {signal: request.signal, token},
      'bootstrap',
    )
    return {listItems, user}
  }
  return {listItems: null, user: null}
}

function Layout({children}) {
  return (
    <html>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <div id="root">{children}</div>
        <Scripts />
      </body>
    </html>
  )
}

export default function Root() {
  return (
    <Layout>
      <Profiler id="App Root" phases={['mount']}>
        <Outlet />
      </Profiler>
      <ScrollRestoration />
    </Layout>
  )
}

export function HydrateFallback() {
  return (
    <Layout>
      <FullPageSpinner />
    </Layout>
  )
}

export function ErrorBoundary() {
  let error = useRouteError()
  console.error(error)
  return <FullPageErrorFallback error={error} />
}
