// Nome do presente
// Descrição
// preço
// Referencia usuario
// Referencia Convidado
// Link de pagamento
// URL de pagemento
// URL Image descritiva

import { Name, Price } from '../../types'

export class Gift {
    constructor(
        private name: Name,
        private description: string,
        private price: Price,
    ) {}
}
