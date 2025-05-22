export class Password {
    public readonly value: string

    constructor(value: string) {
        if (!this.isValidPassword(value)) {
            throw new Error('Senha inválida')
        }

        this.value = value
    }

    private isValidPassword(value: string) {
        const strongPasswordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/
        return strongPasswordRegex.test(value)
    }
}
