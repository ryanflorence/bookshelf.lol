import {queryCache} from 'react-query'
import bookPlaceholderSvg from 'assets/book-placeholder.svg'
import {client} from './api-client'

// TODO: implement this on book page
const loadingBook = {
  title: 'Loading...',
  author: 'loading...',
  coverImageUrl: bookPlaceholderSvg,
  publisher: 'Loading Publishing',
  synopsis: 'Loading...',
  loadingBook: true,
}

const loadingBooks = Array.from({length: 10}, (v, index) => ({
  id: `loading-book-${index}`,
  ...loadingBook,
}))

const bookQueryConfig = {
  staleTime: 1000 * 60 * 60,
  cacheTime: 1000 * 60 * 60,
}

export async function fetchBookSearch(query, token) {
  return queryCache.fetchQuery({
    queryKey: ['bookSearch', {query}],
    queryFn: () => {
      return client(`books?query=${encodeURIComponent(query)}`, {token}).then(
        data => data.books,
      )
    },
    config: {
      onSuccess(books) {
        for (const book of books) {
          queryCache.setQueryData(
            ['book', {bookId: book.id}],
            book,
            bookQueryConfig,
          )
        }
      },
    },
  })
}

async function fetchBook(bookId, token) {
  return queryCache.fetchQuery({
    queryKey: ['book', {bookId}],
    queryFn: () => client(`books/${bookId}`).then(data => data.book),
    ...bookQueryConfig,
  })
}

function setQueryDataForBook(book) {
  queryCache.setQueryData(['book', {bookId: book.id}], book, bookQueryConfig)
}

export {setQueryDataForBook, fetchBook, loadingBooks}
