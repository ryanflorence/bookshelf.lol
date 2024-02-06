import './book-row.css'
import {Link} from '@remix-run/react'
import {StatusButtons} from './status-buttons'
import {Rating} from './rating'

function BookRow({book, listItem}) {
  const {title, author, coverImageUrl} = book

  const id = `book-row-book-${book.id}`

  return (
    <div className="BookRow">
      <Link aria-labelledby={id} to={`/book/${book.id}`} className="link">
        <div className="image">
          <img src={coverImageUrl} alt={`${title} book cover`} />
        </div>
        <div className="content">
          <div className="header">
            <div className="title">
              <h2 id={id}>{title}</h2>
              {listItem?.finishDate ? <Rating listItem={listItem} /> : null}
            </div>
            <div className="book-info">
              <div className="author">{author}</div>
              <small>{book.publisher}</small>
            </div>
          </div>
          <small className="synopsis">
            {book.synopsis.substring(0, 500)}...
          </small>
        </div>
      </Link>
      <div className="actions">
        <StatusButtons book={book} listItem={listItem} />
      </div>
    </div>
  )
}

export {BookRow}
