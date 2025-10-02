import { Request, Response } from 'express'
import { UserService } from '@/services'

export type IUserCreate = {
    email: string
    password: string
    confirmPassword: string
    husbandName: string
    wifeName: string
}

export class userController {
    static auth(req: Request, res: Response) {
        // TODO
        // AUTHENTICATE USER
    }

    static async create(
        req: Request<unknown, unknown, IUserCreate>,
        res: Response,
    ) {
        const { email, password, husbandName, wifeName, confirmPassword } =
            req.body

        if (
            !email ||
            !password ||
            !husbandName ||
            !wifeName ||
            !confirmPassword
        ) {
            return res.status(400).send('Missing required fields')
        }

        if (password !== confirmPassword) {
            return res.status(400).send('Passwords do not match')
        }

        const userCreateService = await UserService.create({
            email,
            password,
            husbandName,
            wifeName,
        })

        return res.send(userCreateService)
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
