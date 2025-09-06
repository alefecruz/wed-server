import { Router } from 'express'

import userRoutes from './user.route'

const publicRoutes = Router()

publicRoutes.use('/user', userRoutes)

export default publicRoutes
