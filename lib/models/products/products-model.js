'use strict'
const schema = require('./products-schema');
const model = require('../mongo.js');

class Products extends model {
    constructor() {
        super(schema);
    }
   
}

module.exports = new Products();
