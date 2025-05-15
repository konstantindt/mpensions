import fs from 'node:fs';
import {cwd} from 'node:process';
import {defineConfig} from '../define-config.js';

export function createDevelopmentConfig() {
  const runningInDocker = fs.existsSync('/.dockerenv');

  return defineConfig({
    environment: 'development',
    databaseUsername: 'development',
    databasePasswordFile: `${runningInDocker ? '/run/secrets' : cwd()}/postgre_development_password${runningInDocker ? '' : '.txt'}`,
    databaseName: 'development',
  });
}
