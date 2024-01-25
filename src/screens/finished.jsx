import * as React from 'react'
import {Link} from 'components/lib'
import {ListItemList} from 'components/list-item-list'
import * as auth from '../auth-provider'
import {useLoaderData} from '@remix-run/react'
import {fetchListItems} from 'utils/list-items'

export async function clientLoader() {
  const token = await auth.ensureToken()
  return fetchListItems(token)
}

function FinishedScreen() {
  const listItems = useLoaderData()
  return (
    <ListItemList
      listItems={listItems}
      filterListItems={li => Boolean(li.finishDate)}
      noListItems={
        <p>
          Hey there! This is where books will go when you've finished reading
          them. Get started by heading over to{' '}
          <Link to="/discover">the Discover page</Link> to add books to your
          list.
        </p>
      }
      noFilteredListItems={
        <p>
          Looks like you've got some reading to do! Check them out in your{' '}
          <Link to="/list">reading list</Link> or{' '}
          <Link to="/discover">discover more</Link>.
        </p>
      }
    />
  )
}

export default FinishedScreen
