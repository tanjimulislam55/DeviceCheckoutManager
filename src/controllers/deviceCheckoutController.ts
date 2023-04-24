import { Request, Response } from 'express'

import { deviceLogRepository, deviceRepository, employeeRepository } from '../entities'

export const checkoutDevice = async (req: Request, res: Response): Promise<void> => {
    try {
        const { deviceId, employeeId } = req.body
        if (!deviceId || !employeeId) {
            res.status(403).json({ message: 'Employee or device id missing' })
            return
        }

        const device = await deviceRepository.findOneBy({ id: deviceId })
        if (!device) {
            res.status(404).json({ message: 'Device not found' })
            return
        }

        if (device.isAvailable === false) {
            res.status(400).json({ message: 'Device is not available for checked in' })
            return
        }

        const employee = await employeeRepository.findOneBy({ id: employeeId })
        if (!employee) {
            res.status(404).json({ message: 'Employee not found' })
            return
        }

        if (device.companyId !== employee.companyId) {
            res.status(403).json({
                message: `The employee of id ${employeeId} does not belong to the company that owns the device of id ${deviceId}`,
            })
            return
        }

        const deviceLog = deviceLogRepository.create(req.body)
        await deviceRepository.update(deviceId, { isAvailable: false })
        await deviceLogRepository.save(deviceLog)

        res.status(200).json({ message: 'Device checked out successfully' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

export const checkinDevice = async (req: Request, res: Response): Promise<void> => {
    const deviceId = parseInt(req.params.deviceId)

    try {
        const device = await deviceRepository.findOneBy({ id: deviceId })
        if (!device) {
            res.status(404).json({ message: 'Device not found' })
            return
        }

        if (device.isAvailable === true) {
            res.status(400).json({ message: 'Device is already checked in' })
            return
        }

        const deviceLog = await deviceLogRepository.findOne({
            where: { deviceId: deviceId },
            order: { createdAt: 'DESC' },
        })

        if (deviceLog) {
            await deviceRepository.update(deviceId, { isAvailable: true })
            await deviceLogRepository.update(deviceLog.id, { returnedCondition: req.body.returnedCondition })
            res.status(200).json({ message: 'Device checked in successfully' })
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}
