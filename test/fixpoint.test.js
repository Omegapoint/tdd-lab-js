const request = require('supertest');
const nock = require('nock');
const fs = require('fs');

describe('The Animals in Australia API', () => {

  let app;

  beforeAll(async () => {

    nock('https://www.data.act.gov.au/resource/ymvu-tmp4.json')
      .get(/.*/)
      .query((query) => query.commonname ==='Common Wombat')
      .reply(200, JSON.parse(fs.readFileSync('test/testdata/wombat_response.json')));
    nock('https://www.data.act.gov.au/resource/ymvu-tmp4.json')
      .get(/.*/)
      .query((query) => query.commonname ==='Swamp Wallaby')
      .reply(200, JSON.parse(fs.readFileSync('test/testdata/wallaby_response.json')));
    nock('http://www.datasciencetoolkit.org')
      .get(/\/coordinates2politics\/.*/)
      .reply(200, JSON.parse(fs.readFileSync('test/testdata/location.json')))
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
        expect(response.body).toEqual(JSON.parse(fs.readFileSync('test/testdata/wallabies.json')));
        done();
      });
    });
  });

  describe('/wombats', () => {

    it('should respond with expected wombats', (done) => {
      const expectedWombats = JSON.parse(fs.readFileSync('test/testdata/wombats.json'));

      request(app).get('/wombats').then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toIncludeSameMembers(expectedWombats.map((wombat) => expect.objectContaining(wombat)));
        done();
      });
    });
  });

});
