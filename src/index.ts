import { User } from './entities/user'

const userAlefeEither = User.create({
    name: 'Álefe Cruz',
    password: 'S3nh@F0rt3',
    email: '%@devot.com.br',
})

const result = userAlefeEither.isRight()
    ? userAlefeEither.value.serialize()
    : userAlefeEither.error

console.log(result)
