import { Request, Response } from 'express'

import { companyRepository } from '../entities'

export const createCompany = async (req: Request, res: Response): Promise<void> => {
    try {
        const existingCompany = await companyRepository.findOne({ where: { name: req.body.name } })
        if (existingCompany) res.status(403).json('Name already exists')
        else {
            const company = companyRepository.create(req.body)
            const results = await companyRepository.save(company)
            res.status(201).json(results)
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

export const getAllCompanies = async (_req: Request, res: Response): Promise<void> => {
    try {
        const companies = await companyRepository.find()
        res.status(200).json(companies)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

export const getCompanyById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id)
        const company = await companyRepository.findOneBy({ id: id })
        if (company) {
            res.status(200).json(company)
        } else {
            res.status(404).json({ message: 'Company not found' })
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

export const updateCompany = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id)
        const company = await companyRepository.findOneBy({ id: id })
        if (company) {
            const body = req.body
            await companyRepository.update(id, body)
            res.status(200).json({ id: company.id, ...body })
        } else {
            res.status(404).json({ message: 'Company not found' })
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

export const deleteCompany = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id)
        const company = await companyRepository.findOneBy({ id: id })
        if (company) {
            await companyRepository.delete(id)
            res.status(202).json(`${company.name} has been deleted`)
        } else {
            res.status(404).json({ message: 'Company not found' })
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}
