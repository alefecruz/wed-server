import { Either, Left, Right, IError } from '../../utils'

type INameError = IError<'Type Name', 'createError'>

export class Name {
    private constructor(private readonly name: string) {}

    private static isValidName(name: string): boolean {
        const validNameRegex = /^[A-Za-zÀ-ÿ\s]{2,}$/
        return validNameRegex.test(name)
    }

    static create(name: string): Either<INameError, Name> {
        const nameTrimmed = name.trim()

        if (!nameTrimmed) {
            return Left.create({
                domain: 'Type Name',
                type: 'createError',
                message: 'Name cannot be empty.',
            })
        }

        if (!this.isValidName(nameTrimmed)) {
            return Left.create({
                domain: 'Type Name',
                type: 'createError',
                message: 'Name must contain only letters and spaces.',
            })
        }

        return Right.create(new Name(nameTrimmed))
    }

    serialize() {
        return this.name
    }
}
