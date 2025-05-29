import { Either, Left, Right } from '../../utils/either'

type Error = string

export class Name {
    private constructor(readonly name: string) {}

    private static isValidName(name: string): boolean {
        const validNameRegex = /^[A-Za-zÀ-ÿ\s]{2,}$/
        return validNameRegex.test(name)
    }

    static create(name: string): Either<Error, Name> {
        const nameTrimmed = name.trim()

        if (!nameTrimmed) {
            return Left.create('Name cannot be empty.')
        }

        if (!this.isValidName(nameTrimmed)) {
            return Left.create('Name must contain only letters and spaces.')
        }

        return Right.create(new Name(nameTrimmed))
    }
}
