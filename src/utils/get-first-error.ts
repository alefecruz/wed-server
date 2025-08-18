import { Either } from './either'
import { IError } from './error'

export function getFirstError(
    ...results: Either<IError<unknown, unknown>, unknown>[]
): string {
    for (const result of results) {
        if (result.isLeft()) return result.error.message
    }
    return 'Unknown error'
}
