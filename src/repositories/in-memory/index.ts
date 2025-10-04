import { InMemoryUserRepository } from './user.repository'
// import { InMemoryGiftRepository } from './gift.repository'
// import { InMemoryGuestRepository } from './guest.repository'

type IRepository = {
    userRepository: InMemoryUserRepository
    giftRepository: null
    guestRepository: null
}

export class Repository {
    private static instance: IRepository

    static create(): IRepository {
        if (!Repository.instance) {
            Repository.instance = {
                userRepository: new InMemoryUserRepository(),
                giftRepository: null,
                guestRepository: null,
            }
        }

        return Repository.instance
    }
}
