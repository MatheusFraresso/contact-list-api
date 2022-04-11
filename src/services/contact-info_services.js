const mongo = require('./_access')
const { ObjectId } = require('mongodb');

const DB = 'contact-list'
const COLLECTION = 'contact-info'

/**
 *
 *
 * @param {*} contact
 * @return {*} 
 */
const edit = async (params,contact)=>{
    const db = await mongo.connect();

    //removes keys with undefined value
    Object.keys(contact).forEach(key => contact[key]?? delete contact[key]);

    const document = await db
        .db(DB)
        .collection(COLLECTION)
        .updateOne({ _id : ObjectId( params.id ) },
                    {$set : contact });

    return document;
}

/**
 *
 *
 * @param {*} contact
 * @return {*} 
 */
async function  getById (contact) {
    const db = await mongo.connect();

    const document = await db
        .db(DB)
        .collection(COLLECTION)
        .findOne({_id: ObjectId(contact)});

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
        .deleteOne({ _id:ObjectId(id) })

    return document;
 
}

//user-contact 

/**
 *
 *
 * @param {*} contacts
 * @return {*} 
 */
 async function createMany (params, body) {
    const db = await mongo.connect();
    const contacts = body.contacts.map(contact => {
        return{...contact,
                userId: params.userId}
    });

    const document = await db
        .db(DB)
        .collection(COLLECTION)
        .insertMany(contacts);
    return document;

}

/**
 *
 *
 * @param {*} params
 * @return {*} 
 */
async function  getByUserId (params) {

    const db = await mongo.connect();
    const document = await db
        .db(DB)
        .collection(COLLECTION)
        .find({userId: params.userId})
        .toArray();
    return document;
}

module.exports= {
    edit,
    getById,
    remove,
    createMany,
    getByUserId

}