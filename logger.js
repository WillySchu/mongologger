'use strict';

const MongoLog = require('./log.js');

class MongoLogger {
  constructor(db) {
    if (typeof db === 'object') {
      this.db = db;
    } else {
      throw new TypeError(`Invalid argument: ${db}`)
    }
  }
}
