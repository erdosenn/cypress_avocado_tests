import { defineConfig } from "cypress";
import cypressSettings from "./cypress.env.json";
import shopEnvData from "./support/envData/shopEnvData.json";
// @ts-ignore
import { allureCypress } from "allure-cypress/reporter";
import PluginEvents = Cypress.PluginEvents;
import PluginConfigOptions = Cypress.PluginConfigOptions;
import * as os from "node:os";

const cypressConfig: Cypress.ConfigOptions = {
  video: false,
  defaultCommandTimeout: 15000,
  requestTimeout: 15000,
  pageLoadTimeout: 15000,
  experimentalModifyObstructiveThirdPartyCode: true,
  e2e: {
    experimentalStudio: true,
    supportFile: "./support/gui.ts",
    fixturesFolder: "./support/fixtures",
    screenshotsFolder: "./logs/screenshots",
    videosFolder: "./logs/videos",
    downloadsFolder: "./logs/downloads",
    setupNodeEvents(on: PluginEvents, config: PluginConfigOptions): void {
      allureCypress(on, config, {
        environmentInfo: {
          os_platform: os.platform(),
          os_release: os.release(),
          os_version: os.version(),
          node_version: process.version,
        },
        resultsDir: "./cypress/logs/allure-results",
      });
    },
    retries: {
      runMode: 0,
      openMode: 0,
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
};

cypressConfig.e2e.baseUrl = cypressSettings[cypressSettings.SUT].url;
cypressConfig.e2e.specPattern = cypressSettings[cypressSettings.SUT].specPath;

if (cypressConfig.e2e.baseUrl.includes("shop-package.com")) {
  cypressConfig.e2e.env = shopEnvData.package;
} else if (cypressConfig.e2e.baseUrl.includes("shop-stage.com")) {
  cypressConfig.e2e.env = shopEnvData.stage;
} else if (cypressConfig.e2e.baseUrl.includes("localhost-docker.com")) {
  cypressConfig.e2e.env = shopEnvData.docker;
}
cypressConfig.chromeWebSecurity = false;

export default defineConfig(cypressConfig);
