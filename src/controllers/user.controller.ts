import { Request, Response } from 'express'
import { UserService } from '@/services'

export type IUserCreate = {
    email: string
    password: string
    husbandName: string
    wifeName: string
}

export class userController {
    static auth(req: Request, res: Response) {
        // TODO
        // AUTHENTICATE USER
    }

    static create(req: Request, res: Response) {
        const { email, password, husbandName, wifeName } =
            req.body as IUserCreate

        if (!email || !password || !husbandName || !wifeName) {
            return res.status(400).send('Missing required fields')
        }

        const createServiceEither = UserService.create({
            email,
            password,
            husbandName,
            wifeName,
        })

        if (createServiceEither.isLeft())
            return res.status(400).send(createServiceEither.error)

        const user = createServiceEither.value

        return res.send(user)
    }

    static edit(req: Request, res: Response) {
        // TODO
        // EDIT USER
    }

    static delete(req: Request, res: Response) {
        // TODO
        // DELETE USER
    }
}
