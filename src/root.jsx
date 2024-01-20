import * as React from 'react'
import {Outlet, Scripts, LiveReload} from '@remix-run/react'
import * as auth from './auth-provider'
import {Profiler} from 'components/profiler'
import {client} from 'utils/api-client'
const AppProviders = React.lazy(() => import('./context'))

// TODO: add FullPageErrorFallback/FullPageSpinner for error boundary/hydration
// fallback after working out the weirdness with styled.button and friends

export async function clientLoader() {
  const token = await auth.getToken()
  if (token) {
    const {listItems, user} = await client('bootstrap', {token})
    return {listItems, user}
  }
  return {listItems: null, user: null}
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

export function HydrateFallback() {
  return (
    <>
      <Scripts />
      <LiveReload />
    </>
  )
}
