import './bootstrap'
import {loadDevTools} from './dev-tools/load'
import {RemixBrowser} from '@remix-run/react'
import {hydrateRoot} from 'react-dom/client'

loadDevTools(() => {
  hydrateRoot(root, <RemixBrowser />)
})
