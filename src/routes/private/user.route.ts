import { Router } from 'express'
import { userController } from '@/controllers'

const userRoutes = Router()

userRoutes.put('/edit/:id', userController.edit)

userRoutes.delete('/:id', userController.delete)

export default userRoutes
