import { Email, Name, Password } from '../../types'
// import { Either, Left, Right } from '../../utils'

export class User {
    private constructor(
        readonly id: number,
        readonly name: Name,
        readonly email: Email,
        readonly password: Password,
        readonly createAt: Date,
        readonly updateAt: Date,
    ) {}

    // static create(): Either<Left, Right> {
    //     return Right.create('')
    // }
}
