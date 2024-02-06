import * as auth from 'auth-provider'
import {cache} from './cache'
const apiURL = import.meta.env.VITE_API_URL

async function client(
  endpoint,
  {signal, data, token, headers: customHeaders, ...customConfig} = {},
  cacheKey,
) {
  if (cacheKey) {
    const data = cache.get(cacheKey)
    if (data) return data
  }

  const config = {
    signal,
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      'Content-Type': data ? 'application/json' : undefined,
      ...customHeaders,
    },
    ...customConfig,
  }

  console.log(signal)
  return window.fetch(`${apiURL}/${endpoint}`, config).then(async response => {
    if (response.status === 401) {
      cache.clear()
      await auth.logout()
      // refresh the page for them
      // window.location.assign(window.location)
      return Promise.reject({message: 'Please re-authenticate.'})
    }
    const data = await response.json()
    if (response.ok) {
      if (cacheKey && config.method.toLowerCase() === 'get')
        cache.set(cacheKey, data)
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export {client}
