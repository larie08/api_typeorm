import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entity/user.entity'; 

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'larieSql_p@ss123!!',
    database: process.env.DB_NAME || 'node-mysql-crud-api',
    driver: require('mysql2'),
    entities: [User],
    synchronize: true, 
    logging: true,
});

AppDataSource.initialize()
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.error('Database connection failed:', err));
