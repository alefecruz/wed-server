import { Price } from '.'

describe('it should verify price type', () => {
    test('it should create a price type valid', () => {
        const priceEither = Price.create(20)
        expect(priceEither.isRight()).toBe(true)
    })

    test('invalid: price is iqual 0', () => {
        const priceEither = Price.create(0)
        expect(priceEither.isLeft()).toBe(true)
    })

    test('invalid: price is less then 0 ', () => {
        const priceEither = Price.create(-200)
        expect(priceEither.isLeft()).toBe(true)
    })

    test('invalid: price is empty', () => {
        // @ts-expect-error test
        const priceEither = Price.create()
        expect(priceEither.isLeft()).toBe(true)
    })

    test('it shoult verify if serialize price is pt-BR', () => {
        const priceEither = Price.create(10)
        const price = priceEither.isRight() ? priceEither.value : null

        expect(price?.serialize()).toBe(
            new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            }).format(10),
        )
    })
})
