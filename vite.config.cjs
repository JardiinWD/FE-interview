const dotenv = require('dotenv');
const react = require('@vitejs/plugin-react').default;
const tsconfigPaths = require('vite-tsconfig-paths').default;
const svgr = require("vite-plugin-svgr").default;
const { ViteMinifyPlugin } = require('vite-plugin-minify');
const { defineConfig } = require('vite');

dotenv.config();

// https://vite.dev/config/
module.exports = defineConfig({
    define: {
        /* DUMMY JSON BASE URLL */
        VITE_DUMMY_JSON_BASEURL: `"${process.env.VITE_DUMMY_JSON_BASEURL}"`,
    },
    plugins: [react(), tsconfigPaths(), svgr(), ViteMinifyPlugin({})],
    server: {
        port: 4005,
        host: true,
        watch: {
            usePolling: true
        }
    },
    resolve: {
        alias: {
            '@': '/src'
        }
    }
});