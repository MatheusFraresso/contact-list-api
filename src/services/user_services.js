const mongo = require("./_access");
const { ObjectId } = require("mongodb");

const DB = "contact-list";
const COLLECTION = "users";

/**
 *
 * @param {*} user
 * @returns
 */
async function create(user) {
  const db = await mongo.connect();

  const document = await db.db(DB).collection(COLLECTION).insertOne(user);

  return document;
}

/**
 *
 *
 * @param {*} user
 * @return {*}
 */
const edit = async (params, user) => {
  const db = await mongo.connect();

  //removes keys with undefined value
  Object.keys(user).forEach((key) => user[key] ?? delete user[key]);

  const document = await db
    .db(DB)
    .collection(COLLECTION)
    .updateOne({ _id: ObjectId(params.id) }, { $set: user });

  return document;
};

/**
 *
 * @param {*} id
 * @returns
 */
async function getById(id) {
  const db = await mongo.connect();

  const document = await db
    .db(DB)
    .collection(COLLECTION)
    .findOne({ _id: ObjectId(id) });

  return document;
}

/**
 *
 * @param {*} id
 */
async function remove(id) {
  const db = await mongo.connect();
  const document = await db
    .db(DB)
    .collection(COLLECTION)
    .deleteOne({ _id: ObjectId(id) });

  return document;
}

/**
 *
 * @param {*} id
 * @returns
 */
async function getAll(id) {
  const db = await mongo.connect();

  const document = await db.db(DB).collection(COLLECTION).find({}).toArray();

  return document;
}

module.exports = {
  create,
  edit,
  getById,
  remove,
  getAll,
};
