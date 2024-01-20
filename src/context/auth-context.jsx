import * as React from 'react'
import {useRouteLoaderData} from '@remix-run/react'
import {client} from 'utils/api-client'

function useAuth() {
  const {user} = useRouteLoaderData('root')
  return {user}
}

function useClient() {
  const {user} = useAuth()
  const token = user?.token
  return React.useCallback(
    (endpoint, config) => client(endpoint, {...config, token}),
    [token],
  )
}

export {useAuth, useClient}
