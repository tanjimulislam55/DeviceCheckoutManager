import { Router } from 'express'

import { checkoutDevice, checkinDevice } from '../controllers/deviceCheckoutController'

const router = Router()

router.post('/checkout', checkoutDevice)
router.put('/checkin/:deviceId', checkinDevice)

export default router
