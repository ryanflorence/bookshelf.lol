import {defineConfig, transformWithEsbuild} from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['babel-plugin-macros', '@emotion/babel-plugin'],
      },
    }),
    viteTsconfigPaths(),
    svgr({
      include: '**/*.svg?react',
    }),
  ],
})
