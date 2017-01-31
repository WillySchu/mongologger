'use strict';

class MongoLog {
  /**
   * Creates a MongoLog Object that takes either a string or an object.
   * If a string is provided it is put on the message property of the
   * MongoLog Object. If an object is provided each key on the object is
   * put on the MongoLog Object.
   * @param Object or String the message or key value pairs to be logged
   * @param Monk Collection Object
   * @returns MongoLog Object
   */
  constructor(log, db) {

    if (typeof log === 'object') {
      Object.keys(log).forEach(key => {
        this[key] = log[key];
      })
    } else {
      this.message = log;
    }

    if (typeof db === 'object') {
      this.db = db;
    } else {
      throw new TypeError(`Invalid value for db: ${db}`);
    }
  }

  /**
   * Saves a new MongoLog Object to mongo
   * @returns MongoLog Object
   */
  save() {
    return new Promise((resolve, reject) => {
      this.db.insert(this.getObj())
        .then(log => resolve(0))
        .catch(reject);
    });
  }

  /**
   * Creates and returns an Object Object with the same keys as the MongoLog
   * Object except with the db removed
   * @returns Object Object
   */
  getObj() {
    const obj = {};
    Object.keys(this).forEach(key => {
      if (key === 'db') return;
      obj[key] = this[key];
    })
    return obj;
  }
}

module.exports = MongoLog;
