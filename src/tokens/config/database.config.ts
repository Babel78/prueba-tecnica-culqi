import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { TokenEntity } from '../infrastructure/adapters/entities/token.entity';
const connectionOptions: PostgresConnectionOptions = {
  type: 'postgres',
  port: Number(process.env.DATABASE_PORT),
  synchronize: true,
  logging: false,
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  database: process.env.DATABASE_PASSWORD,
  password: process.env.DATABASE_NAME,
  entities: [TokenEntity],
};
export const appDataSource = new DataSource(connectionOptions);
