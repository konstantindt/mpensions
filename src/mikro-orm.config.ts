import fs from 'node:fs/promises';
import {type Options, PostgreSqlDriver} from '@mikro-orm/postgresql';
import {TsMorphMetadataProvider} from '@mikro-orm/reflection';
import {SeedManager} from '@mikro-orm/seeder';
import {appConfig} from './config/index.js';

const config: Options = {
  driver: PostgreSqlDriver,
  user: appConfig.databaseUsername,
  password: async () => fs.readFile(appConfig.databasePasswordFile, 'utf8'),
  dbName: appConfig.databaseName,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  metadataProvider: TsMorphMetadataProvider,
  debug: appConfig.environment === 'development',
  extensions: [SeedManager],
  seeder: {
    path: 'dist/seeders',
    pathTs: 'src/seeders',
    defaultSeeder: 'DatabaseSeeder',
    glob: '!(*.d).{js,ts}',
    emit: 'ts',
    fileName: (className: string) => className,
  },
};

export default config;
