import { User } from '@/entities'
import { IUserRepository } from '../user'

export class InMemoryUserRepository implements IUserRepository {
    private database: User[]
    constructor() {
        this.database = []
    }

    async create(user: User): Promise<User['id']> {
        const newUser = user.serialize()
        await this.database
        return newUser.id
    }

    async getByEmail(email: string): Promise<User | null> {
        const user = this.database.find(
            (user) => user.serialize().email === email,
        )
        return user || null
    }

    async getByID(userId: number): Promise<User | null> {
        const user = this.database.find(
            (user) => user.serialize().id === userId,
        )
        return user || null
    }

    async list(): Promise<User[] | []> {
        return await this.database
    }
}
