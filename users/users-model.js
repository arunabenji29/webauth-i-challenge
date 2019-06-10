const db = require('../database/dbConfig.js')

module.exports = {
    find,
    findBy,
    add,
    findById
}

function find(){
    return db('users')
}

function findBy(search){
    return db('users')
        .where(search)
}

function add(user){
    return db('users')
    .insert(user,'id')
    .then(insertedUser => {
        const [userObj] = insertedUser;
        return findById(userObj)
    });
}

function findById(userObj){
    return db('users')
    .where({id})
    .first();
}
