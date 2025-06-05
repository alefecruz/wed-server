import { Email } from './index'

describe('it should verify email type', () => {
    test('if dev@test.com is valid email', () => {
        const emailTest = Email.create('dev@test.com')

        expect(emailTest.isRight()).toBe(true)
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

    test('if create new email without email', () => {
        // @ts-expect-error test
        const emailEither = Email.create()
        expect(emailEither.isLeft()).toBe(true)
    })

    test('if email serialize is correct', () => {
        const emailEither = Email.create('user@dev.com')

        const email = emailEither.isRight() ? emailEither.value : null

        expect(email?.serialize()).toBe('user@dev.com')
    })
})
