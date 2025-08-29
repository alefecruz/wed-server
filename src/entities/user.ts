import { Email, Name, Password } from '@/types'
import { Either, Left, Right, IError, getFirstError } from '@/utils'

type IUserCreate = {
    email: string
    husbandName: string
    wifeName: string
    password: string
}

type IUserLoad = {
    id: number
    husbandName: string
    wifeName: string
    email: string
    password: string
    createAt: Date
    updateAt: Date
}

type IUserOutput = {
    id: number | null
    husbandName: string
    wifeName: string
    email: string
    password: string
    createAt: Date
    updateAt: Date
}

type IUserError = IError<'User', 'createError' | 'updateError' | 'loadError'>

export class User {
    private constructor(
        private readonly id: number | null,
        private email: Email,
        private husbandName: Name,
        private wifeName: Name,
        private password: Password,
        private readonly createAt: Date,
        private updateAt: Date,
    ) {}

    static create(props: IUserCreate): Either<IUserError, User> {
        const { email, husbandName, wifeName, password } = props
        const eitherEmail = Email.create(email)
        const eitherHusbandName = Name.create(husbandName)
        const eitherWifeName = Name.create(wifeName)
        const eitherPassword = Password.create(password)

        if (
            eitherEmail.isLeft() ||
            eitherHusbandName.isLeft() ||
            eitherWifeName.isLeft() ||
            eitherPassword.isLeft()
        ) {
            return Left.create({
                domain: 'User',
                type: 'createError',
                message: getFirstError(
                    eitherEmail,
                    eitherHusbandName,
                    eitherWifeName,
                    eitherPassword,
                ),
            })
        }

        const now = new Date()

        return Right.create(
            new User(
                null,
                eitherEmail.value,
                eitherHusbandName.value,
                eitherWifeName.value,
                eitherPassword.value,
                now,
                now,
            ),
        )
    }

    static load(props: IUserLoad) {
        const {
            id,
            email,
            husbandName,
            wifeName,
            password,
            createAt,
            updateAt,
        } = props
        const eitherEmail = Email.create(email)
        const eitherHusbandName = Name.create(husbandName)
        const eitherWifeName = Name.create(wifeName)
        const eitherPassword = Password.create(password)

        const mandatoryFields = ['id', 'createAt', 'updateAt']

        for (const field of mandatoryFields)
            if (!props[field as keyof IUserLoad])
                return Left.create({
                    domain: 'User',
                    type: 'createError',
                    message: `User field ${field} is required.`,
                })

        if (
            eitherEmail.isLeft() ||
            eitherHusbandName.isLeft() ||
            eitherWifeName.isLeft() ||
            eitherPassword.isLeft()
        ) {
            return Left.create({
                domain: 'User',
                type: 'loadError',
                message: getFirstError(
                    eitherEmail,
                    eitherHusbandName,
                    eitherWifeName,
                    eitherPassword,
                ),
            })
        }

        return Right.create(
            new User(
                id,
                eitherEmail.value,
                eitherHusbandName.value,
                eitherWifeName.value,
                eitherPassword.value,
                createAt,
                updateAt,
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

    changeHusbandName(newHusbandName: string): Either<IUserError, undefined> {
        const eitherName = Name.create(newHusbandName)

        if (eitherName.isLeft())
            return Left.create({
                domain: 'User',
                type: 'updateError',
                message: eitherName.error.message,
            })

        const now = new Date()

        this.husbandName = eitherName.value
        this.updateAt = now

        return Right.create(undefined)
    }

    changeWifeName(newWifeName: string): Either<IUserError, undefined> {
        const eitherName = Name.create(newWifeName)

        if (eitherName.isLeft())
            return Left.create({
                domain: 'User',
                type: 'updateError',
                message: eitherName.error.message,
            })

        const now = new Date()

        this.wifeName = eitherName.value
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
            husbandName: this.husbandName.serialize(),
            wifeName: this.wifeName.serialize(),
            email: this.email.serialize(),
            password: this.password.serialize(),
            createAt: this.createAt,
            updateAt: this.updateAt,
        }
    }
}
