export class Email {
    public readonly value: string

    constructor(value: string) {
        if (!this.isValidEmail(value)) {
            throw new Error('Email inválid')
        }

        this.value = value
    }

    private isValidEmail(value: string) {
        const strictEmailRegex =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        return strictEmailRegex.test(value)
    }
}
