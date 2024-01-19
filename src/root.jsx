import {Outlet, Scripts, LiveReload} from '@remix-run/react'

export default function App() {
  return (
    <>
      <h1 css={{color: 'green'}}>'sup bro!</h1>
      <Outlet />
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
