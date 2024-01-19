import {unstable_vitePlugin as remix} from '@remix-run/dev'
import {defineConfig} from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
// import react from '@vitejs/plugin-react'
import inspect from 'vite-plugin-inspect'
import babel from 'vite-plugin-babel'

export default defineConfig({
  plugins: [
    // react({
    //   jsxImportSource: '@emotion/react',
    //   babel: {
    //     plugins: ['babel-plugin-macros', '@emotion/babel-plugin'],
    //   },
    // }),
    babel({
      babelConfig: {
        plugins: ['babel-plugin-macros', '@emotion/babel-plugin'],
      },
    }),
    remix({
      appDirectory: 'src',
      unstable_ssr: false,
    }),
    tsconfigPaths(),
    inspect(),
  ],
})
