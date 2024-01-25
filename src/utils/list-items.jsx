import {useQuery, useMutation, queryCache} from 'react-query'
import {setQueryDataForBook} from './books'
import {useClient} from 'context/auth-context'
import {client} from './api-client'

function useListItem(bookId, options) {
  const listItems = useListItems(options)
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

// TODO: remove this after individual books aren't causing a fetch to this thing
function useListItems(options = {}) {
  const client = useClient()

  const {data: listItems} = useQuery({
    queryKey: 'list-items',
    queryFn: () => client('list-items').then(data => data.listItems),
    ...options,
    config: {
      ...options.config,
      onSuccess: async listItems => {
        await options.config?.onSuccess?.(listItems)
        for (const listItem of listItems) {
          setQueryDataForBook(listItem.book)
        }
      },
    },
  })
  return listItems ?? []
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

export {
  useListItem,
  useListItems,
  useUpdateListItem,
  useRemoveListItem,
  useCreateListItem,
}
