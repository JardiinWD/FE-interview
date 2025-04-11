import { defineConfig } from 'vite'
import dotenv from 'dotenv';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from "vite-plugin-svgr";
import { ViteMinifyPlugin } from 'vite-plugin-minify'

dotenv.config();


// https://vite.dev/config/
export default defineConfig({
  define: {
    /* DUMMY JSON BASE URLL */
    VITE_DUMMY_JSON_BASEURL: `"${process.env.VITE_DUMMY_JSON_BASEURL}"`,
  },
  plugins: [react(), tsconfigPaths(), svgr(), ViteMinifyPlugin({})],
  server: {
    port: 4005,
  },
})
