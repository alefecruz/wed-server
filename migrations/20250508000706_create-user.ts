import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('user', (table) => {
        table.increments()
        table.string('name')
        table.string('email')
        table.string('password')
        table.datetime('createAt')
        table.datetime('updateAt')
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('user')
}
