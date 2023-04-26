import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToMany, Unique } from 'typeorm'

import Device from './Device'
import Employee from './Employee'

@Entity()
@Unique(['name'])
class Company {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @Column()
    name: string

    @OneToMany(() => Device, (device) => device.company, {
        cascade: true,
        lazy: true,
    })
    devices: Promise<Device[]>

    @OneToMany(() => Employee, (employee) => employee.company, {
        cascade: true,
        lazy: true,
    })
    employees: Promise<Employee[]>
}

export default Company
