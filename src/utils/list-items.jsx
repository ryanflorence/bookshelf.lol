import {useMutation, queryCache} from 'react-query'
import {setQueryDataForBook} from './books'
import {useClient} from 'context/auth-context'
import {client} from './api-client'

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

const defaultMutationOptions = {
  onError: (err, variables, recover) =>
    typeof recover === 'function' ? recover() : null,
  onSettled: () => queryCache.invalidateQueries('list-items'),
}

function onUpdateMutation(newItem) {
  const previousItems = queryCache.getQueryData('list-items')

  queryCache.setQueryData('list-items', old => {
    return old.map(item => {
      return item.id === newItem.id ? {...item, ...newItem} : item
    })
  })

  return () => queryCache.setQueryData('list-items', previousItems)
}

function useUpdateListItem(options) {
  const client = useClient()

  return useMutation(
    updates =>
      client(`list-items/${updates.id}`, {
        method: 'PUT',
        data: updates,
      }),
    {
      onMutate: onUpdateMutation,
      ...defaultMutationOptions,
      ...options,
    },
  )
}

function useRemoveListItem(options) {
  const client = useClient()

  return useMutation(({id}) => client(`list-items/${id}`, {method: 'DELETE'}), {
    onMutate: removedItem => {
      const previousItems = queryCache.getQueryData('list-items')

      queryCache.setQueryData('list-items', old => {
        return old.filter(item => item.id !== removedItem.id)
      })

      return () => queryCache.setQueryData('list-items', previousItems)
    },
    ...defaultMutationOptions,
    ...options,
  })
}

function useCreateListItem(options) {
  const client = useClient()

  return useMutation(({bookId}) => client('list-items', {data: {bookId}}), {
    ...defaultMutationOptions,
    ...options,
  })
}

export {useUpdateListItem, useRemoveListItem, useCreateListItem}
