import { User } from './index'

describe('it should verify user entity', () => {
    test('if user is valid when create', () => {
        const userDev = User.create({
            email: 'user@dev.com',
            name: 'User Dev',
            password: 'Us3r_D3v',
        })

        expect(userDev.isRight()).toBe(true)
    })

    test('if user is valid when load', () => {
        const now = new Date()
        const userDev = User.load({
            id: 1,
            email: 'user@dev.com',
            name: 'User Dev',
            password: 'Us3r_D3v',
            createAt: now,
            updateAt: now,
        })

        expect(userDev.isRight()).toBe(true)
    })

    test('if user with email: dev@test.a is not a valid user', () => {
        const userDev = User.create({
            email: 'dev@test.a',
            name: 'User Dev',
            password: 'Us3r_D3v',
        })
        expect(userDev.isLeft()).toBe(true)
    })

    test('if user with name: user is not a valid user', () => {
        const userDev = User.create({
            email: 'dev@test.a',
            name: 'user',
            password: 'Us3r_D3v',
        })
        expect(userDev.isLeft()).toBe(true)
    })

    test('if user with password: 123456 is not a valid user', () => {
        const userDev = User.create({
            email: 'dev@test.a',
            name: 'User dev',
            password: '123456',
        })
        expect(userDev.isLeft()).toBe(true)
    })

    test('if user without password is not a valid user', () => {
        const userDev = User.create({
            email: 'dev@test.a',
            name: 'User dev',
            // @ts-expect-error test
            password: null,
        })
        expect(userDev.isLeft()).toBe(true)
    })
})
