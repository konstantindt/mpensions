import {env} from 'node:process';
import {createDevelopmentConfig} from './environment/development.js';

export const appConfig = getConfig();

function getConfig() {
  switch (env.APP_ENV) {
    case 'development': {
      return createDevelopmentConfig();
    }

    default: {
      throw new Error(`Invalid APP_ENV "${env.APP_ENV}"`);
    }
  }
}
