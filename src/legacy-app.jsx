import * as React from 'react'
const App = React.lazy(() => import('./app'))

export default function Catchall() {
  return <App />
}
