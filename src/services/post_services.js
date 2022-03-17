const mongo = require('./_access')
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');

/**
 * 
 * @param {*} post 
 * @returns 
 */
async function create (post) {

    const db = await mongo.connect()
    let document = {}
    try {

         document = await db
            .db('simple-node-application')
            .collection('posts')
            .insertOne(post)
    }
    catch (err) {

        console.error(err)
    }
    return getById(document.insertedId.toString());
}

/**
 * 
 * @param {*} post 
 * @returns 
 */
async function update (post) {

    const db = await mongo.connect()
    let document = {}
    try {

         document = await db
            .db('simple-node-application')
            .collection('posts')
            .replaceOne({_id : post._id}, post )
    }
    catch (err) {
        console.error(err)
    }
    return document
}
/**
 * 
 * @param {*} post 
 * @returns 
 */
 async function remove (id) {
    const db = await mongo.connect()
    try {
        await db
            .db('simple-node-application')
            .collection('posts')
            .deleteOne({ _id:id })
    }
    catch (err) {
        console.error(err)
    }
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
        .collection('posts')
        .findOne({_id: ObjectId(id)})

        delete document.password
    return document
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
 async function  getAll () {
    const db = await mongo.connect()
    const document = await db
        .db('simple-node-application')
        .collection('posts')
        .find({})
        .toArray()
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

/**
 * 
 * @param {*} email 
 * @param {*} id 
 */
async function checkUserOwner(email,id){
    const db = await mongo.connect()
    const document = await db
        .db('simple-node-application')
        .collection('posts')
        .findOne({_id:id,user_email: email})
    return document
}

module.exports= {
    create,
    update,
    remove,
    getById,
    getAll,
    getByEmail,
    checkUserOwner

}