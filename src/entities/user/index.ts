import { Email, Name, Password } from '../../types'
import { Either, Left, Right, IError } from '../../utils'

type IUserCreate = {
    email: string
    name: string
    password: string
    createAt?: Date
    updateAt?: Date
}

type IUser = IUserCreate

type IUserError = IError<'User', 'createError' | 'updateError'>

export class User {
    private constructor(
        private email: Email,
        private name: Name,
        private password: Password,
        private readonly createAt: Date,
        private updateAt: Date,
    ) {}

    static create({
        email,
        name,
        password,
        createAt,
        updateAt,
    }: IUserCreate): Either<IUserError, User> {
        const eitherEmail = Email.create(email)
        const eitherName = Name.create(name)
        const eitherPassword = Password.create(password)

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
                eitherEmail.value,
                eitherName.value,
                eitherPassword.value,
                createAt ?? now,
                updateAt ?? now,
            ),
        )
    }

    changeEmail(newEmail: string): Either<IUserError, undefined> {
        const eitherEmail = Email.create(newEmail)

        if (eitherEmail.isLeft())
            return Left.create({
                domain: 'User',
                type: 'updateError',
                message: eitherEmail.error,
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
                message: eitherName.error,
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
                message: eitherPassword.error,
            })

        const now = new Date()

        this.password = eitherPassword.value
        this.updateAt = now

        return Right.create(undefined)
    }

    get(): IUser {
        return {
            name: this.name.get(),
            email: this.email.get(),
            password: this.password.get(),
            createAt: this.createAt,
            updateAt: this.updateAt,
        }
    }
}
