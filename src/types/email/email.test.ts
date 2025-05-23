import { Email } from './index'

describe('it should verify email type', () => {
    test('if dev@test.com is valid email', () => {
        const emailTest = Email.create('dev@test.com')

        expect(emailTest.isRight()).toBe(true)
    })

    test('if change email creating a new instance', () => {
        let emailEither = Email.create('dev@test.com')
        emailEither = Email.create('Raissa@gmail.com')

        if (emailEither.isRight()) {
            expect(emailEither.value.prop).toBe('Raissa@gmail.com')
        }
    })

    test('if dev@test.a is not a valid email', () => {
        const emailEither = Email.create('dev@test.a')
        expect(emailEither.isLeft()).toBe(true)
    })

    test('if dev!@test.com is not a valid email', () => {
        const emailEither = Email.create('dev!@test.a')
        expect(emailEither.isLeft()).toBe(true)
    })

    test('if dev@@test.com is not a valid email', () => {
        const emailEither = Email.create('dev@@test.a')
        expect(emailEither.isLeft()).toBe(true)
    })
})
