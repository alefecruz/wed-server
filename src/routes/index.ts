import { Router } from 'express'
import publicRoutes from './public'
import privateRoutes from './private'

const routes = Router()

routes.use('/private', privateRoutes)
routes.use('/public', publicRoutes)

export default routes
