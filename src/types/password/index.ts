import { Either, Left, Right } from '../../utils/either'

type Error = string

export class Password {
    private constructor(readonly value: string) {}

    private static isValidPassword(value: string): boolean {
        const strongPasswordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/
        return strongPasswordRegex.test(value)
    }

    static create(value: string): Either<Error, Password> {
        if (!value) {
            return Left.create('Password empty is not valid.')
        }

        if (!this.isValidPassword(value)) {
            return Left.create(`${value} is not valid Password.`)
        }

        return Right.create(new Password(value))
    }
}
