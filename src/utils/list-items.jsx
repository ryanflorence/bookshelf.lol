import {setQueryDataForBook} from './books'
import {client} from './api-client'
import {ensureToken} from 'auth-provider'
import {cache} from './cache'

export async function clientAction({request}) {
  let token = await ensureToken()
  let {intent, ...data} = await request.json()
  cache.remove('list-items')

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
  let {listItems} = await client('list-items', {token}, 'list-items')
  for (const listItem of listItems) setQueryDataForBook(listItem.book)
  return listItems
}
