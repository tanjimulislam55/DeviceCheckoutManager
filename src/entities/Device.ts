import { Entity, Column, ManyToOne, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import Company from './Company'
import DeviceLog from './DeviceLog'

@Entity()
class Device {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    isAvailable: boolean

    @Column()
    companyId: number

    @ManyToOne(() => Company, (company) => company.devices, {
        onDelete: 'CASCADE',
    })
    company: Company

    @OneToMany(() => DeviceLog, (deviceLog) => deviceLog.device, {
        cascade: true,
        lazy: true,
    })
    logs: Promise<DeviceLog[]>
}

export default Device
