/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable quotes */
const { server } = require('../lib/server');

const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

describe('Product API', () => {
    it('can post() a product item', async () => {
        const productObj = {
            category: 'Romance',
            name: 'Vision In White',
            display_name: 'Vision In White',
            description: 'The prolific Nora Roberts has penned more than 200 romance novels, but this one earned top marks from her fans as the first installment in The Bride Quartet. Wedding photographer Mackensie \'Mac\' Elliot operates a wedding planning company with three friends.',
        };
        const data = await mockRequest.post('/api/v1/products').send(productObj);
        //console.log(data.body);
        const record = data.body;

        Object.keys(productObj).forEach(key => {
            expect(record[key]).toEqual(productObj[key]);
        });
    });

    it('can get() a product item', async () => {
        const productObj = {
            category: "Romance",
            name: "Vision In White",
            display_name: "Vision In White",
            description: "The prolific Nora Roberts has penned more than 200 romance novels, but this one earned top marks from her fans as the first installment in The Bride Quartet. Wedding photographer Mackensie 'Mac' Elliot operates a wedding planning company with three friends.",
        };
        const data = await mockRequest.post('/api/v1/products').send(productObj);
        const record = data.body;
        const productItemResponse = await mockRequest.get(`/api/v1/products/${record._id}`);
        const productItem = productItemResponse.body[0];
        Object.keys(productObj).forEach(key => {
            expect(productItem[key]).toEqual(productObj[key]);
        });
    });

    it('can Update() a product item', async () => {
        let productObj = {
            category: "FANASTY Update",
            name: " A GAME OF THRONES Update",
            display_name: "A GAME OF THRONES--> Update",
            description: "This novel launched the Song of Ice and Fire series and upended the established tropes of 1990s-era epic fantasy. Let’s not forget that shocking death at the end! I know it’s hard to believe now in 2018, but back then, that was something of a fantasy no-no.",
        };
        const updateobj = {
            category: "Test category Update",
            name: " Test category Update",
            display_name: "Test Display name Update",
            description: "Test description Update",
        };

        const data = await mockRequest.post('/api/v1/products').send(productObj);
        const record = data.body;
        const productItemResponse = await mockRequest.put(`/api/v1/products/${record._id}`).send(updateobj);
        const productItemResponseget = await mockRequest.get(`/api/v1/products/${record._id}`);
        const productItem = productItemResponseget.body[0];
        Object.keys(updateobj).forEach(key => {
            expect(productItem[key]).toEqual(updateobj[key]);
        });
    });

    it('can delete product item', async () => {
        const productObj = {
            category: "Fantasy",
            name: " A GAME OF THRONES",
            display_name: "A GAME OF THRONES",
            description: "This novel launched the Song of Ice and Fire series and upended the established tropes of 1990s-era epic fantasy. Let’s not forget that shocking death at the end! I know it’s hard to believe now in 2018, but back then, that was something of a fantasy no-no.",
        };
        const data = await mockRequest.post('/api/v1/product').send(productObj);
        const record = data.body;
        const productItemResponse = await mockRequest.delete(`/api/v1/product/${record._id}`);
        const productItemResponseget = await mockRequest.get(`/api/v1/products/${record._id}`);
       // console.log('Delete ',productItemResponseget.body[0]);
        expect(productItemResponseget.body[0]).toEqual(undefined);
        
    });

});

