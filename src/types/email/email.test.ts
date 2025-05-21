import { Email } from './index'

describe('it should verify email type', () => {
    test('if dev@test.com is valid email', () => {
        const emailTest = new Email('dev@test.com')
        expect(emailTest.value).toBe('dev@test.com')
    })

    test('if change email creating a new instance', () => {
        let emailTest = new Email('dev@test.com')
        emailTest = new Email('Raissa@gmail.com')
        expect(emailTest.value).toBe('Raissa@gmail.com')
    })

    test('if dev@test.a is not a valid email', () => {
        expect(() => new Email('dev@test.a')).toThrow()
    })

    test('if dev!@test.com is not a valid email', () => {
        expect(() => new Email('dev!@test.a')).toThrow()
    })

    test('if dev@@test.com is not a valid email', () => {
        expect(() => new Email('dev@@test.a')).toThrow()
    })
})
