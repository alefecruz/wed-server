import { Name } from '@/types'
import { Either, IError, Left, Right } from '@/utils'

type IGuestCreate = {
    userId: number
    name: string
}

type IGuestLoad = {
    id: number
    userId: number
    name: string
    sendInvite: boolean
    attendanceConfirmation: boolean
    createAt: Date
    updateAt: Date
}

type IGuestOutput = {
    id: number | null
    userId: number
    name: string
    sendInvite: boolean
    attendanceConfirmation: boolean
    createAt: Date
    updateAt: Date
}

type IGuestError = IError<'Guest', 'createError' | 'loadError' | 'updateError'>

export class Guest {
    private constructor(
        private readonly id: number | null,
        private userId: number,
        private name: Name,
        private sendInvite: boolean,
        private attendanceConfirmation: boolean,
        private readonly createAt: Date,
        private updateAt: Date,
    ) {}

    static create(props: IGuestCreate): Either<IGuestError, Guest> {
        const { userId, name } = props

        const eitherName = Name.create(name)

        if (eitherName.isLeft())
            return Left.create({
                domain: 'Guest',
                type: 'createError',
                message: eitherName.error.message,
            })

        if (!userId)
            return Left.create({
                domain: 'Guest',
                type: 'createError',
                message: `Guest field userId is required.`,
            })

        const now = new Date()

        return Right.create(
            new Guest(null, userId, eitherName.value, false, false, now, now),
        )
    }

    static load(props: IGuestLoad): Either<IGuestError, Guest> {
        const {
            id,
            userId,
            name,
            sendInvite,
            attendanceConfirmation,
            createAt,
            updateAt,
        } = props

        const eitherName = Name.create(name)

        if (eitherName.isLeft())
            return Left.create({
                domain: 'Guest',
                type: 'loadError',
                message: eitherName.error.message,
            })

        const mandatoryFields = [
            'id',
            'userId',
            'sendInvite',
            'attendanceConfirmation',
            'createAt',
            'updateAt',
        ]

        for (const field of mandatoryFields) {
            if (!props[field as keyof IGuestLoad]) {
                return Left.create({
                    domain: 'Guest',
                    type: 'loadError',
                    message: `User field ${field} is required.`,
                })
            }
        }

        return Right.create(
            new Guest(
                id,
                userId,
                eitherName.value,
                sendInvite,
                attendanceConfirmation,
                createAt,
                updateAt,
            ),
        )
    }

    changeName(newName: string): Either<IGuestError, undefined> {
        const eitherName = Name.create(newName)

        if (eitherName.isLeft())
            return Left.create({
                domain: 'Guest',
                type: 'updateError',
                message: eitherName.error.message,
            })

        this.name = eitherName.value
        this.updateAt = new Date()

        return Right.create(undefined)
    }

    changeSendInvite(
        newSendInvite: Guest['sendInvite'],
    ): Either<IGuestError, undefined> {
        if (!newSendInvite)
            return Left.create({
                domain: 'Guest',
                type: 'updateError',
                message: `Guest field sendInvite is required.`,
            })

        if (this.sendInvite !== newSendInvite) {
            this.sendInvite = newSendInvite
            this.updateAt = new Date()
        }

        return Right.create(undefined)
    }

    changeAttendenceConfimation(
        newAttendanceConfirmation: Guest['attendanceConfirmation'],
    ): Either<IGuestError, undefined> {
        if (!newAttendanceConfirmation)
            return Left.create({
                domain: 'Guest',
                type: 'updateError',
                message: `Guest field attendanceConfirmation is required.`,
            })

        if (this.attendanceConfirmation !== newAttendanceConfirmation) {
            this.attendanceConfirmation = newAttendanceConfirmation
            this.updateAt = new Date()
        }

        return Right.create(undefined)
    }

    serialize(): IGuestOutput {
        return {
            id: this.id,
            userId: this.userId,
            name: this.name.serialize(),
            sendInvite: this.sendInvite,
            attendanceConfirmation: this.attendanceConfirmation,
            createAt: this.createAt,
            updateAt: this.updateAt,
        }
    }
}
