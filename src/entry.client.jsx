import {RemixBrowser} from '@remix-run/react'
import {startTransition, StrictMode} from 'react'
import {hydrateRoot} from 'react-dom/client'
import createCache from '@emotion/cache'
import {CacheProvider} from '@emotion/react'

let cache = createCache({key: 'custom'})

startTransition(() => {
  hydrateRoot(
    root,
    <StrictMode>
      <CacheProvider value={cache}>
        <RemixBrowser />
      </CacheProvider>
    </StrictMode>,
  )
})
