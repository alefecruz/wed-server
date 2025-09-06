import Express, { json } from 'express'
import cors from 'cors'

import { serverLogs } from '@/middlewares'
import routes from '@/routes'

const PORT = 3000

const server = Express()

server.use(cors())
server.use(json())
server.use(serverLogs)

server.use(routes)

server.listen(PORT, () => console.log(`Server on in port ${PORT}`))
