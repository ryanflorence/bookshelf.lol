import {queryCache} from 'react-query'
import {setQueryDataForBook} from './books'
import {client} from './api-client'
import {ensureToken} from 'auth-provider'

export async function clientAction({request}) {
  let token = await ensureToken()
  let {intent, ...data} = await request.json()
  queryCache.removeQueries('list-items')

  switch (intent) {
    case 'add': {
      return client('list-items', {token, data: {bookId: data.bookId}})
    }
    case 'update': {
      return client(`list-items/${data.id}`, {
        token,
        method: 'PUT',
        data,
      })
    }
    case 'remove': {
      return client(`list-items/${data.id}`, {token, method: 'DELETE'})
    }
    default: {
      throw new Error(`unknown intent: ${intent}`)
    }
  }
}

export async function fetchListItem(bookId, token) {
  const listItems = await fetchListItems(token)
  return listItems?.find(li => li.bookId === bookId) ?? null
}

export async function fetchListItems(token) {
  const cached = queryCache.getQueryData('list-items')
  if (cached) return cached
  return queryCache.fetchQuery({
    queryKey: 'list-items',
    queryFn: () => client('list-items', {token}).then(data => data.listItems),
    config: {
      onSuccess: async listItems => {
        for (const listItem of listItems) {
          setQueryDataForBook(listItem.book)
        }
      },
    },
  })
}
