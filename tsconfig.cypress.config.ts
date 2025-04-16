import { defineConfig } from "cypress";

export default defineConfig({
  extends: "./tsconfig.json",

  compilerOptions: {
    module: "CommonJS",
    types: ["cypress"],
  },

  include: ["cypress/**/*.ts"],

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
