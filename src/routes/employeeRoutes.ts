import { Router } from 'express'

import { createEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee } from '../controllers/employeeController'
import { getAuthenticatedUser, getAuthenticatedSuperUser } from '../middlewares/auth'

const router = Router()

router.post('/', getAuthenticatedUser, createEmployee)
router.get('/', getAuthenticatedUser, getAllEmployees)
router.get('/:id', getAuthenticatedUser, getEmployeeById)
router.put('/:id', getAuthenticatedUser, updateEmployee)
router.delete('/:id', getAuthenticatedSuperUser, deleteEmployee)

export default router
