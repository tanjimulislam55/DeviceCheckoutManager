import { Entity, Column, ManyToOne, OneToMany, Unique, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import Company from './Company'
import DeviceLog from './DeviceLog'

@Entity()
@Unique(['name'])
export class Employee {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @Column()
    name: string

    @Column()
    companyId: number

    @ManyToOne(() => Company, (company) => company.employees, {
        onDelete: 'CASCADE',
    })
    company: Company

    @OneToMany(() => DeviceLog, (deviceLog) => deviceLog.employee)
    logs: DeviceLog[]
}

export default Employee
