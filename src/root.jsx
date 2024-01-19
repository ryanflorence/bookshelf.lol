import * as React from 'react'
import {Outlet, Scripts, LiveReload} from '@remix-run/react'
import {Profiler} from 'components/profiler'
const App = React.lazy(() => import('./app'))
const AppProviders = React.lazy(() => import('./context'))

export default function Root() {
  return (
    <>
      <Profiler id="App Root" phases={['mount']}>
        <AppProviders>
          <App />
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
      <Outlet />
      <Scripts />
      <LiveReload />
    </>
  )
}
