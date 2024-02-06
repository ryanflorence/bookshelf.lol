import {setQueryDataForBook} from './books'
import {client} from './api-client'
import {ensureToken} from 'auth-provider'
import {cache} from './cache'

export async function clientAction({request}) {
  let signal = request.signal
  let token = await ensureToken()
  let {intent, ...data} = await request.json()
  cache.remove('list-items')

  switch (intent) {
    case 'add': {
      return client('list-items', {signal, token, data: {bookId: data.bookId}})
    }
    case 'update': {
      const path = `list-items/${data.id}`
      cache.remove(path)
      return client(path, {signal, token, method: 'PUT', data})
    }
    case 'remove': {
      const path = `list-items/${data.id}`
      cache.remove(path)
      return client(path, {signal, token, method: 'DELETE'})
    }
    default: {
      throw new Error(`unknown intent: ${intent}`)
    }
  }
}

export async function fetchListItem(bookId, token, signal) {
  const listItems = await fetchListItems(token, signal)
  return listItems?.find(li => li.bookId === bookId) ?? null
}

export async function fetchListItems(token, signal) {
  let {listItems} = await client('list-items', {token, signal}, 'list-items')
  for (const listItem of listItems) setQueryDataForBook(listItem.book)
  return listItems
}
