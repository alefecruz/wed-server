import { URL } from '@/types'

describe('it should verify URL type', () => {
    test('it should create a URL type valid with http', () => {
        const urlEither = URL.create('http://www.google.com.br')
        expect(urlEither.isRight()).toBe(true)
    })

    test('it should create a URL type valid with https', () => {
        const urlEither = URL.create('https://www.google.com.br')
        expect(urlEither.isRight()).toBe(true)
    })

    test('invalid: url is empty', () => {
        const urlEither = URL.create('')
        expect(urlEither.isLeft()).toBe(true)
    })

    test('invalid: url is equal www.google.com', () => {
        const urlEither = URL.create('www.google.com')
        expect(urlEither.isLeft()).toBe(true)
    })

    test('it shoult verify if serialize url', () => {
        const urlEither = URL.create('https://www.google.com.br')
        const url = urlEither.isRight() ? urlEither.value : null

        expect(url?.serialize()).toBe('https://www.google.com.br')
    })
})
