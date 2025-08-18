export type IConstPriceCurrenyKeys = keyof typeof PRICE_CURRENCY
export const PRICE_CURRENCY = {
    'pt-BR': {
        style: 'currency',
        currency: 'BRL',
    },
    'de-DE': {
        style: 'currency',
        currency: 'EUR',
    },
    'ja-JP': {
        style: 'currency',
        currency: 'JPY',
    },
} as const
