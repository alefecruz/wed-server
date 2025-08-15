import { Either, IError, Left, Right } from '../../utils'

type IURLError = IError<'type URL', 'createError'>

export class URL {
    private constructor(private url: string) {}

    private static isValidURL(url: string): boolean {
        const urlRegex = /^https?:\/\/.*/
        return urlRegex.test(url)
    }

    static create(url: string): Either<IURLError, URL> {
        if (!url) {
            return Left.create({
                domain: 'type URL',
                type: 'createError',
                message: 'URL cannot be empty.',
            })
        }

        const urlTrimmed = url.trim()

        if (!this.isValidURL(urlTrimmed)) {
            return Left.create({
                domain: 'type URL',
                type: 'createError',
                message: `${urlTrimmed} URL is not valid.`,
            })
        }

        return Right.create(new URL(urlTrimmed))
    }

    public serialize() {
        return this.url
    }
}
