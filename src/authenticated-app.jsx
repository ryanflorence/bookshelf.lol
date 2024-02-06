import './authenticated-app.css'
import {
  Outlet,
  NavLink as RouterLink,
  useRouteLoaderData,
} from '@remix-run/react'
import {Form} from '@remix-run/react'
import {ErrorBoundary} from 'react-error-boundary'
import {Button, ErrorMessage, FullPageErrorFallback} from './components/lib'

function ErrorFallback({error}) {
  return <ErrorMessage error={error} className="ErrorFallback" />
}

function AuthenticatedApp() {
  const {user} = useRouteLoaderData('root')
  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <div className="Header">
        {user.username}
        <Form method="post" action="/logout">
          <Button type="submit" variant="secondary">
            Logout
          </Button>
        </Form>
      </div>
      <div className="Main">
        <div className="nav">
          <Nav />
        </div>
        <main>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>
    </ErrorBoundary>
  )
}

function NavLink(props) {
  return <RouterLink className="NavLink" {...props} />
}

function Nav() {
  return (
    <nav className="Nav">
      <ul>
        <li>
          <NavLink to="/list">Reading List</NavLink>
        </li>
        <li>
          <NavLink to="/finished">Finished Books</NavLink>
        </li>
        <li>
          <NavLink to="/discover">Discover</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default AuthenticatedApp
