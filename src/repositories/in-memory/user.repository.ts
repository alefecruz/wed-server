import { User } from '@/entities'
import { IUserRepository } from '../user'

export class InMemoryUserRepository implements IUserRepository {
    private database: User[]

    constructor() {
        this.database = []
    }

    async create(user: User): Promise<User['id']> {
        await this.database.push(user)
        const id = this.database.length - 1
        return id
    }

    async getByEmail(email: string): Promise<User | null> {
        const user = await this.database.find(
            (user) => user.serialize().email === email,
        )
        return user || null
    }

    async getByID(userId: number): Promise<User | null> {
        const user = await this.database[userId]
        return user || null
    }

    async list(): Promise<User[] | []> {
        return await this.database
    }
}
