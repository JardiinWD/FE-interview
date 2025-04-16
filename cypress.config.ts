import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  screenshotOnRunFailure: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:4005",
    experimentalRunAllSpecs: true,
  },
  env: {
    CYPRESS_DUMMYJSON_BASEURL: 'https://dummyjson.com',
    CYPRESS_BASE_URL: 'http://localhost:4005',
    CYPRESS_USER_APICART_NAME: 'oliviaw',
    CYPRESS_USER_APICART_PASSWORD: 'oliviawpass',
    CYPRESS_USER_STORECART_NAME: 'lilyb',
    CYPRESS_USER_STORECART_PASSWORD: 'lilybpass',
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  viewportWidth: 1440,
  viewportHeight: 1080,

});
