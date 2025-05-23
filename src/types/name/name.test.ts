import { Name } from './index'

describe('it should verify name type', () => {
    test('if "Raissa Marques" is a valid name', () => {
        const nameTest = new Name('Raissa Marques')
        expect(nameTest.value).toBe('Raissa Marques')
    })

    test('if change Name creating a new instance', () => {
        let NameTest = new Name('Raissa Marques')
        NameTest = new Name('Alefe Cruz')
        expect(NameTest.value).toBe('Alefe Cruz')
    })

    test('if "R" is not a valid name (too short)', () => {
        expect(() => new Name('R')).toThrow()
    })

    test('if "Ra1ssa" is not a valid name (contains number)', () => {
        expect(() => new Name('Ra1ssa')).toThrow()
    })

    test('if "Ra!ssa" is not a valid name (contains special character)', () => {
        expect(() => new Name('Ra!ssa')).toThrow()
    })
})
