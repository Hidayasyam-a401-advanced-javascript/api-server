/* eslint-disable no-undef */
/* eslint-disable quotes */
'use strict';




// try it with mongoose package and see ow the test data will be inserted 
require('@code-fellows/supergoose');

const category = require('../lib/models/categories/categories-model.js');
//const product = new Products();

describe('Categories Model', () => {
  it('can create a new category record', () => {
    let obj = {  name: "History",
      display_name: "HISTORY",
      description: "Fantasy is a genre that’s identified by the use of magic within it.",
    };
    category.create(obj).then(record => {
      Object.keys(obj).forEach(key => {
        expect(record[key]).toEqual(obj[key]);
      });
    });
  });


  it('can get() a category record', async ()=> {
    let obj = {  name: "FANTASY",
      display_name: "FANTASY",
      description: "Fantasy is a genre that’s identified by the use of magic within it.",
    };
    const record = await category.create(obj);
    const Item = await category.get(record._id);
    Object.keys(obj).forEach(key => {
      expect(Item[0][key]).toEqual(obj[key]);
    });
  });

  it('can Update a new category record', async () => {
    let obj = {  name: "FANTASY",
      display_name: "FANTASY",
      description: "Fantasy is a genre that’s identified by the use of magic within it.",
    };
    const record = await category.create(obj);
    let update_obj={ name: "FANTASY Update",
      display_name: "FANTASY",
      description: "Fantasy is a genre that’s identified by the use of magic within it.",
    };
    const Item = await category.update(record._id,update_obj);
    console.log("category : ",Item);
    Object.keys(obj).forEach(key => {
      expect(Item[key]).toEqual(obj[key]);
    });
  });
  it('can Delete category record', async () => {
    let obj = {  name: "Art",
      display_name: "ART",
      description: "This book genre encompasses several different types of books. However, all of them require the same thing: a focus on something art-related.",
    };
    const record = await category.create(obj);
    const Item = await category.delete(record._id);
    console.log("category Deleted : ",Item);
    Object.keys(obj).forEach(key => {
      expect(Item[key]).toEqual(obj[key]);
    });
  });
   
    
});
