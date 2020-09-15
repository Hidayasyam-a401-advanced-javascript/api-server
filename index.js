'use strict'


let server=require('./lib/server.js');
require('dotenv').config();

let PORT= process.env.PORT;

server.start(PORT);