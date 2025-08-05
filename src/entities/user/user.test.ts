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
                `Error creating user: ${userDevEither.error.message}`,
            )
        }

        const userDev = userDevEither.value
        const {
            id,
            email,
            husbandName,
            wifeName,
            password,
            createAt,
            updateAt,
        } = userDev.serialize()

        expect(userDevEither.isRight()).toBe(true)
        expect(id).toBeNull()
        expect(email).toBe('user@dev.com')
        expect(husbandName).toBe('Marido Dev')
        expect(wifeName).toBe('Mulher Dev')
        expect(password).toBe('Us3r_D3v')
        expect(createAt).toBeInstanceOf(Date)
        expect(updateAt).toBeInstanceOf(Date)
    })

    test('if invalid fields return errors', () => {
        const invalidCases = [
            {
                email: 'dev@test.a',
                husbandName: 'Marido Dev',
                wifeName: 'Mulher Dev',
                password: 'Us3r_D3v',
            },
            {
                email: 'dev@test.com',
                husbandName: '',
                wifeName: 'Mulher Dev',
                password: 'Us3r_D3v',
            },
            {
                email: 'dev@test.com',
                husbandName: 'Marido Dev',
                wifeName: '',
                password: 'Us3r_D3v',
            },
            {
                email: 'dev@test.com',
                husbandName: 'Marido Dev',
                wifeName: 'Mulher Dev',
                password: '123456',
            },
            {
                email: 'dev@test.a',
                husbandName: 'Marido Dev',
                wifeName: 'Mulher Dev',
                password: '',
            },
        ]

        for (const input of invalidCases) {
            const userDev = User.create(input)
            expect(userDev.isLeft()).toBe(true)
        }
    })
})

describe('it should verify user entity when loaded', () => {
    test('if user is valid when load', () => {
        const userDev = User.load({
            id: 1,
            email: 'user@dev.com',
            husbandName: 'Marido Dev',
            wifeName: 'Mulher Dev',
            password: 'Us3r_D3v',
            createAt: now,
            updateAt: now,
        })

        if (userDev.isLeft()) {
            throw new Error(`Error loading user: ${userDev.error.message}`)
        }

        const user = userDev.value
        const {
            id,
            email,
            husbandName,
            wifeName,
            password,
            createAt,
            updateAt,
        } = user.serialize()

        expect(userDev.isRight()).toBe(true)
        expect(id).toBe(1)
        expect(email).toBe('user@dev.com')
        expect(husbandName).toBe('Marido Dev')
        expect(wifeName).toBe('Mulher Dev')
        expect(password).toBe('Us3r_D3v')
        expect(createAt).toBeInstanceOf(Date)
        expect(updateAt).toBeInstanceOf(Date)
    })

    test('if invalid fields return errors on load', () => {
        const invalidCases = [
            {
                id: -1,
                email: 'dev@test.a',
                husbandName: 'Marido Dev',
                wifeName: 'Mulher Dev',
                password: 'S3nh@F0rt3',
                createAt: now,
                updateAt: now,
            },
            {
                id: 1,
                email: 'dev@test.com',
                husbandName: '',
                wifeName: 'Mulher Dev',
                password: 'Us3r_D3v',
                createAt: now,
                updateAt: now,
            },
        ]

        for (const input of invalidCases) {
            const userDev = User.load(input)
            expect(userDev.isLeft()).toBe(true)
        }
    })
})

describe('it should verify user entity when changed', () => {
    test('if user is valid when email is changed', () => {
        const userDevEither = User.create({
            email: 'user@dev.com',
            husbandName: 'Marido Dev',
            wifeName: 'Mulher Dev',
            password: 'Us3r_D3v',
        })

        if (userDevEither.isLeft())
            throw new Error(
                `Error creating user: ${userDevEither.error.message}`,
            )

        const userDev = userDevEither.value
        const newEmail = 'user@dev.com.br'

        const eitherChanged = userDev.changeEmail(newEmail)
        const { email } = userDev.serialize()

        expect(email).toBe(newEmail)
        expect(eitherChanged.isRight()).toBe(true)
    })

    test('if email is invalid when changed', () => {
        const userDevEither = User.create({
            email: 'user@dev.com',
            husbandName: 'Marido Dev',
            wifeName: 'Mulher Dev',
            password: 'Us3r_D3v',
        })

        if (userDevEither.isLeft())
            throw new Error(
                `Error creating user: ${userDevEither.error.message}`,
            )

        const userDev = userDevEither.value
        const newEmail = 'userdev.com.br'

        const eitherChanged = userDev.changeEmail(newEmail)
        expect(eitherChanged.isLeft()).toBe(true)
    })
})
