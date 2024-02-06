import bookPlaceholderSvg from 'assets/book-placeholder.svg'
import {client} from './api-client'
import {cache} from './cache'

export async function fetchBookSearch(query, token, signal) {
  const eq = encodeURIComponent(query)
  const {books} = await client(
    `books?query=${eq}`,
    {token, signal},
    `search:${query}`,
  )
  for (const book of books) setQueryDataForBook(book)
  return books
}

async function fetchBook(bookId, token, signal) {
  let {book} = await client(
    `books/${bookId}`,
    {token, signal},
    `book:${bookId}`,
  )
  return book
}

function setQueryDataForBook(book) {
  cache.set(`book:${book.id}`, {book})
}

const loadingBook = {
  title: 'Loading...',
  author: 'loading...',
  coverImageUrl: bookPlaceholderSvg,
  publisher: 'Loading Publishing',
  synopsis: 'Loading...',
}
const loadingBooks = Array.from({length: 10}, (v, index) => ({
  id: `loading-book-${index}`,
  ...loadingBook,
}))

export {setQueryDataForBook, fetchBook, loadingBook, loadingBooks}
