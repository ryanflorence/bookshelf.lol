import * as React from 'react'
import {
  Await,
  Form,
  useAsyncError,
  useLoaderData,
  useNavigation,
} from '@remix-run/react'
import Tooltip from '@reach/tooltip'
import {FaSearch} from 'react-icons/fa'
import * as auth from '../auth-provider'
import * as colors from 'styles/colors'
import {fetchBookSearch, loadingBooks} from 'utils/books'
import {BookRow} from 'components/book-row'
import {BookListUL, Spinner, Input} from 'components/lib'
import {Profiler} from 'components/profiler'

export async function clientLoader({request}) {
  let token = await auth.ensureToken()
  const query = new URL(request.url).searchParams.get('search') || ''
  const books = fetchBookSearch(query, token)
  return {books, query}
}

function DiscoverBooksScreen() {
  const {books, query} = useLoaderData()
  const navigation = useNavigation()
  const isSearching = navigation.formAction?.startsWith('/discover')
  const queried = query != ''

  return (
    <div>
      <div>
        <Form>
          <Input
            placeholder="Search books..."
            id="search"
            type="search"
            name="search"
            css={{width: '100%'}}
          />
          <Tooltip label="Search Books">
            <label htmlFor="search">
              <button
                type="submit"
                css={{
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
      <div>
        {!queried && (
          <div css={{marginTop: 20, fontSize: '1.2em', textAlign: 'center'}}>
            <p>Welcome to the discover page.</p>
            <p>Here, let me load a few books for you...</p>
            <React.Suspense
              fallback={
                <div css={{width: '100%', margin: 'auto'}}>
                  <Spinner />
                </div>
              }
            >
              <Await resolve={books}>
                {books => (
                  <p>
                    {books.length
                      ? 'Here you go! Find more books with the search bar above.'
                      : "Hmmm... I couldn't find any books to suggest for you."}
                  </p>
                )}
              </Await>
            </React.Suspense>
          </div>
        )}
        {isSearching ? (
          <Skeleton />
        ) : (
          <React.Suspense fallback={<Skeleton />}>
            <Await resolve={books} errorElement={<SearchError />}>
              {books =>
                books.length ? (
                  <Profiler
                    id="Discover Books Screen Book List"
                    metadata={{query, bookCount: books.length}}
                  >
                    <BookListUL css={{marginTop: 20}}>
                      {books.map(book => (
                        <li key={book.id} aria-label={book.title}>
                          <BookRow key={book.id} book={book} />
                        </li>
                      ))}
                    </BookListUL>
                  </Profiler>
                ) : queried ? (
                  <div
                    css={{
                      marginTop: 20,
                      fontSize: '1.2em',
                      textAlign: 'center',
                    }}
                  >
                    <p>
                      Hmmm... I couldn't find any books with the query "{query}
                      ." Please try another.
                    </p>
                  </div>
                ) : null
              }
            </Await>
          </React.Suspense>
        )}
      </div>
    </div>
  )
}

function Skeleton() {
  return (
    <BookListUL css={{marginTop: 20}}>
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
    <div css={{color: colors.danger}}>
      <p>There was an error:</p>
      <pre>{error.message}</pre>
    </div>
  )
}

export default DiscoverBooksScreen
