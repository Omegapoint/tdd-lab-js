const request = require('supertest');

describe('The Animals in Australia API', () => {

  let app;

  beforeEach(async () => {
    app = await require('../src/index');
  });

  describe('/wallabies', () => {

    it('should respond with expected wallabies', (done) => {
      request(app).get('/wallabies').then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

  describe('/wombats', () => {

    it('should respond with expected wombats', (done) => {
      request(app).get('/wombats').then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

});
