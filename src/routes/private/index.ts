import { Router } from 'express'
import giftRoutes from './gift.route'
import guestRoutes from './guest.route'
import userRoutes from './user.route'

const privateRoutes = Router()

privateRoutes.use('/gift', giftRoutes)
privateRoutes.use('/guest', guestRoutes)
privateRoutes.use('/user', userRoutes)

export default privateRoutes
