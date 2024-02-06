import './book.css'
import * as React from 'react'
import debounceFn from 'debounce-fn'
import {FaRegCalendarAlt} from 'react-icons/fa'
import Tooltip from '@reach/tooltip'
import {Await, defer, useFetcher, useLoaderData} from '@remix-run/react'
import {fetchBook, loadingBook} from 'utils/books'
import {formatDate} from 'utils/misc'
import {fetchListItem} from 'utils/list-items'
import {Textarea, ErrorMessage} from 'components/lib'
import {Rating} from 'components/rating'
import {Profiler} from 'components/profiler'
import {StatusButtons} from 'components/status-buttons'
import * as auth from '../auth-provider'

export async function clientLoader({params, request}) {
  const token = await auth.ensureToken()
  const data = Promise.all([
    fetchBook(params.bookId, token, request.signal),
    fetchListItem(params.bookId, token, request.signal),
  ]).then(([book, listItem]) => ({book, listItem}))
  return defer({data})
}

function BookScreen() {
  const {data} = useLoaderData()
  return (
    <React.Suspense fallback={<Book book={loadingBook} />}>
      <Await resolve={data}>
        {({book, listItem}) => <Book book={book} listItem={listItem} />}
      </Await>
    </React.Suspense>
  )
}

function Book({book, listItem}) {
  const {title, author, coverImageUrl, publisher, synopsis} = book

  return (
    <Profiler
      id="Book Screen"
      metadata={{bookId: book.id, listItemId: listItem?.id}}
    >
      <div>
        <div className="Book">
          <img src={coverImageUrl} alt={`${title} book cover`} />
          <div>
            <div className="header">
              <div className="meta">
                <h1>{title}</h1>
                <div>
                  <i>{author}</i>
                  <span className="separator">|</span>
                  <i>{publisher}</i>
                </div>
              </div>
              <div className="actions">
                <StatusButtons book={book} listItem={listItem} />
              </div>
            </div>
            <div style={{marginTop: 10, minHeight: 46}}>
              {listItem?.finishDate ? <Rating listItem={listItem} /> : null}
              {listItem ? <ListItemTimeframe listItem={listItem} /> : null}
            </div>
            <br />
            <p className="synopsis">{synopsis}</p>
          </div>
        </div>
        {listItem ? <NotesTextarea listItem={listItem} /> : null}
      </div>
    </Profiler>
  )
}

function ListItemTimeframe({listItem}) {
  const timeframeLabel = listItem.finishDate
    ? 'Start and finish date'
    : 'Start date'

  return (
    <Tooltip label={timeframeLabel}>
      <div aria-label={timeframeLabel} style={{marginTop: 6}}>
        <FaRegCalendarAlt style={{marginTop: -2, marginRight: 5}} />
        <span>
          {formatDate(listItem.startDate)}{' '}
          {listItem.finishDate ? `— ${formatDate(listItem.finishDate)}` : null}
        </span>
      </div>
    </Tooltip>
  )
}

function NotesTextarea({listItem}) {
  const fetcher = useFetcher()
  const mutate = data =>
    fetcher.submit(data, {
      method: 'put',
      action: '/api/list-items',
      encType: 'application/json',
    })

  const debouncedMutate = React.useMemo(
    () => debounceFn(mutate, {wait: 300}),
    [mutate],
  )

  function handleNotesChange(e) {
    debouncedMutate({intent: 'update', id: listItem.id, notes: e.target.value})
  }

  return (
    <React.Fragment>
      <div className="Notes">
        <label htmlFor="notes" className="label">
          Notes
        </label>
        {fetcher.state === 'idle' && fetcher.data?.error ? (
          <ErrorMessage
            variant="inline"
            error={fetcher.data.error}
            style={{fontSize: '0.7em'}}
          />
        ) : null}
      </div>
      <Textarea
        id="notes"
        className="NotesTextarea"
        defaultValue={listItem.notes}
        onChange={handleNotesChange}
      />
    </React.Fragment>
  )
}

export default BookScreen
