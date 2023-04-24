import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

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

    @Column({
        nullable: true,
    })
    returnedCondition: string

    @Column({
        nullable: true,
    })
    employeeId: number

    @Column()
    deviceId: number

    @ManyToOne(() => Device, (device) => device.logs, {
        onDelete: 'CASCADE',
    })
    device: Device

    @ManyToOne(() => Employee, (employee) => employee.logs, {
        onDelete: 'SET NULL',
    })
    employee: Employee
}

export default DeviceLog
