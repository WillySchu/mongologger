'use strict';

class MongoLog {
  constructor(log, db, type) {

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

    if (typeof type === 'string') {
      this.type = type;
    } else {
      throw new TypeError(`Invalid value for type: ${type}`);
    }
  }

  save() {
    return new Promise((resolve, reject) => {
      this.db.insert(this, db.get(this.type))
        .then(log => resolve(0))
        .catch(reject);
    });
  }
}

module.exports = MongoLog;
