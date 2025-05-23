import { Either, Left, Right } from '../../utils/either'

type Error = string
export class Email {
    private constructor(readonly prop: string) {}

    private static isValidEmail(prop: string) {
        const strictEmailRegex =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        return strictEmailRegex.test(prop)
    }

    static create(prop: string): Either<Error, Email> {
        if (!prop) {
            return Left.create(`Email empty is not valid.`)
        }

        if (!this.isValidEmail(prop)) {
            return Left.create(`${prop} is not valid Email.`)
        }

        return Right.create(new Email(prop))
    }
}
