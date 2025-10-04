import { Router } from 'express'
import { userController } from '@/controllers'

const userRoutes = Router()

userRoutes.post('/auth', userController.auth)

userRoutes.post('/', userController.create)

userRoutes.get('/', userController.list)

export default userRoutes
