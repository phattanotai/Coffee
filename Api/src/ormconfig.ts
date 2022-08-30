import { ConfigModule, ConfigService } from '@nestjs/config';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { join } from 'path';

export interface MysqlOption extends MysqlConnectionOptions {
  autoLoadEntities: boolean;
}

const MigrationConfig: MysqlOption = {
  type: 'mysql',
  autoLoadEntities: true,
  // logging: true,
  // logger: 'advanced-console',

  // We are using migrations, synchronize should be set to false.
  synchronize: true,
  dropSchema: false,
  entities: [join(__dirname, 'modules/**/*.entity{.ts,.js}')], // ['dist/modules/**/*.entity{.ts,.js}'],
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: false,
  migrationsTableName: 'migrations',
  // migrations: ['dist/migrations/*{.ts,.js}'],
  migrations: [join(__dirname, 'migrations/*{.ts,.js}')],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

const OrmConfig = (process: any): MysqlOption => {
  return {
    host: process.env.MYSQL_DATABASE_HOST || 'localhost',
    port: Number(process.env.MYSQL_DATABASE_PORT) || 3306,
    username: process.env.MYSQL_DATABASE_USER || 'root',
    password: process.env.MYSQL_DATABASE_PASSWORD || 'root',
    database: process.env.MYSQL_DATABASE_DB || 'db',
    ...MigrationConfig,
  };
};

const OrmConfigAsync = (): any => {
  return {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      host: configService.get('MYSQL_DATABASE_HOST'),
      port: Number(configService.get('MYSQL_DATABASE_PORT')),
      username: configService.get('MYSQL_DATABASE_USER'),
      password: configService.get('MYSQL_DATABASE_PASSWORD'),
      database: configService.get('MYSQL_DATABASE_DB'),
      ...MigrationConfig,
      logging: configService.get('NODE_ENV') === 'development' ? true : false,
      logger:
        configService.get('NODE_ENV') === 'development'
          ? 'advanced-console'
          : 'debug',
    }),
  };
};

const config = OrmConfig(process);
export { config, OrmConfigAsync, OrmConfig };
export default config;
