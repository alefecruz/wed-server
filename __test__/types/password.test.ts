import { Password } from '@/types'

describe('it should verify password type', () => {
    test('valid password: Graudo@123', () => {
        const pwd = Password.create('Graudo@123')
        expect(pwd.isRight()).toBe(true)
    })

    test('invalid: less than 8 chars', () => {
        const pwd = Password.create('Gra@1a')
        expect(pwd.isLeft()).toBe(true)
    })

    test('invalid: no uppercase letter', () => {
        const pwd = Password.create('graudo@123')
        expect(pwd.isLeft()).toBe(true)
    })

    test('invalid: no lowercase letter', () => {
        const pwd = Password.create('GRAUDO@123')
        expect(pwd.isLeft()).toBe(true)
    })

    test('invalid: no number', () => {
        const pwd = Password.create('Graudo@aaa')
        expect(pwd.isLeft()).toBe(true)
    })

    test('invalid: no special character', () => {
        const pwd = Password.create('Graudo123')
        expect(pwd.isLeft()).toBe(true)
    })
})
