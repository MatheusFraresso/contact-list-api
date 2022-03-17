const mongo = require('./_access')
const { ObjectId } = require('mongodb');

/**
 * 
 * @param {*} user 
 * @returns 
 */
async function create (user) {
    const db = await mongo.connect()
    let document = {}
    user.password = await bcrypt.hash(user.password,10)
    try {
         document = await db
            .db('simple-node-application')
            .collection('users')
            .insertOne(user)
    }
    catch (err) {
        console.error(err)
    }
    return getById(document.insertedId.toString());
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
async function  getById (id) {
    const db = await mongo.connect()
    const document = await db
        .db('simple-node-application')
        .collection('users')
        .findOne({_id: ObjectId(id)})
        delete document.password
    return document
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
async function  getByEmail (email) {
    const db = await mongo.connect()
    const document = await db
        .db('simple-node-application')
        .collection('users')
        .findOne({email: email})
    return document
}

module.exports= {
    create,
    getById,
    getByEmail

}