import {RemixServer} from '@remix-run/react'
import {renderToString} from 'react-dom/server'

export default function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext,
) {
  let html = renderToString(
    <RemixServer context={remixContext} url={request.url} />,
  )

  return new Response(`<!DOCTYPE html>${html}`, {
    headers: {'Content-Type': 'text/html'},
    status: responseStatusCode,
  })
}
