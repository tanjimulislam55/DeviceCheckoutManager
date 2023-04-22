import { Entity, Column, ManyToOne, OneToMany, Unique } from 'typeorm'

import { Base } from '.'
import { Company } from './Company'
import { DeviceLog } from './DeviceLog'

@Entity()
@Unique(['name'])
export class Employee extends Base {
    @Column()
    name: string

    @ManyToOne(() => Company, (company) => company.employees, {
        onDelete: 'CASCADE',
    })
    company: Company

    @OneToMany(() => DeviceLog, (deviceLog) => deviceLog.employee)
    logs: DeviceLog[]
}
