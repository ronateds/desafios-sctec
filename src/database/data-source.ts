import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'db_produtos',
    synchronize: true,
    logging: true,
    logger: 'advanced-console',
    entities: ['src/entities/*.ts'],
})
