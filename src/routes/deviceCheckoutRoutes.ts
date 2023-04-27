import { Router } from 'express'

import { checkoutDevice, checkinDevice } from '../controllers/deviceCheckoutController'
import { getAuthenticatedUser } from '../middlewares/auth'

const router = Router()

router.post('/checkout', getAuthenticatedUser, checkoutDevice)
router.put('/checkin/:deviceId', getAuthenticatedUser, checkinDevice)

export default router
