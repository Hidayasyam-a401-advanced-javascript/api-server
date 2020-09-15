'use strict'

const { json } = require('express');
let express = require('express');
let app = express();
const { requestTime } = require('./middleware/timestamp');
const logger = require('./middleware/logger.js');
const notFoundHandler = require('./middleware/404');
const serverErrorHandler = require('./middleware/500');

let data = require('../data/db.json');
app.use(express.json());
app.use(requestTime);
app.use(logger);
app.use(serverErrorHandler);


app.get('/badrequest', (req, res) => {throw new Error("Bad Request !! ");});
app.use('*', notFoundHandler);
//=================== product Routes ===========================
app.post('/products', (req, res) => {
    let obj = req.body;
    data.products.push(obj);
    res.send(data.products)
})
app.get('/products', (req, res) => {

    res.send(data.products)
})
app.get('/products/:id', (req, res) => {

    let id = req.params.id;
    let product = data.products;
    //console.log(id);
    for (let i = 0; i < product.length; i++) {
        if (id === product[i].id)
            res.send(product[i]);
    }

})
app.put('/products/:id', (req, res) => {

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
app.delete('/products/:id', (req, res) => {

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

//=================== category Routes ===========================

app.post('/category', (req, res) => {

    let obj = req.body;
    data.categories.push(obj);
    res.send(data.categories)
})
app.get('/category', (req, res) => {

    res.send(data.categories)
})
app.get('/category/:id', (req, res) => {

    let id = req.params.id;
    let category = data.categories;
    //console.log(id);
    for (let i = 0; i < category.length; i++) {
        if (id === category[i].id)
            res.send(category[i]);
    }

})
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
            res.send(category[i]);

        }
    }
})
app.delete('/category/:id', (req, res) => {

    let id = req.params.id;
    let category = data.categories;
    for (let i = 0; i < category.length; i++) {
        if (id === category[i].id) {
            data.categories.pop(category[i]);
            break;
            
        }
    }

    res.send(data.categories)


})




module.exports = {
    server: app,
    start: port => {
        let PORT = port || 3000;
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`)
            // console.log(data)

        })
    }
};