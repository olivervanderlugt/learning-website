import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/learning-website/',
  plugins: [react(), tailwindcss()],
  build: {
    // Vite 8 runs on rolldown: chunking lives under
    // build.rolldownOptions.output.codeSplitting.groups
    // (rollup's manualChunks / rolldown's advancedChunks are both deprecated aliases).
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'react-vendor',
              test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              priority: 30,
            },
            {
              name: 'xyflow-vendor',
              test: /node_modules[\\/](@xyflow|@reactflow|d3-[^\\/]+|classcat)[\\/]/,
              priority: 20,
            },
            {
              name: 'motion-vendor',
              test: /node_modules[\\/](motion|motion-dom|motion-utils|framer-motion)[\\/]/,
              priority: 20,
            },
            {
              name: 'vendor',
              test: /node_modules[\\/]/,
              priority: 10,
            },
            // src/content is ~2 MB of hand-authored lesson data (125 lesson files)
            // and is by far the biggest part of the app. maxSize slices it into
            // several sibling chunks instead of one monolith.
            {
              name: 'lessons',
              test: /src[\\/]content[\\/]lessons[\\/]/,
              priority: 5,
              maxSize: 400 * 1024,
            },
            {
              name: 'content',
              test: /src[\\/]content[\\/]/,
              priority: 4,
              maxSize: 400 * 1024,
            },
          ],
        },
      },
    },
  },
})
