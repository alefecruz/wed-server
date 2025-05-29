import { Either, Left, Right } from '../../utils/either'

type Error = string

export class Password {
    private constructor(readonly password: string) {}

    private static isValidPassword(password: string): boolean {
        const strongPasswordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/

        return strongPasswordRegex.test(password)
    }

    static create(password: string): Either<Error, Password> {
        if (!password) {
            return Left.create('Password empty is not valid.')
        }

        if (!this.isValidPassword(password)) {
            return Left.create(`${password} is not valid Password.`)
        }

        return Right.create(new Password(password))
    }
}
