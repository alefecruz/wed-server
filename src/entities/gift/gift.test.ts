import { Gift } from '.'

describe('it should verify Gift entity when created', () => {
    test('if gift is valid', () => {
        const gitDevEither = Gift.create({
            name: 'Panelas',
            description: 'Conjunto de panela Inox Tramontina',
            price: 400.0,
            userId: 1,
            guestId: 1,
            urlPixCopyPaste: 'http://pagemento.com',
            urlPixQRCode: 'http://pagemento-qr-code.com',
            urlImage: 'http://image-do-presente.com',
        })

        if (gitDevEither.isLeft()) {
            throw new Error(`Error loading user: ${gitDevEither.error.message}`)
        }

        expect(gitDevEither.isRight()).toBe(true)

        const gitDev = gitDevEither.value

        expect(gitDev).toBeInstanceOf(Gift)

        const {
            id,
            name,
            description,
            price,
            userId,
            guestId,
            urlPixCopyPaste,
            urlPixQRCode,
            urlImage,
            createAt,
            updateAt,
        } = gitDev.serialize()

        expect(id).toBeNull()
        expect(name).toBe('Panelas')
        expect(description).toBe('Conjunto de panela Inox Tramontina')
        expect(price).toBe(
            new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            }).format(400),
        )
        expect(userId).toBe(1)
        expect(guestId).toBe(1)
        expect(urlPixCopyPaste).toBe('http://pagemento.com')
        expect(urlPixQRCode).toBe('http://pagemento-qr-code.com')
        expect(urlImage).toBe('http://image-do-presente.com')
        expect(createAt).toBeInstanceOf(Date)
        expect(updateAt).toBeInstanceOf(Date)
    })
})
