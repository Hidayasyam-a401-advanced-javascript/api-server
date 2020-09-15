'use strict'
const schema = require('./products-schema');
const model = require('../mongo.js');

class Products extends Model {
    constructor() {
        super(schema);
    }
   
}

module.exports = new Products();
