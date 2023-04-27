import { Router } from 'express'

import { createCompany, getAllCompanies, getCompanyById, updateCompany, deleteCompany } from '../controllers/companyController'
import { getAuthenticatedUser, getAuthenticatedSuperUser } from '../middlewares/auth'

const router = Router()

router.post('/', getAuthenticatedSuperUser, createCompany)
router.get('/', getAuthenticatedUser, getAllCompanies)
router.get('/:id', getAuthenticatedUser, getCompanyById)
router.put('/:id', getAuthenticatedSuperUser, updateCompany)
router.delete('/:id', getAuthenticatedSuperUser, deleteCompany)

export default router
