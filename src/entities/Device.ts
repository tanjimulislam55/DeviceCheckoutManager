import { Entity, Column, ManyToOne, OneToMany, JoinTable } from 'typeorm'

import { Base } from '.'
import { Company } from './Company'
import { DeviceLog } from './DeviceLog'

@Entity()
export class Device extends Base {
    @Column()
    name: string

    @Column()
    description: string

    @Column()
    isAvailable: boolean

    @ManyToOne(() => Company, (company) => company.devices, {
        onDelete: 'CASCADE',
    })
    company: Company

    @OneToMany(() => DeviceLog, (deviceLog) => deviceLog.device, {
        cascade: true,
    })
    logs: DeviceLog[]
}
