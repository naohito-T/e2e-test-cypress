import task from '@cypress/code-coverage/task';
import { addMatchImageSnapshotPlugin } from 'cypress-image-snapshot/plugin';

// const snap = (on: Cypress.PluginEvents,
//               config: Cypress.PluginConfigOptions): Cypress.PluginConfigOptions => {

// }

/**
 * @type {Cypress.PluginConfig}
 */
export default function (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Cypress.PluginConfigOptions {
  task(on, config);
  addMatchImageSnapshotPlugin(on, config);

  return config;
}
