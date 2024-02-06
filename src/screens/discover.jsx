import * as React from 'react'
import {
  defer,
  Await,
  Form,
  useAsyncError,
  useLoaderData,
  useNavigation,
} from '@remix-run/react'
import Tooltip from '@reach/tooltip'
import {FaSearch} from 'react-icons/fa'
import * as auth from '../auth-provider'
import {fetchBookSearch, loadingBooks} from 'utils/books'
import {BookRow} from 'components/book-row'
import {BookListUL, Spinner, Input} from 'components/lib'
import {Profiler} from 'components/profiler'
import {fetchListItems} from 'utils/list-items'

export async function clientLoader({request}) {
  let token = await auth.ensureToken()
  const query = new URL(request.url).searchParams.get('search') || ''
  const data = Promise.all([
    fetchBookSearch(query, token),
    fetchListItems(token).then(
      items => new Map([...items.map(item => [item.book.id, item])]),
    ),
  ]).then(([books, listItems]) => ({books, listItems}))
  return defer({data, query})
}

function DiscoverBooksScreen() {
  const {data, query} = useLoaderData()
  const navigation = useNavigation()
  const isSearching = navigation.formAction?.startsWith('/discover')

  return (
    <div>
      <div>
        <Form>
          <Input
            placeholder="Search books..."
            id="search"
            type="search"
            name="search"
            style={{width: '100%'}}
          />
          <Tooltip label="Search Books">
            <label htmlFor="search">
              <button
                type="submit"
                style={{
                  border: '0',
                  position: 'relative',
                  marginLeft: '-35px',
                  background: 'transparent',
                }}
              >
                {isSearching ? <Spinner /> : <FaSearch aria-label="search" />}
              </button>
            </label>
          </Tooltip>
        </Form>
      </div>
      <div style={{opacity: isSearching ? 0.25 : 1}}>
        {query === '' && (
          <div
            style={{
              marginTop: 20,
              fontSize: '1.2em',
              textAlign: 'center',
            }}
          >
            <p>Welcome to the discover page.</p>
            <p>Find more books with the search bar above.</p>
          </div>
        )}

        <React.Suspense fallback={<Skeleton />}>
          <Await resolve={data} errorElement={<SearchError />}>
            {({books, listItems}) =>
              books.length ? (
                <Profiler
                  id="Discover Books Screen Book List"
                  metadata={{query, bookCount: books.length}}
                >
                  <BookListUL style={{marginTop: 20}}>
                    {books.map(book => (
                      <li key={book.id} aria-label={book.title}>
                        <BookRow
                          key={book.id}
                          book={book}
                          listItem={listItems.get(book.id)}
                        />
                      </li>
                    ))}
                  </BookListUL>
                </Profiler>
              ) : (
                <div
                  style={{
                    marginTop: 20,
                    fontSize: '1.2em',
                    textAlign: 'center',
                  }}
                >
                  <p>
                    Hmmm... I couldn't find any books with the query "{query}
                    ". Please try another.
                  </p>
                </div>
              )
            }
          </Await>
        </React.Suspense>
      </div>
    </div>
  )
}

function Skeleton() {
  return (
    <BookListUL style={{marginTop: 20}}>
      {loadingBooks.map(book => (
        <li key={book.id} aria-label={book.title}>
          <BookRow key={book.id} book={book} />
        </li>
      ))}
    </BookListUL>
  )
}

function SearchError() {
  const error = useAsyncError()
  return (
    <div className="text-danger">
      <p>There was an error:</p>
      <pre>{error.message}</pre>
    </div>
  )
}

export default DiscoverBooksScreen
