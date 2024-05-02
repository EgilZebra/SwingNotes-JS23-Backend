import Datastore from 'nedb'

export const Notes: Datastore = new Datastore ({
    filename: './notes.db',
    autoload: true
})

export const Users: Datastore = new Datastore({
    filename: './data/databases/users.db',
    autoload: true
})

