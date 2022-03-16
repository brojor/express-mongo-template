const { MongoClient } = require('mongodb');
require('dotenv').config({ path: './config/.env' });

const env = process.env.NODE_ENV;
const mongoURL =
  env === 'development' || env === 'test'
    ? process.env.MONGO_URI_LOCAL
    : process.env.MONGO_URI_ATLAS;

let _db;

module.exports = {
  initDb(callback) {
    if (_db) {
      console.log('Database is already initialized!');
      return callback(null, _db);
    }
    MongoClient.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .then((client) => {
        _db = client.db('db_name');
        callback(null, _db);
      })
      .catch((err) => {
        callback(err);
      });
  },
  getDb() {
    if (!_db) {
      throw Error('Database not initialized');
    }
    return _db;
  },
};
