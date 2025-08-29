import { PRICE_CURRENCY, IConstPriceCurrenyKeys } from '@/const'
import { Left, IError, Either, Right } from '@/utils'

type IPriceError = IError<'Type Price', 'createType'>

export class Price {
    private constructor(private readonly price: string) {}

    private static applyCurrency(
        value: number,
        currencyType: IConstPriceCurrenyKeys,
    ) {
        return new Intl.NumberFormat(
            currencyType,
            PRICE_CURRENCY[currencyType],
        ).format(value)
    }

    static create(
        value: number,
        currencyType: IConstPriceCurrenyKeys = 'pt-BR',
    ): Either<IPriceError, Price> {
        if (!value) {
            return Left.create({
                domain: 'Type Price',
                type: 'createType',
                message: 'Price empty is not valid.',
            })
        }

        if (value <= 0) {
            return Left.create({
                domain: 'Type Price',
                type: 'createType',
                message: `Price ${value} can not be less than or equal to zero.`,
            })
        }

        const currency = this.applyCurrency(value, currencyType)

        return Right.create(new Price(currency))
    }

    serialize() {
        return this.price
    }
}
