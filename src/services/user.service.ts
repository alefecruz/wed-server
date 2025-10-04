import { User, IUserCreate, IUserError } from '@/entities'
import { Repository } from '@/repositories/in-memory'

export class UserService {
    static async create(
        userRequestCreate: IUserCreate,
    ): Promise<User | IUserError> {
        const userEither = User.create(userRequestCreate)

        if (userEither.isLeft()) return userEither.error

        const user = userEither.value

        const { userRepository } = Repository.create()

        const userExists = await userRepository.getByEmail(
            user.serialize().email,
        )

        console.log('User exists:', userExists)

        if (userExists) {
            return {
                domain: 'User',
                type: 'createError',
                message: 'User already exists',
            }
        }

        await userRepository.create(user)

        return user
    }

    static async list() {
        const { userRepository } = Repository.create()

        const userList = await userRepository.list()

        return userList
    }
}
