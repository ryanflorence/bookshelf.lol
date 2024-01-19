import {RemixServer} from '@remix-run/react'
import {renderToString} from 'react-dom/server'
import {CacheProvider} from '@emotion/react'
import createEmotionServer from '@emotion/server/create-instance'
import createCache from '@emotion/cache'

let html = String.raw

export default function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext,
) {
  const key = 'custom'
  const cache = createCache({key})
  createEmotionServer(cache)
  const {extractCritical} = createEmotionServer(cache)

  let {
    html: body,
    css,
    ids,
  } = extractCritical(
    renderToString(
      <CacheProvider value={cache}>
        <RemixServer context={remixContext} url={request.url} />
      </CacheProvider>,
    ),
  )

  return new Response(
    `<!DOCTYPE html>
      <html>
        <head>
          <title>Bookshelf.lol</title>
          ${`<style data-emotion="${key} ${ids.join(' ')}">
            ${css}
          </style>`}
        </head>
        <body><div id=root>${body}</div></body>
      </html>`,
    {
      headers: {'Content-Type': 'text/html'},
      status: responseStatusCode,
    },
  )
}
