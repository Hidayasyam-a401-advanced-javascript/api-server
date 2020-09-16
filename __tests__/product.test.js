/* eslint-disable no-undef */
/* eslint-disable quotes */
'use strict';




// try it with mongoose package and see ow the test data will be inserted 
require('@code-fellows/supergoose');

const product = require('../lib/models/products/products-model.js');
//const product = new Products();

describe('Products Model', () => {
  it('can create a new product record', () => {
    let obj = {  category: "Romance",
      name: "Vision In White",
      display_name: "Vision In White",
      description: "The prolific Nora Roberts has penned more than 200 romance novels, but this one earned top marks from her fans as the first installment in The Bride Quartet. Wedding photographer Mackensie 'Mac' Elliot operates a wedding planning company with three friends.",
    };
    product.create(obj).then(record => {
      Object.keys(obj).forEach(key => {
        expect(record[key]).toEqual(obj[key]);
      });
    });
  });


  it('can get() a product record', async ()=> {
    let obj = {  category: "Romance",
      name: "Vision In White",
      display_name: "Vision In White",
      description: "The prolific Nora Roberts has penned more than 200 romance novels, but this one earned top marks from her fans as the first installment in The Bride Quartet. Wedding photographer Mackensie 'Mac' Elliot operates a wedding planning company with three friends.",
    };
    const record = await product.create(obj);
    const Item = await product.get(record._id);
    Object.keys(obj).forEach(key => {
      expect(Item[0][key]).toEqual(obj[key]);
    });
  });

  it('can Update a new product record', async () => {
    let obj = { category: "Fantasy",
      name: " A GAME OF THRONES",
      display_name: "A GAME OF THRONES",
      description: "This novel launched the Song of Ice and Fire series and upended the established tropes of 1990s-era epic fantasy. Let’s not forget that shocking death at the end! I know it’s hard to believe now in 2018, but back then, that was something of a fantasy no-no.",
    };
    const record = await product.create(obj);
    let update_obj={category: "FANASTY",
      name: " A GAME OF THRONES",
      display_name: "A GAME OF THRONES--> Book",
      description: "This novel launched the Song of Ice and Fire series and upended the established tropes of 1990s-era epic fantasy. Let’s not forget that shocking death at the end! I know it’s hard to believe now in 2018, but back then, that was something of a fantasy no-no.",
    };
    const Item = await product.update(record._id,update_obj);
    console.log("product : ",Item);
    Object.keys(obj).forEach(key => {
      expect(Item[key]).toEqual(obj[key]);
    });
  });
  it('can Delete product record', async () => {
    let obj = { category: "FANASTY",
      name: " A GAME OF THRONES",
      display_name: "A GAME OF THRONES Book",
      description: "This novel launched the Song of Ice and Fire series and upended the established tropes of 1990s-era epic fantasy. Let’s not forget that shocking death at the end! I know it’s hard to believe now in 2018, but back then, that was something of a fantasy no-no.",
    };
    const record = await product.create(obj);
    const Item = await product.delete(record._id);
    console.log("Product Deleted : ",Item);
    Object.keys(obj).forEach(key => {
      expect(Item[key]).toEqual(obj[key]);
    });
  });
   
    
});
