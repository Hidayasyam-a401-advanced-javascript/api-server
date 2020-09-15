'use strict';

const schema = require('./categories-schema');
const model = require('../mongo');

class Categories extends Model {
    constructor() {
        super(schema);
    }
   
}

module.exports = new Categories();