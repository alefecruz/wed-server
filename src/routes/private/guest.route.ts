import { Router } from 'express'
import { GuestController } from '@/controllers'

const guestRoutes = Router()

guestRoutes.get('/', GuestController.list)

guestRoutes.get('/:id', GuestController.getById)

guestRoutes.post('/', GuestController.create)

guestRoutes.put('/send-invite/:id', GuestController.sendInvite)

guestRoutes.put(
    '/attendance-confirmation/:id',
    GuestController.attendanceConfirmation,
)

guestRoutes.put('/edit/:id', GuestController.edit)

guestRoutes.delete('/:id', GuestController.delete)

export default guestRoutes
