import { Either, Left, Right } from '../../utils/either'

type Error = string
export class Email {
    private constructor(readonly email: string) {}

    private static isValidEmail(email: string) {
        const strictEmailRegex =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        return strictEmailRegex.test(email)
    }

    static create(email: string): Either<Error, Email> {
        if (!email) {
            return Left.create(`Email empty is not valid.`)
        }

        if (!this.isValidEmail(email)) {
            return Left.create(`${email} is not valid Email.`)
        }

        return Right.create(new Email(email))
    }
}
