import { Request, Response } from 'express'

import { companyRepository, deviceRepository } from '../entities'

export const createDevice = async (req: Request, res: Response): Promise<void> => {
    try {
        const companyId = req.body.companyId
        if (!companyId) res.status(403).json('Company id missing')
        else {
            const company = await companyRepository.findOneBy({ id: companyId })
            if (!company) {
                res.status(404).json({ message: `Company not found with id ${companyId}` })
                return
            } else {
                const device = deviceRepository.create(req.body)
                const results = await deviceRepository.save(device)
                res.status(201).json(results)
            }
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

export const getAllDevices = async (_req: Request, res: Response): Promise<void> => {
    try {
        const devices = await deviceRepository.find()
        res.status(200).json(devices)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

export const getDeviceById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id)
        const device = await deviceRepository.findOneBy({ id: id })
        await device?.logs
        if (device) {
            res.status(200).json(device)
        } else {
            res.status(404).json({ message: 'Device not found' })
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

export const updateDevice = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id)
        const device = await deviceRepository.findOneBy({ id: id })
        if (device) {
            const body = req.body
            await deviceRepository.update(id, body)
            res.status(200).json({ id: device.id, ...body })
        } else {
            res.status(404).json({ message: 'Device not found' })
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

export const deleteDevice = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id)
        const device = await deviceRepository.findOneBy({ id: id })
        if (device) {
            const results = await deviceRepository.delete(id)
            res.status(204).json(results)
        } else {
            res.status(404).json({ message: 'Device not found' })
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}
