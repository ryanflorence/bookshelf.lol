import './rating.css'
import * as React from 'react'
import {FaStar} from 'react-icons/fa'
import {ErrorMessage} from 'components/lib'
import {useFetcher} from '@remix-run/react'

// TODO: highlight race conditions in videos
function Rating({listItem}) {
  const fetcher = useFetcher()
  const rating = fetcher.json?.rating ?? listItem.rating
  return (
    <div onClick={e => e.stopPropagation()}>
      <StarRating
        label={rating => `${rating} star${rating !== 1 ? 's' : ''}`}
        value={rating}
        onClick={event => event.stopPropagation()}
        onChange={value => {
          fetcher.submit(
            {intent: 'update', id: listItem.id, rating: value},
            {
              method: 'post',
              action: '/api/list-items',
              encType: 'application/json',
            },
          )
        }}
      />
      {fetcher.state === 'idle' && fetcher.data?.error ? (
        <ErrorMessage
          error={fetcher.data.error}
          variant="inline"
          style={{marginLeft: 6, fontSize: '0.7em'}}
        />
      ) : null}
    </div>
  )
}

function StarRating({label, value, onChange}) {
  const rootId = React.useId()
  const hoveredValue = value
  const [_hoveredValue, setHoveredValue] = React.useState(0)

  return (
    <fieldset
      className="StarRating"
      onChange={event => {
        onChange(Number(event.target.value))
      }}
    >
      {[...Array(5)].map((_, i) => {
        const rating = i + 1
        const id = `${rootId}-${rating}`
        const isRated = (hoveredValue || value) >= rating
        return (
          <React.Fragment key={i}>
            <input
              id={id}
              type="radio"
              name={rootId}
              value={i + 1}
              defaultChecked={value === rating}
              className="visually-hidden"
            />
            <label
              htmlFor={id}
              key={i}
              aria-label={label(rating)}
              onMouseEnter={() => {
                setHoveredValue(rating)
              }}
              onMouseLeave={() => {
                setHoveredValue(0)
              }}
            >
              <FaStar className={isRated ? 'rated' : ''} />
            </label>
          </React.Fragment>
        )
      })}
    </fieldset>
  )
}

export {Rating}
