// http://knexjs.org/#Migrations-API

exports.up = (knex, Promise) => {
    return Promise.all([
        knex.schema.createTable('users', table => {
            table.increments('id').unsigned().primary();
            table.string('username');
            table.string('password');
            table.json('config');
        }),
        knex.schema.createTable('library', table => {
            table.increments('id').unsigned().primary();
            table.string('path');
            table.bigInteger('size');
            table.string('artist');
            table.string('album');
            table.integer('position');
            table.integer('year');
            table.integer('duration');
            table.integer('bitrate');
            table.boolean('vbr').defaultTo(false);
            table.timestamp('created_at').defaultTo(knex.fn.now());
        }),
        knex.schema.createTable('library_genres', table => {
            table.increments('id').unsigned().primary();
            table.integer('library_id').unsigned().references('id')
                .inTable('library').index();
            // genres are stored in lowercase separated by dashes (-)
            table.string('genre');
        }),
        knex.schema.createTable('library_listens', table => {
            table.increments('id').unsigned().primary();
            table.integer('library_id').unsigned().references('id')
                .inTable('library').index();
            table.timestamp('created_at').defaultTo(knex.fn.now());
        }),
        // results from a meta data source with information about artists
        knex.schema.createTable('data_artists', table => {
            table.increments('id').unsigned().primary();
            table.string('artist_name');
            // if the artist only has one member, members will contain their
            // "real name" (e.g. Beck -> [ "Beck Hansen" ]
            table.json('members');
            table.json('websites');
            // biography/description
            table.text('profile');
        }),
        knex.schema.createTable('data_albums', table => {
            table.increments('id').unsigned().primary();
            table.string('name');
            table.integer('track_count');
        }),
        knex.schema.createTable('data_albums_genres', table => {
            table.increments('id').unsigned().primary();
            table.integer('data_album_id').unsigned().references('id')
                .inTable('data_albums').index();
            table.string('genre');
        }),
        knex.schema.createTable('data_tracks', table => {
            table.increments('id').unsigned().primary();
        }),
        knex.schema.createTable('transfers', table => {
            table.increments('id').unsigned().primary();
            table.boolean('is_upload').defaultTo(false);
            table.string('username');
            // if download, this is the other person's path (dir + file). if
            // upload, it's ours.
            table.string('path_from');
            // if download, this is where we store the file. if upload, it's
            // null because we can't know where they put it.
            table.string('path_to');
            table.bigInteger('size');
            table.timestamp('created_at').defaultTo(knex.fn.now());
            // by storing both when we started and when it finishes, we can
            // also calculate a transfer speed.
            table.timestamp('finished_at').defaultTo(knex.fn.now());
        }),
        // this stores message history for chatrooms and private messages
        knex.schema.createTable('messages', table => {
            table.increments('id').unsigned().primary();
            // our username if this is a private message, room message username
            // author otherwise (which could also be us if we spoke in chatroom)
            table.string('from').index();
            // room if this is chatroom message, username if it's a private
            // message
            table.string('to').index();
            table.text('message');
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
    ]);
};

exports.down = (knex, Promise) => {
    return Promise.all([
        'library', 'library_genres', 'library_listens', 'data_artists',
        'data_albums', 'data_albums_genres', 'data_tracks', 'transfers',
        'messages',
    ].map(table => knex.schema.dropTableIfExists(table)));
};
