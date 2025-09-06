import { Router } from 'express'

const userRoutes = Router()

userRoutes.get('/', (request, response) => {
    response.send({ message: 'GET USER' })
})

userRoutes.get('/:id', () => {
    // TODO
})

userRoutes.post('/', () => {
    // TODO
})

userRoutes.put('/edit/:id', () => {
    // TODO
})

userRoutes.delete('/:id', () => {
    // TODO
})

export default userRoutes
