import { Request, Response } from 'express'

import { deviceRepository } from '../entities'

export const createDevice = async (req: Request, res: Response): Promise<void> => {
    try {
        const device = await deviceRepository.create(req.body)
        res.status(201).json(device)
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
            res.status(200).json(device)
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
            await deviceRepository.delete(id)
            res.status(204).end()
        } else {
            res.status(404).json({ message: 'Device not found' })
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}
