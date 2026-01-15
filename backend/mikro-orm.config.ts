import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

const config: MikroOrmModuleSyncOptions = {
  driver: PostgreSqlDriver,
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  dbName: 'messenger',
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  migrations: {
    path: './migrations',
    transactional: true,
  },
  debug: true,
};

export default config;
