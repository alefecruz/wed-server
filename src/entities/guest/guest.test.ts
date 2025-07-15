import { Guest } from '.'

describe('it should verify guest entity when created', () => {
    test('if guest is valid', () => {
        const guestDev = Guest.create({
            userId: 1,
            name: 'Guest DEV',
        })

        expect(guestDev.isRight()).toBe(true)
    })
})
