import { User } from './index'

const now = new Date()
describe('it should verify user entity when created', () => {
    test('if user is valid', () => {
        const userDevEither = User.create({
            email: 'user@dev.com',
            husbandName: 'Marido Dev',
            wifeName: 'Mulher Dev',
            password: 'Us3r_D3v',
        })

        if (userDevEither.isLeft()) {
            throw new Error(
                `Error loading user: ${userDevEither.error.message}`,
            )
        }

        expect(userDevEither.isRight()).toBe(true)

        const userDev = userDevEither.value

        expect(userDev).toBeInstanceOf(User)

        const {
            id,
            email,
            husbandName,
            wifeName,
            // password,
            createAt,
            updateAt,
        } = userDev.serialize()

        expect(id).toBeNull()
        expect(email).toBe('user@dev.com')
        expect(husbandName).toBe('Marido Dev')
        expect(wifeName).toBe('Mulher Dev')
        // TODO - Quando aplicarmos criptografia
        // expect(password).toBe('Marido123')
        expect(createAt).toBeInstanceOf(Date)
        expect(updateAt).toBeInstanceOf(Date)
    })
    test('if user with email: dev@test.a is not a valid user', () => {
        const userDev = User.create({
            email: 'dev@test.a',
            husbandName: 'Marido Dev',
            wifeName: 'Mulher Dev',
            password: 'Us3r_D3v',
        })
        expect(userDev.isLeft()).toBe(true)
    })

    test('if user with husbandName invalid is not a valid user', () => {
        const userDev = User.create({
            email: 'dev@test.com',
            husbandName: '',
            wifeName: 'Mulher Dev',
            password: 'Us3r_D3v',
        })
        expect(userDev.isLeft()).toBe(true)
    })

    test('if user with wifeName invalid is not a valid user', () => {
        const userDev = User.create({
            email: 'dev@test.com',
            husbandName: 'Marido Dev',
            wifeName: '',
            password: 'Us3r_D3v',
        })
        expect(userDev.isLeft()).toBe(true)
    })

    test('if user with password: 123456 is not a valid user', () => {
        const userDev = User.create({
            email: 'dev@test.a',
            husbandName: 'Marido Dev',
            wifeName: 'Mulher Dev',
            password: '123456',
        })
        expect(userDev.isLeft()).toBe(true)
    })

    test('if user without password is not a valid user', () => {
        const userDev = User.create({
            email: 'dev@test.a',
            husbandName: 'Marido Dev',
            wifeName: 'Mulher Dev',
            // @ts-expect-error test
            password: null,
        })
        expect(userDev.isLeft()).toBe(true)
    })
})

describe('it should verify user entity when loaded', () => {
    test('if user is valid when load', () => {
        const userDevEither = User.load({
            id: 1,
            email: 'user@dev.com',
            husbandName: 'Marido Dev',
            wifeName: 'Mulher Dev',
            password: 'Us3r_D3v',
            createAt: now,
            updateAt: now,
        })

        if (userDevEither.isLeft()) {
            throw new Error(
                `Error loading user: ${userDevEither.error.message}`,
            )
        }

        expect(userDevEither.isRight()).toBe(true)

        const userDev = userDevEither.value

        expect(userDev).toBeInstanceOf(User)

        const {
            id,
            email,
            husbandName,
            wifeName,
            password,
            createAt,
            updateAt,
        } = userDev.serialize()

        expect(id).toBe(1)
        expect(email).toBe('user@dev.com')
        expect(husbandName).toBe('Marido Dev')
        expect(wifeName).toBe('Mulher Dev')
        expect(password).toBe('Us3r_D3v')
        expect(createAt).toBeInstanceOf(Date)
        expect(updateAt).toBeInstanceOf(Date)
    })

    test('if load user without id is not a valid', () => {
        const now = new Date()
        const userDev = User.load({
            // @ts-expect-error test
            id: null,
            email: 'dev@test.a',
            husbandName: 'Marido Dev',
            wifeName: 'Mulher Dev',
            password: 'S3nh@F0rt3',
            createAt: now,
            updateAt: now,
        })
        expect(userDev.isLeft()).toBe(true)
    })

    test('if load user with husbandName invalid is not a valid', () => {
        const now = new Date()
        const userDev = User.load({
            id: 1,
            email: 'dev@test.com',
            husbandName: '',
            wifeName: 'Mulher Dev',
            password: 'Us3r_D3v',
            createAt: now,
            updateAt: now,
        })
        expect(userDev.isLeft()).toBe(true)
    })
})

describe('it should verify user entity when changed', () => {
    test('if user is valid when email is chenged', () => {
        const userDevEither = User.create({
            email: 'user@dev.com',
            husbandName: 'Marido Dev',
            wifeName: 'Mulher Dev',
            password: 'Us3r_D3v',
        })

        if (userDevEither.isLeft())
            return expect(userDevEither.isLeft()).not.toBe(true)

        const userDev = userDevEither.value
        const newEmail = 'user@dev.com.br'

        const eitherChanged = userDev.changeEmail(newEmail)

        expect(eitherChanged.isRight()).toBe(true)

        const { email } = userDev.serialize()

        expect(email).toBe(newEmail)
    })

    test('if the email exchange is invalid if the new email is invalid', () => {
        const userDevEither = User.create({
            email: 'user@dev.com',
            husbandName: 'Marido Dev',
            wifeName: 'Mulher Dev',
            password: 'Us3r_D3v',
        })

        if (userDevEither.isLeft())
            return expect(userDevEither.isLeft()).not.toBe(true)

        const userDev = userDevEither.value
        const newEmail = 'userdev.com.br'

        const eitherChanged = userDev.changeEmail(newEmail)

        expect(eitherChanged.isLeft()).toBe(true)
    })
})
