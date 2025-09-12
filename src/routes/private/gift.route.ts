import { Router } from 'express'
import { GiftController } from '@/controllers'

const giftRoutes = Router()

giftRoutes.get('/', GiftController.list)

giftRoutes.get('/:id', GiftController.getById)

giftRoutes.post('/', GiftController.create)

giftRoutes.put('/edit/:id', GiftController.edit)

giftRoutes.delete('/:id', GiftController.delete)

export default giftRoutes
