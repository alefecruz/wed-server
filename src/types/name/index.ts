export class Name {
    public readonly value: string

    constructor(value: string) {
        if (!this.isValidName(value)) {
            throw new Error('Nome inválido')
        }

        this.value = value
    }

    private isValidName(value: string): boolean {
        const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,}$/
        return nameRegex.test(value.trim())
    }
}
