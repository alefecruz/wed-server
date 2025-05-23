export class Left<T> {
    readonly error: T
    private constructor(error: T) {
        this.error = error
    }

    isLeft(): this is Left<T> {
        return true
    }

    isRight(): this is Right<never> {
        return false
    }

    static create<U>(value: U): Left<U> {
        return new Left(value)
    }
}

export class Right<T> {
    readonly value: T
    private constructor(value: T) {
        this.value = value
    }

    isRight(): this is Right<T> {
        return true
    }

    isLeft(): this is Left<never> {
        return false
    }

    static create<U>(value: U): Right<U> {
        return new Right(value)
    }
}

export type Either<T, U> = Left<T> | Right<U>
