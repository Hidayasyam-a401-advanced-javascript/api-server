const { server } = require('../lib/server.js');

const supertest = require('supertest');
const mockRequest = supertest(server);


describe('tests routes', () => {

  it('respond status should be 200 POST /category', () => {
    return mockRequest.post('/category').then(result => {
      expect(result.status).toBe(200);
    });
  });

  it('respond status should be 200 GET /category', () => {
    return mockRequest.get('/category').then(result => {
      expect(result.status).toBe(200);
    });
  });

  it('respond status should be 200 GET /category/:id for valid id', () => {
    return mockRequest.get('/category/1').then(result => {
      expect(result.status).toBe(200);
    });
  });

  it('respond status should be 400 GET /category/:id for invalid id', () => {
    return mockRequest.get('/category/10').then(result => {
      expect(result.status).toBe(400);
    });
  });

  it('respond status should be 200 PUT /category/:id ', () => {
    return mockRequest.put('/category/1').then(result => {
      expect(result.status).toBe(200);
    });
  });



  it('respond status should be 200 DELETE /category/:id for valid id', () => {
    return mockRequest.delete('/category/1').then(result => {
      expect(result.status).toBe(200);
    });
  });

  it('respond status should be 400 DELETE /category/:id for invalid id', () => {
    return mockRequest.delete('/category/22').then(result => {
      expect(result.status).toBe(400);
    });
  });
});