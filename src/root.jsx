import * as React from 'react'
import {Outlet, Scripts, LiveReload, useRouteError} from '@remix-run/react'
import * as auth from './auth-provider'
import {Profiler} from 'components/profiler'
import {client} from 'utils/api-client'
import AppProviders from './context'
import {FullPageErrorFallback, FullPageSpinner} from 'components/lib'

export async function clientLoader() {
  const token = await auth.getToken()
  if (token) {
    const {listItems, user} = await client('bootstrap', {token})
    return {listItems, user}
  }
  return {listItems: null, user: null}
}

export function HydrateFallback() {
  return (
    <>
      <FullPageSpinner />
      <Scripts />
      <LiveReload />
    </>
  )
}

export default function Root() {
  return (
    <>
      <Profiler id="App Root" phases={['mount']}>
        <AppProviders>
          <Outlet />
        </AppProviders>
      </Profiler>
      <Scripts />
      <LiveReload />
    </>
  )
}

export function ErrorBoundary() {
  let error = useRouteError()
  console.error(error)
  return <FullPageErrorFallback error={error} />
}
