import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('gift', (table) => {
        table.increments()
        table.integer('userId')
        table.string('name')
        table.string('description')
        table.string('linkImage')
        table.float('value')
        table.string('pixCopyPaste')
        table.string('linkQRCodePayment')
        table.datetime('createAt')
        table.datetime('updateAt')
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('gift')
}
