import { Guest } from '@/entities/guest'

const now = new Date()
describe('it should verify guest entity when created', () => {
    test('if guest is valid', () => {
        const guestDevEithet = Guest.create({
            userId: 1,
            name: 'Guest DEV',
        })

        if (guestDevEithet.isLeft()) {
            throw new Error(
                `Error creating guest: ${guestDevEithet.error.message}`,
            )
        }

        const guestDev = guestDevEithet.value

        expect(guestDevEithet.isRight()).toBe(true)
        expect(guestDev).toBeInstanceOf(Guest)
        const {
            id,
            userId,
            name,
            attendanceConfirmation,
            sendInvite,
            createAt,
            updateAt,
        } = guestDev.serialize()

        expect(id).toBeNull()
        expect(userId).toBe(1)
        expect(name).toBe('Guest DEV')
        expect(sendInvite).toBe(false)
        expect(attendanceConfirmation).toBe(false)
        expect(createAt).toBeInstanceOf(Date)
        expect(updateAt).toBeInstanceOf(Date)
    })
})

describe('it should verify guest entity when loaded', () => {
    test('if guest is valid', () => {
        const guestDevEithet = Guest.load({
            id: 999,
            userId: 2,
            name: 'Guest DEV',
            attendanceConfirmation: true,
            sendInvite: true,
            createAt: now,
            updateAt: now,
        })

        if (guestDevEithet.isLeft()) {
            throw new Error(
                `Error loading guest: ${guestDevEithet.error.message}`,
            )
        }

        const guestDev = guestDevEithet.value

        expect(guestDevEithet.isRight()).toBe(true)
        expect(guestDev).toBeInstanceOf(Guest)
        const {
            id,
            userId,
            name,
            attendanceConfirmation,
            sendInvite,
            createAt,
            updateAt,
        } = guestDev.serialize()

        expect(id).toBe(999)
        expect(userId).toBe(2)
        expect(name).toBe('Guest DEV')
        expect(sendInvite).toBe(true)
        expect(attendanceConfirmation).toBe(true)
        expect(createAt).toBeInstanceOf(Date)
        expect(updateAt).toBeInstanceOf(Date)
    })
})
