import * as path from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
      host: true,
  },
  base: '/three-example',
  build:{
	// docs
		outDir: 'three-example',
		//./
  },
  resolve: {
	alias: [
	  {
		find: /^~/,
		replacement: `${path.resolve(__dirname, './node_modules')}/`,
	  },
	  {
		find: /@\//,
		replacement: `${path.resolve(__dirname, './src')}/`,
	  },
	],
  },
})
