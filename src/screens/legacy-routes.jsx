import {Routes, Route} from '@remix-run/react'
import {DiscoverBooksScreen} from './discover'
import {NotFoundScreen} from './not-found'

export default function LegacyRoutes() {
  return (
    <Routes>
      <Route path="/discover" element={<DiscoverBooksScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  )
}
