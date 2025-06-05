import { Either, Left, Right, IError } from '../../utils'

type IEmailError = IError<'Type Email', 'createError'>

export class Email {
    private constructor(private readonly email: string) {}

    private static isValidEmail(email: string) {
        const strictEmailRegex =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        return strictEmailRegex.test(email)
    }

    static create(email: string): Either<IEmailError, Email> {
        if (!email) {
            return Left.create({
                domain: 'Type Email',
                type: 'createError',
                message: `Email empty is not valid.`,
            })
        }

        if (!this.isValidEmail(email)) {
            return Left.create({
                domain: 'Type Email',
                type: 'createError',
                message: `${email} is not valid Email.`,
            })
        }

        return Right.create(new Email(email))
    }

    serialize() {
        return this.email
    }
}
