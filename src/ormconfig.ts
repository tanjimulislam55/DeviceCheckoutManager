import 'reflect-metadata'
import { DataSource } from 'typeorm'
require('dotenv').config()

import Company from './entities/Company'
import Device from './entities/Device'
import DeviceLog from './entities/DeviceLog'
import Employee from './entities/Employee'
import User from './entities/User'

const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [Company, Device, DeviceLog, Employee, User],
    // migrations: ['.migrations/*.ts'],
})

export default AppDataSource
