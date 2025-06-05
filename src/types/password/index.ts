import { Either, Left, Right, IError } from '../../utils'

type IPassworError = IError<'Type Password', 'createError'>

export class Password {
    private constructor(private readonly password: string) {}

    private static isValidPassword(password: string): boolean {
        const strongPasswordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/

        return strongPasswordRegex.test(password)
    }

    static create(password: string): Either<IPassworError, Password> {
        if (!password) {
            return Left.create({
                domain: 'Type Password',
                type: 'createError',
                message: 'Password empty is not valid.',
            })
        }

        if (!this.isValidPassword(password)) {
            return Left.create({
                domain: 'Type Password',
                type: 'createError',
                message: `${password} is not valid Password.`,
            })
        }

        return Right.create(new Password(password))
    }

    serialize() {
        return this.password
    }
}
