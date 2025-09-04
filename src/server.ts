import Express, { json } from 'express'
import cors from 'cors'

import { serverLogs } from '@/middlewares'

const PORT = 3000

const server = Express()

server.use(cors())
server.use(json())
server.use(serverLogs)

server.get('/', (request, response) => {
    response.send({ message: 'Funcionou!' })
})

server.listen(PORT, () => console.log(`Server on in port ${PORT}`))
