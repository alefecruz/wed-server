import { Password } from './index'

describe('it should verify password type', () => {
    test('valid password: Graudo@123', () => {
        const pwd = new Password('Graudo@123')
        expect(pwd.value).toBe('Graudo@123')
    })

    test('change password creating a new instance', () => {
        let pwd = new Password('Graudo@123')
        pwd = new Password('Graudo$123')
        expect(pwd.value).toBe('Graudo$123')
    })

    test('invalid: less than 8 chars', () => {
        expect(() => new Password('Gra@1a')).toThrow()
    })

    test('invalid: no uppercase letter', () => {
        expect(() => new Password('graudo@123')).toThrow()
    })

    test('invalid: no lowercase letter', () => {
        expect(() => new Password('GRAUDO@123')).toThrow()
    })

    test('invalid: no number', () => {
        expect(() => new Password('Graudo@aaa')).toThrow()
    })

    test('invalid: no special character', () => {
        expect(() => new Password('Graudo123')).toThrow()
    })
})
