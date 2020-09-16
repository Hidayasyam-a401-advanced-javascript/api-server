/* eslint-disable no-undef */
const express = require('express');
const products = require('../lib/models/products/products-model.js');
const router = express.Router();


//============================= Router ====================================
router.post('/products', postItem);
router.get('/products', getallItem);
router.get('/products/:id', getItem);
router.put('/products/:id', putItem);
router.delete('/products/:id', deleteItem);
//=========================================================================
async function postItem(req, res, next) {

  products.create(req.body).then(data => {
    res.status(200).send(data);
  }).catch(err => {
    console.log(err);
    next(err);
  });
}
function getallItem(req, res) {
  products.get().then(data => {
    res.status(200).send(data);
  }).catch(err => {
    console.log(err);
    next(err);
  });
}
async function getItem(req, res, next) {

  let id = req.params.id;
  products.get(id).then(data => {
    res.status(200).send(data);
  }).catch(err => {
    console.log(err);
    next(err);
  });

}
function putItem(req, res, next) {

  let id = req.params.id;
  let record = req.body;
  //console.log('put ->',record);
  products.update(id,record).then(data => {
    console.log('put ->',data);
    res.status(200).send(data);
  }).catch(err => {
    console.log(err);
    next(err);
  });
}
function deleteItem(req, res,next) {

  let id = req.params.id;
  products.delete(id).then(data => {
    res.status(200).send(data);
  }).catch(err => {
    console.log(err);
    next(err);
  });
}

module.exports = router;