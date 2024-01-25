import {Routes, Route} from '@remix-run/react'
import {BookScreen} from './book'
import {DiscoverBooksScreen} from './discover'
import {FinishedScreen} from './finished'
import {NotFoundScreen} from './not-found'

export default function LegacyRoutes() {
  return (
    <Routes>
      <Route path="/finished" element={<FinishedScreen />} />
      <Route path="/discover" element={<DiscoverBooksScreen />} />
      <Route path="/book/:bookId" element={<BookScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  )
}
