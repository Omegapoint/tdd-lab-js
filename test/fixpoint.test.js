const request = require('supertest');
const fs = require('fs');

describe('The Animals in Australia API', () => {

  let app;

  beforeAll(async () => {
    app = await require('../src/index');
  });

  afterAll((done) => {
    app.close(done);
  });

  describe('/wallabies', () => {

    it('should respond with expected wallabies', (done) => {
      request(app).get('/wallabies').then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(JSON.parse(fs.readFileSync('test/testdata/wallabies.json')));
        done();
      });
    });
  });

  describe('/wombats', () => {

    it('should respond with expected wombats', (done) => {
      request(app).get('/wombats').then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(JSON.parse(fs.readFileSync('test/testdata/wombats.json')));
        done();
      });
    });
  });

});
