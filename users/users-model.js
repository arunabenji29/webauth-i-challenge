const db = require('../database/dbConfig.js')

module.exports = {
    find,
    findBy,
    add,
    findById
}

function find() {
    return db('users')
}

function findBy(search) {
    return db('users')
        .where(search)
}

function add(user) {
    console.log('user in add ', user)
    return db('users')
        .insert(user, 'id')
        .then(ids => {
            if (ids) {
                console.log('inserted user ', ids)
                const [id] = ids;
                return findById(id)
            }
        })
        .catch(error => 
            res.status(404).json(error))
}

function findById(id) {
    return db('users')
        .where({ id })
        .first();
}
