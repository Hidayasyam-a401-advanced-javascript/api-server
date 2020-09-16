/* eslint-disable no-unused-vars */
'use strict';

const { json } = require('express');
let express = require('express');
let app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const { requestTime } = require('./middleware/timestamp');
const logger = require('./middleware/logger.js');
const notFoundHandler = require('./middleware/404');
const serverErrorHandler = require('./middleware/500');
const categoryroutes = require('../routes/categories');
const productroutes = require('../routes/product');
//let data = require('../data/db.json');
app.use(express.json());
app.use(requestTime);
app.use(logger);
app.use(serverErrorHandler);
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//======================== Globle Routes ===========================
app.use('/api/v1', categoryroutes);
app.use('/api/v1', productroutes);

//======================== Error Handler ===========================
app.get('/badrequest', (req, res) => { throw new Error('Bad Request !! '); });
app.use('*', notFoundHandler);


module.exports = {
  server: app,
  start: port => {
    let PORT = port || 3000;
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
      // console.log(data)

    });
  },
};