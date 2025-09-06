import { Router } from 'express'
import giftRoutes from './gift.route'
import guestRoutes from './guest.route'

const privateRoutes = Router()

privateRoutes.use('/gift', giftRoutes)
privateRoutes.use('/guest', guestRoutes)

export default privateRoutes
