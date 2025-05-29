import { Either, Left, Right } from '../../utils/either'

type Error = string

export class Name {
    private constructor(private readonly _value: string) {}

    get value(): string {
        return this._value
    }

    private static isValidName(prop: string): boolean {
        const validNameRegex = /^[A-Za-zÀ-ÿ\s]{2,}$/
        return validNameRegex.test(prop.trim())
    }

    static create(prop: string): Either<Error, Name> {
        const trimmed = prop.trim()

        if (!trimmed) {
            return Left.create('Name cannot be empty.')
        }

        if (trimmed.length < 2) {
            return Left.create('Name must have at least 2 characters.')
        }

        if (!this.isValidName(trimmed)) {
            return Left.create('Name must contain only letters and spaces.')
        }

        return Right.create(new Name(trimmed))
    }
}
