import * as React from 'react'
import {Link} from 'components/lib'
import {ControlledList} from 'components/list-item-list'
import * as auth from '../auth-provider'
import {useLoaderData} from '@remix-run/react'
import {fetchListItems} from 'utils/list-items'

export async function clientLoader() {
  let token = await auth.ensureToken()
  return fetchListItems(token)
}

function ReadingListScreen() {
  let listItems = useLoaderData()
  return (
    <ControlledList
      listItems={listItems}
      noListItems={
        <p>
          Hey there! Welcome to your bookshelf reading list. Get started by
          heading over to <Link to="/discover">the Discover page</Link> to add
          books to your list.
        </p>
      }
      noFilteredListItems={
        <p>
          Looks like you've finished all your books! Check them out in your{' '}
          <Link to="/finished">finished books</Link> or{' '}
          <Link to="/discover">discover more</Link>.
        </p>
      }
    />
  )
}

export default ReadingListScreen
