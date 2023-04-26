import Company from './Company'
import Employee from './Employee'
import Device from './Device'
import DeviceLog from './DeviceLog'
import AppDataSource from '../ormconfig'
import User from './User'

export const companyRepository = AppDataSource.getRepository(Company)
export const employeeRepository = AppDataSource.getRepository(Employee)
export const deviceRepository = AppDataSource.getRepository(Device)
export const deviceLogRepository = AppDataSource.getRepository(DeviceLog)
export const userRepository = AppDataSource.getRepository(User)
