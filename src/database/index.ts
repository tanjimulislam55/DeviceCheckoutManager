import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "admin",
    password: "admin",
    database: "db",
    entities: ["src/entities/*.ts"],
    migrations: ["src/migrations/*.ts"],
})
