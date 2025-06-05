import { Name } from './index'

describe('it should verify name type', () => {
    test('if "Raissa Marques" is a valid name', () => {
        const nameTest = Name.create('Raissa Marques')
        expect(nameTest.isRight()).toBe(true)
    })

    test('if "R" is not a valid name (too short)', () => {
        const nameTest = Name.create('R')
        expect(nameTest.isLeft()).toBe(true)
    })

    test('if "Ra1ssa" is not a valid name (contains number)', () => {
        const nameTest = Name.create('Ra1ssa')
        expect(nameTest.isLeft()).toBe(true)
    })

    test('if "Ra!ssa" is not a valid name (contains special character)', () => {
        const nameTest = Name.create('Ra!ssa')
        expect(nameTest.isLeft()).toBe(true)
    })
    test('if empty name is not valid', () => {
        const nameTest = Name.create('   ')
        expect(nameTest.isLeft()).toBe(true)
    })
    test('if name serialize is correct', () => {
        const nameEither = Name.create('  Raissa Marques  ')
        const name = nameEither.isRight() ? nameEither.value : null
        expect(name?.serialize()).toBe('Raissa Marques')
    })
})
