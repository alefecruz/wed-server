import { Request, Response, NextFunction } from 'express'
import util from 'util'

export function serverLogs(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    const method = request.method
    const url = request.originalUrl
    const headers = Object.keys(request?.headers || []).length
        ? `Headers: ${util.inspect(request.headers, { depth: 2 })}`
        : ''
    const body = Object.keys(request?.body || []).length
        ? `Body: ${util.inspect(request.body, { depth: 2 })}`
        : ''
    const queryParams = Object.keys(request?.query || []).length
        ? `Query Params: ${util.inspect(request.query, { depth: 2 })}`
        : ''
    const currentTime = new Date().toISOString()

    const logMessage = `[${currentTime}] Method: ${method} URL: ${url} \n${headers}\n ${body}\n ${queryParams}`

    console.log(logMessage)
    next()
}
