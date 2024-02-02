import {client} from './api-client'
import {cache} from './cache'

export async function fetchBookSearch(query, token) {
  const eq = encodeURIComponent(query)
  const {books} = await client(`books?query=${eq}`, {token}, `search:${query}`)
  for (const book of books) setQueryDataForBook(book)
  return books
}

async function fetchBook(bookId, token) {
  let {book} = await client(`books/${bookId}`, {token}, `book:${bookId}`)
  return book
}

function setQueryDataForBook(book) {
  cache.set(`book:${book.id}`, {book})
}

export {setQueryDataForBook, fetchBook}
