import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm'

import { Device } from './Device'
import { Employee } from './Employee'

@Entity()
@Unique(['name'])
export class Company {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Device, (device) => device.company, {
        cascade: true,
    })
    devices: Device[]

    @OneToMany(() => Employee, (employee) => employee.company, {
        cascade: true,
    })
    employees: Employee[]
}
