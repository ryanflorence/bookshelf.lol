import {unstable_vitePlugin as remix} from '@remix-run/dev'
import {defineConfig} from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import inspect from 'vite-plugin-inspect'
import babel from 'vite-plugin-babel'

export default defineConfig({
  plugins: [
    babel({
      babelConfig: {
        plugins: ['babel-plugin-macros', '@emotion/babel-plugin'],
      },
    }),
    remix({
      appDirectory: 'src',
      unstable_ssr: false,
      async routes(defineRoutes) {
        return defineRoutes(route => {
          route('/', 'screens/index.jsx', {index: true})
          route('', 'screens/authenticated-layout.jsx', () => {
            route('list', 'screens/reading-list.jsx')
            route('*', 'screens/legacy-routes.jsx')
          })
          route('login', 'screens/login.jsx')
          route('logout', 'screens/logout.jsx')
        })
      },
    }),
    tsconfigPaths(),
    inspect(),
  ],
})
