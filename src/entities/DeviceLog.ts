import { Entity, Column, ManyToOne, JoinTable } from 'typeorm'

import { Base } from '.'
import { Device } from './Device'
import { Employee } from './Employee'

@Entity()
export class DeviceLog extends Base {
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
