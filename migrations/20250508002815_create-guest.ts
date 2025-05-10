import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('guest', (table) => {
        table.increments()
        table.integer('userId')
        table.string('name')
        table.boolean('sendInvite')
        table.boolean('attendanceConfirmation')
        table.datetime('createAt')
        table.datetime('updateAt')
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('guest')
}
