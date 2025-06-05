import { Email, Name, Password } from '../../types'
import { Either, Left, Right, IError } from '../../utils'

type IUserCreate = {
    email: string
    name: string
    password: string
}

type IUserLoad = {
    id: number
    email: string
    name: string
    password: string
    createAt: Date
    updateAt: Date
}

type IUserOutput = {
    id: number | null
    email: string
    name: string
    password: string
    createAt: Date
    updateAt: Date
}

type IUserError = IError<'User', 'createError' | 'updateError'>

export class User {
    private constructor(
        private readonly id: number | null,
        private email: Email,
        private name: Name,
        private password: Password,
        private readonly createAt: Date,
        private updateAt: Date,
    ) {}

    static create(props: IUserCreate): Either<IUserError, User> {
        const { email, name, password } = props
        const eitherEmail = Email.create(email)
        const eitherName = Name.create(name)
        const eitherPassword = Password.create(password)

        const mandatoryFields = ['email', 'name', 'password']

        for (const field of mandatoryFields)
            if (!props[field as keyof IUserCreate])
                return Left.create({
                    domain: 'User',
                    type: 'createError',
                    message: `User field ${field} is required.`,
                })

        if (eitherEmail.isLeft()) {
            return Left.create({
                domain: 'User',
                type: 'createError',
                message: eitherEmail.error.message,
            })
        }

        if (eitherName.isLeft()) {
            return Left.create({
                domain: 'User',
                type: 'createError',
                message: eitherName.error.message,
            })
        }

        if (eitherPassword.isLeft()) {
            return Left.create({
                domain: 'User',
                type: 'createError',
                message: eitherPassword.error.message,
            })
        }

        const now = new Date()

        return Right.create(
            new User(
                null,
                eitherEmail.value,
                eitherName.value,
                eitherPassword.value,
                now,
                now,
            ),
        )
    }

    static load(props: IUserLoad) {
        const { email, name, password } = props
        const eitherEmail = Email.create(email)
        const eitherName = Name.create(name)
        const eitherPassword = Password.create(password)

        const mandatoryFields = [
            'id',
            'email',
            'name',
            'password',
            'createAt',
            'updateAt',
        ]

        for (const field of mandatoryFields)
            if (!props[field as keyof IUserLoad])
                return Left.create({
                    domain: 'User',
                    type: 'createError',
                    message: `User field ${field} is required.`,
                })

        if (eitherEmail.isLeft()) {
            return Left.create({
                domain: 'User',
                type: 'createError',
                message: eitherEmail.error.message,
            })
        }

        if (eitherName.isLeft()) {
            return Left.create({
                domain: 'User',
                type: 'createError',
                message: eitherName.error.message,
            })
        }

        if (eitherPassword.isLeft()) {
            return Left.create({
                domain: 'User',
                type: 'createError',
                message: eitherPassword.error.message,
            })
        }

        const now = new Date()

        return Right.create(
            new User(
                null,
                eitherEmail.value,
                eitherName.value,
                eitherPassword.value,
                now,
                now,
            ),
        )
    }

    changeEmail(newEmail: string): Either<IUserError, undefined> {
        const eitherEmail = Email.create(newEmail)

        if (eitherEmail.isLeft())
            return Left.create({
                domain: 'User',
                type: 'updateError',
                message: eitherEmail.error.message,
            })

        const now = new Date()

        this.email = eitherEmail.value
        this.updateAt = now

        return Right.create(undefined)
    }

    changeName(newName: string): Either<IUserError, undefined> {
        const eitherName = Name.create(newName)

        if (eitherName.isLeft())
            return Left.create({
                domain: 'User',
                type: 'updateError',
                message: eitherName.error.message,
            })

        const now = new Date()

        this.name = eitherName.value
        this.updateAt = now

        return Right.create(undefined)
    }

    changePassword(newPassword: string): Either<IUserError, undefined> {
        const eitherPassword = Password.create(newPassword)

        if (eitherPassword.isLeft())
            return Left.create({
                domain: 'User',
                type: 'updateError',
                message: eitherPassword.error.message,
            })

        const now = new Date()

        this.password = eitherPassword.value
        this.updateAt = now

        return Right.create(undefined)
    }

    serialize(): IUserOutput {
        return {
            id: this.id,
            name: this.name.serialize(),
            email: this.email.serialize(),
            password: this.password.serialize(),
            createAt: this.createAt,
            updateAt: this.updateAt,
        }
    }
}
