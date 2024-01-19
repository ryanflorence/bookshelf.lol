import {RemixServer} from '@remix-run/react'
import {renderToString} from 'react-dom/server'

export default function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext,
) {
  let body = renderToString(
    <RemixServer context={remixContext} url={request.url} />,
  )

  return new Response(
    `<!DOCTYPE html>
      <html>
        <head>
          <title>Bookshelf.lol</title>
        </head>
        <body><div id=root>${body}</div></body>
      </html>`,
    {
      headers: {'Content-Type': 'text/html'},
      status: responseStatusCode,
    },
  )
}
