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
let data = require('../data/db.json');
app.use(express.json());
app.use(requestTime);
app.use(logger);
app.use(serverErrorHandler);
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1', categoryroutes);


app.use('/api/v1', productroutes);


app.get('/badrequest', (req, res) => { throw new Error('Bad Request !! '); });

//=================== category Routes ===========================

app.post('/category', (req, res) => {

  let obj = req.body;
  data.categories.push(obj);

  res.status(200).send(data.categories);
  //console.log(res.status)
});
app.get('/category', (req, res) => {

  res.status(200).send(data.categories);
});
app.get('/category/:id', (req, res) => {

  let id = req.params.id;
  let category = data.categories;
  let flag = true;
  //console.log(id);
  for (let i = 0; i < category.length; i++) {
    if (id === category[i].id) {

      flag = true;
      break;

    } else {
      flag = false;
    }
  }


  if (flag === true)
    res.status(200).send(category[id]);
  else
    res.status(400).send('category dosn\'t exist');




});
app.put('/category/:id', (req, res) => {

  let id = req.params.id;
  let category = data.categories;
  //console.log(id);
  for (let i = 0; i < category.length; i++) {
    if (id === category[i].id) {
      category[i].id = req.body.id || id;
      category[i].name = req.body.name || category[i].name;
      category[i].display_name = req.body.display_name || category[i].display_name;
      category[i].description = req.body.description || category[i].description;
      res.status(200).send(category[i]);

    }
  }
});
app.delete('/category/:id', (req, res) => {

  let id = req.params.id;
  let flag = true;
  let category = data.categories;
  for (let i = 0; i < category.length; i++) {
    if (id === category[i].id) {
      data.categories.pop(category[i]);
      flag = true;
      break;

    } else {
      flag = false;
    }
  }


  if (flag === true)
    res.status(200).send(data.categories);
  else
    res.status(400).send('category dosn\'t exist to delete');


});


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