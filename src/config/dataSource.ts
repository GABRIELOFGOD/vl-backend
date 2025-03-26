// data-source.ts
import { DataSource } from 'typeorm';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from './env';
import { General } from '../entities/general.entity';
import { User } from '../entities/user.entity';
import { Surah } from '../entities/surah.entity';
import { Application } from '../entities/application.entity';

export const dataSource = new DataSource({
  type: 'mysql',
  host: DB_HOST || 'localhost',
  port: 3306,
  username: DB_USER || 'root',
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [General, User, Surah, Application],
  synchronize: true,
});
