import { Router } from 'express'

import { createDevice, getAllDevices, getDeviceById, updateDevice, deleteDevice } from '../controllers/deviceController'
import { getAuthenticatedUser, getAuthenticatedSuperUser } from '../middlewares/auth'

const router = Router()

router.post('/', getAuthenticatedUser, createDevice)
router.get('/', getAuthenticatedUser, getAllDevices)
router.get('/:id', getAuthenticatedUser, getDeviceById)
router.put('/:id', getAuthenticatedUser, updateDevice)
router.delete('/:id', getAuthenticatedSuperUser, deleteDevice)

export default router
