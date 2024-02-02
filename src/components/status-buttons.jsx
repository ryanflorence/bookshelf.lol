import * as React from 'react'
import {
  FaCheckCircle,
  FaPlusCircle,
  FaMinusCircle,
  FaBook,
  FaTimesCircle,
} from 'react-icons/fa/index.js'
import Tooltip from '@reach/tooltip'
import * as colors from 'styles/colors'
import {CircleButton, Spinner} from './lib'
import {useFetcher} from '@remix-run/react'

function TooltipButton({data, label, highlight, onClick, icon, ...rest}) {
  const fetcher = useFetcher()
  const isLoading = fetcher.state !== 'idle'
  const error = fetcher.data?.error
  const isError = Boolean(fetcher.state === 'idle' && error)

  return (
    <Tooltip label={isError ? error.message : label}>
      <CircleButton
        css={{
          backgroundColor: 'white',
          ':hover,:focus': {
            color: isLoading
              ? colors.gray80
              : isError
              ? colors.danger
              : highlight,
          },
        }}
        disabled={isLoading}
        onClick={() => {
          fetcher.submit(data(), {
            method: 'post',
            action: '/api/list-items',
            encType: 'application/json',
          })
        }}
        aria-label={isError ? error.message : label}
        {...rest}
      >
        {isLoading ? <Spinner /> : isError ? <FaTimesCircle /> : icon}
      </CircleButton>
    </Tooltip>
  )
}

function StatusButtons({book, listItem}) {
  return (
    <React.Fragment>
      {listItem ? (
        Boolean(listItem.finishDate) ? (
          <TooltipButton
            label="Mark as unread"
            highlight={colors.yellow}
            data={() => ({
              intent: 'update',
              id: listItem.id,
              finishDate: null,
            })}
            icon={<FaBook />}
          />
        ) : (
          <TooltipButton
            label="Mark as read"
            highlight={colors.green}
            data={() => ({
              intent: 'update',
              id: listItem.id,
              finishDate: Date.now(),
            })}
            icon={<FaCheckCircle />}
          />
        )
      ) : null}
      {listItem ? (
        <TooltipButton
          label="Remove from list"
          highlight={colors.danger}
          data={() => ({intent: 'remove', id: listItem.id})}
          icon={<FaMinusCircle />}
        />
      ) : (
        <TooltipButton
          label="Add to list"
          highlight={colors.indigo}
          data={() => ({bookId: book.id, intent: 'add'})}
          icon={<FaPlusCircle />}
        />
      )}
    </React.Fragment>
  )
}

export {StatusButtons}
