import { Entity, Column, ManyToOne, JoinTable, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import Device from './Device'
import Employee from './Employee'

@Entity()
export class DeviceLog {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @Column()
    checkedOutCondition: string

    @Column()
    returnedCondition: string

    @ManyToOne(() => Device, (device) => device.logs, {
        onDelete: 'CASCADE',
    })
    @JoinTable()
    device: Device

    @ManyToOne(() => Employee, (employee) => employee.logs, {
        onDelete: 'SET NULL',
    })
    @JoinTable()
    employee: Employee
}

export default DeviceLog
