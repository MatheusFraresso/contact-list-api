const mongo = require('./_access')
const { ObjectId } = require('mongodb');

const DB = 'contact-list'
const COLLECTION = 'users'

/**
 * 
 * @param {*} user 
 * @returns 
 */
async function create (user) {
    const db = await mongo.connect();

    const document = await db
        .db(DB)
        .collection(COLLECTION)
        .insertOne(user);
    
    return document;

}

/**
 *
 *
 * @param {*} user
 * @return {*} 
 */
const update = async (user)=>{
    const db = await mongo.connect();

    const document = await db
        .db(DB)
        .collection(COLLECTION)
        .replaceOne({_id : user._id}, user );

    return document;
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
async function  getById (id) {
    const db = await mongo.connect();

    const document = await db
        .db(DB)
        .collection(COLLECTION)
        .findOne({_id: ObjectId(id)});

    return document;
}
        
   

/**
 * 
 * @param {*} id 
 */
 async function remove (id) {
    const db = await mongo.connect();

    const document = await db
        .db(DB)
        .collection(COLLECTION)
        .deleteOne({ _id:id })

    return document;
 
}

module.exports= {
    create,
    update,
    getById,
    remove

}