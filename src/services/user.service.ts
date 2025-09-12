import { IUserError, User } from '@/entities'
import { IUserCreate } from '@/controllers'
import { Either, Left, Right } from '@/utils'

import { InMemoryUserRepository } from '@/repositories/in-memory/user.repository'

type IErrorCreate = IUserError

export class UserService {
    static async create(
        userRequestCreate: IUserCreate,
    ): Either<IErrorCreate, User> {
        const userEither = User.create(userRequestCreate)
        if (userEither.isLeft()) return Left.create(userEither.error)

        const user = userEither.value

        const userRepository = new InMemoryUserRepository()

        const userExists = await userRepository.getByEmail(
            user.serialize().email,
        )

        // IF exist error

        return Right.create(user)
    }
}
