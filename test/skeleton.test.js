const request = require('supertest');
const nock = require('nock');
const fs = require('fs');

describe('The Animals in Australia API', () => {

  let app;

  beforeAll(async () => {
    nock('https://www.data.act.gov.au/resource/ymvu-tmp4.json')
      .get(/.*/)
      .reply(200, [])
      .persist();

    nock('http://www.datasciencetoolkit.org')
      .get(/\/coordinates2politics\/.*/)
      .reply(200, [{
        "politics": [
          {"type": "admin2", "friendly_type": "country", "name": "Australia", "code": "aus"},
          {"type": "admin4", "friendly_type": "state", "name": "New South Wales", "code": "as02"},
          {"type": "admin4", "friendly_type": "state", "name": "New South Wales", "code": "as02"},
          {"type": "admin4", "friendly_type": "state", "name": "Australian Capital Territory", "code": "as01"}],
        "location": {"latitude": -35.4566, "longitude": 148.89}
      }])
      .persist();

    app = await require('../src/index');
  });

  afterAll((done) => {
    app.close(done);
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
