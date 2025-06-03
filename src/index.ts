// import dbConfig from './config/db-config'
import { User } from './entities/user'

const alefeUserEither = User.create({
    email: 'alefe@dev.com',
    name: 'Álefe Cruz',
    password: '12912923Saa#22',
})

// if (alefeUserEither.isLeft()) console.log(alefeUserEither.error)

if (alefeUserEither.isRight()) {
    const alefeUser = alefeUserEither.value

    console.log(alefeUser.get())
}
