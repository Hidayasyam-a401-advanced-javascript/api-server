const express = require('express');
const products = require('../lib/models/products/products-model.js');
const router = express.Router()



router.post('/products', (req, res) => {
    let obj = req.body;
    data.products.push(obj);
    res.send(data.products)
})
router.get('/products', (req, res) => {

    res.send(data.products)
})
router.get('/products/:id', (req, res) => {

    let id = req.params.id;
    let product = data.products;
    //console.log(id);
    for (let i = 0; i < product.length; i++) {
        if (id === product[i].id)
            res.send(product[i]);
    }

})
router.put('/products/:id', (req, res) => {

    let id = req.params.id;
    let product = data.products;
    //console.log(id);
    for (let i = 0; i < product.length; i++) {
        if (id === product[i].id) {
            product[i].id = req.body.id || id;
            product[i].name = req.body.name || product[i].name;
            product[i].category = req.body.category || product[i].category;
            product[i].display_name = req.body.display_name || product[i].display_name;
            product[i].description = req.body.description || product[i].description;
            res.send(product[i]);

        }
    }
})
router.delete('/products/:id', (req, res) => {

    let id = req.params.id;
    let product = data.products;
    for (let i = 0; i < product.length; i++) {
        if (id === product[i].id) {
            data.products.pop(product[i]);
            break;
            //res.send(product[i]);

        }
    }

    res.send(data.products)


})

module.exports = router;