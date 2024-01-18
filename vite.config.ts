import {unstable_vitePlugin as remix} from '@remix-run/dev'
import {defineConfig} from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    // react({
    //   jsxImportSource: '@emotion/react',
    //   babel: {
    //     plugins: ['babel-plugin-macros', '@emotion/babel-plugin'],
    //   },
    // }),
    remix({
      appDirectory: 'src',
      unstable_ssr: false,
    }),
    tsconfigPaths(),
  ],
})
