import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('gift', (table) => {
        table
            .foreign('userId')
            .references('id')
            .inTable('user')
            .withKeyName('fk_user_gift')
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('gift', (table) => {
        table.dropForeign('userId', 'fk_user_gift')
    })
}
