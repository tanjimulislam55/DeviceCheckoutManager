import { Request, Response } from 'express'

import { employeeRepository } from '../entities'

export const createEmployee = async (req: Request, res: Response): Promise<void> => {
    try {
        const employee = employeeRepository.create(req.body)
        const results = await employeeRepository.save(employee)
        res.status(201).json(results)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

export const getAllEmployees = async (_req: Request, res: Response): Promise<void> => {
    try {
        const employees = await employeeRepository.find()
        res.status(200).json(employees)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

export const getEmployeeById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id)
        const employee = await employeeRepository.findOneBy({ id: id })
        if (employee) {
            res.status(200).json(employee)
        } else {
            res.status(404).json({ message: 'Employee not found' })
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

export const updateEmployee = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id)
        const employee = await employeeRepository.findOneBy({ id: id })
        if (employee) {
            const body = req.body
            await employeeRepository.update(id, body)
            res.status(200).json({ id: employee.id, ...body })
        } else {
            res.status(404).json({ message: 'Employee not found' })
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

export const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id)
        const employee = await employeeRepository.findOneBy({ id: id })
        if (employee) {
            const results = await employeeRepository.delete(id)
            res.status(204).json(results)
        } else {
            res.status(404).json({ message: 'Employee not found' })
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}
