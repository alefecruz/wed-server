import { User } from '@/entities'

export interface IUserRepository {
    create(user: User): Promise<User['id']>
    getByID(userId: number): Promise<User | null>
    list(): Promise<User[] | []>
    getByEmail(email: string): Promise<User | null>
}
