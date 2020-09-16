'use strict';

const loggerMiddleware = require('../lib/middleware/logger');

describe('logger Middleware', ()=> {
    
  let consoleSpy;
  beforeEach(()=> {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(()=> {
    // put back the implementation of console.log
    consoleSpy.mockRestore();
  });
    
  let req = {};
  let res = {};
  let next = jest.fn();

  it('properly logs requests', ()=> {
    loggerMiddleware(req, res, next);
    expect(consoleSpy).toHaveBeenCalled();
  }); 
    
});