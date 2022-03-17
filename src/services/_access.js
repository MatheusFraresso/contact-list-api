var MongoClient = require('mongodb').MongoClient

const DB_MONGO = 'mongodb+srv://mfraresso:%2aFWkBZ9yW.6zs83@matheus-cluster.p0ffc.mongodb.net/test?authSource=admin&replicaSet=atlas-1qv5y1-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'

let connectedMongo
const connect = async () => {
  if (connectedMongo) {
    return connectedMongo
  }
  const mongoClient = new MongoClient(DB_MONGO, {
    useUnifiedTopology: true,
  })
  const connect = await mongoClient.connect()
  connectedMongo = connect
  return connect
}

module.exports = {
  connect,
}