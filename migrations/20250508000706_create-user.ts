import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('user', (table) => {
        table.increments()
        table.string('husbandName').notNullable()
        table.string('wifeName').notNullable()
        table.string('email').unique().notNullable()
        table.string('password').notNullable()
        table.datetime('createAt')
        table.datetime('updateAt')
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('user')
}
