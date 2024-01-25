import {useListItems} from 'utils/list-items'
import {BookListUL} from './lib'
import {BookRow} from './book-row'
import {Profiler} from './profiler'

function ControlledList({
  listItems,
  filterListItems,
  noListItems,
  noFilteredListItems,
}) {
  const filteredListItems = filterListItems
    ? listItems.filter(filterListItems)
    : listItems

  if (!listItems.length) {
    return <div css={{marginTop: '1em', fontSize: '1.2em'}}>{noListItems}</div>
  }
  if (!filteredListItems.length) {
    return (
      <div css={{marginTop: '1em', fontSize: '1.2em'}}>
        {noFilteredListItems}
      </div>
    )
  }

  return (
    <Profiler
      id="List Item List"
      metadata={{listItemCount: filteredListItems.length}}
    >
      <BookListUL>
        {filteredListItems.map(listItem => (
          <li key={listItem.id} aria-label={listItem.book.title}>
            <BookRow book={listItem.book} />
          </li>
        ))}
      </BookListUL>
    </Profiler>
  )
}

function UncontrolledList(props) {
  const listItems = useListItems()
  return <ControlledList listItems={listItems} {...props} />
}

export {UncontrolledList as ListItemList, ControlledList}
