import { Guest } from './entities/guest'

function test() {
    const newGuestEither = Guest.create({
        name: 'Álefe Cruz',
        userId: 2,
    })

    if (newGuestEither.isLeft()) return

    const newGuest = newGuestEither.value

    console.log('ORIGINAL CRIADO', newGuest)

    newGuest.changeAttendenceConfimation(true)
    newGuest.changeSendInvite(true)
    newGuest.changeName('Allan Paulo')

    console.log('ALTERADO', newGuest.serialize())
}

test()
