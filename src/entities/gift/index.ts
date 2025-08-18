import { getFirstError, IError, Left, Either, Right } from '../../utils'
import { Price, URL } from '../../types'

type IGiftCreate = {
    name: string
    description: string | null
    price: number
    userId: number
    guestId: number
    urlPixCopyPaste: string
    urlPixQRCode: string
    urlImage: string
}

type IGiftLoad = {
    id: number
    name: string
    description: string | null
    price: number
    userId: number
    guestId: number
    urlPixCopyPaste: string
    urlPixQRCode: string
    urlImage: string
    createAt: Date
    updateAt: Date
}

type IGiftError = IError<'Gift', 'createError' | 'loadError' | 'updateError'>

export class Gift {
    private constructor(
        private readonly id: number | null,
        private name: string,
        private description: string | null,
        private price: Price,
        private userId: number,
        private guestId: number,
        private urlPixCopyPaste: URL,
        private urlPixQRCode: URL,
        private urlImage: URL,
        private readonly createAt: Date,
        private updateAt: Date,
    ) {}

    public static create({
        name,
        description,
        userId,
        guestId,
        price,
        urlImage,
        urlPixCopyPaste,
        urlPixQRCode,
    }: IGiftCreate): Either<IGiftError, Gift> {
        const priceEither = Price.create(price)
        const urlPixCopyPasteEither = URL.create(urlPixCopyPaste)
        const urlPixQRCodeEither = URL.create(urlPixQRCode)
        const urlImageEither = URL.create(urlImage)

        if (
            priceEither.isLeft() ||
            urlPixCopyPasteEither.isLeft() ||
            urlPixQRCodeEither.isLeft() ||
            urlImageEither.isLeft()
        ) {
            return Left.create({
                domain: 'Gift',
                type: 'createError',
                message: getFirstError(
                    priceEither,
                    urlPixCopyPasteEither,
                    urlPixQRCodeEither,
                    urlImageEither,
                ),
            })
        }

        const missingField = this.validateRequiredFields({
            name,
            userId,
            guestId,
        })

        if (missingField) {
            return Left.create({
                domain: 'Gift',
                type: 'createError',
                message: `Gift field ${missingField} is required.`,
            })
        }

        return Right.create(
            new Gift(
                null,
                name,
                description,
                priceEither.value,
                userId,
                guestId,
                urlPixCopyPasteEither.value,
                urlPixQRCodeEither.value,
                urlImageEither.value,
                new Date(),
                new Date(),
            ),
        )
    }

    static load(props: IGiftLoad): Either<IGiftError, Gift> {
        const {
            id,
            name,
            description,
            userId,
            guestId,
            price,
            urlImage,
            urlPixCopyPaste,
            urlPixQRCode,
            createAt,
            updateAt,
        } = props

        const eitherPrice = Price.create(price)
        const eitherUrlImage = URL.create(urlImage)
        const eitherUrlPixCopyPaste = URL.create(urlPixCopyPaste)
        const eitherUrlPixQRCode = URL.create(urlPixQRCode)

        if (
            eitherPrice.isLeft() ||
            eitherUrlImage.isLeft() ||
            eitherUrlPixCopyPaste.isLeft() ||
            eitherUrlPixQRCode.isLeft()
        ) {
            return Left.create({
                domain: 'Gift',
                type: 'loadError',
                message: getFirstError(
                    eitherPrice,
                    eitherUrlImage,
                    eitherUrlPixCopyPaste,
                    eitherUrlPixQRCode,
                ),
            })
        }

        return Right.create(
            new Gift(
                id,
                name,
                description,
                eitherPrice.value,
                userId,
                guestId,
                eitherUrlPixCopyPaste.value,
                eitherUrlPixQRCode.value,
                eitherUrlImage.value,
                createAt,
                updateAt,
            ),
        )
    }

    private static validateRequiredFields(fields: {
        name: string
        userId: number
        guestId: number
    }): string | null {
        const requiredFields = [
            { value: fields.name, name: 'name' },
            { value: fields.userId, name: 'userId' },
            { value: fields.guestId, name: 'guestId' },
        ]

        const missingField = requiredFields.find((field) => !field.value)
        return missingField?.name || null
    }

    public serialize() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            price: this.price.serialize(),
            userId: this.userId,
            guestId: this.guestId,
            urlPixCopyPaste: this.urlPixCopyPaste.serialize(),
            urlPixQRCode: this.urlPixQRCode.serialize(),
            urlImage: this.urlImage.serialize(),
            createAt: this.createAt,
            updateAt: this.updateAt,
        }
    }
}
