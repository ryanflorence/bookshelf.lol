import {Outlet, Scripts, LiveReload} from '@remix-run/react'

export default function App() {
  return (
    <>
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
