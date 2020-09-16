/* eslint-disable no-undef */
const express = require('express');
const category = require('../lib/models/categories/categories-model.js');
const router = express.Router();


//============================= Router ====================================
router.post('/category', postItem);
router.get('/category', getallItem);
router.get('/category/:id', getItem);
router.put('/category/:id', putItem);
router.delete('/category/:id', deleteItem);
//=========================================================================
async function postItem(req, res, next) {

  category.create(req.body).then(data => {
    res.status(200).send(data);
  }).catch(err => {
    console.log(err);
    next(err);
  });
}
function getallItem(req, res) {
  category.get().then(data => {
    res.status(200).send(data);
  }).catch(err => {
    console.log(err);
    next(err);
  });
}
async function getItem(req, res, next) {

  let id = req.params.id;
  category.get(id).then(data => {
    res.status(200).send(data);
  }).catch(err => {
    console.log(err);
    next(err);
  });

}
function putItem(req, res, next) {

  let id = req.params.id;
  let record = req.body;
  //console.log(id);
  category.update(id,record).then(data => {
    res.status(200).send(data);
  }).catch(err => {
    console.log(err);
    next(err);
  });
}
function deleteItem(req, res,next) {

  let id = req.params.id;
  category.delete(id).then(data => {
    res.status(200).send(data);
  }).catch(err => {
    console.log(err);
    next(err);
  });
}

module.exports = router;