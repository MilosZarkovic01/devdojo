import * as dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const databaseOptions = {
    type: 'postgres' as const,
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT ?? '5432', 10),
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    synchronize: false,
    migrations: [__dirname + '/../db/migrations/**/*{.js,.ts}'],
    migrationsRun: true,
    migrationsTableName: 'migrations',
    migrationsTransactionMode: 'all' as const,
}