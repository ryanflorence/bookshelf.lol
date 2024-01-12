import {defineConfig, transformWithEsbuild} from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    force: true,
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  plugins: [
    {
      name: 'treat-js-files-as-jsx',
      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/)) return null

        // Use the exposed transform from vite, instead of directly
        // transforming with esbuild
        return transformWithEsbuild(code, id, {
          loader: 'jsx',
          jsx: 'automatic',
        })
      },
    },
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
