const request = require('supertest');
const nock = require('nock');
const fs = require('fs');

describe('Animals in Australia', () => {

    let app;

    function wombat() {
        return {
            commonname : "Common Wombat",
            coordinateuncertaintyinmeters: '50',
            data_resource_name: 'ACT Wildlife Atlas',
            easting_mga: '149.11',
            fid: '35606',
            geodeticdatum: 'GDA94',
            individualcount: '1',
            location_1: {
                type: 'Point',
                coordinates: [ 149.11, -35.5831 ]
            },
            northing_mga: '-35.5831',
            recorddate: '12/07/2015',
            scientificname: 'Vombatus ursinus'
        };
    }

    beforeAll(async () => {
        nock('https://www.data.act.gov.au/resource/ymvu-tmp4.json')
            .get(/.*/)
            .query({
                '$limit': 50,
                commonname: 'Common Wombat'
            })
            .reply(200, [wombat()])
            .persist();

        nock('https://www.data.act.gov.au/resource/ymvu-tmp4.json')
            .get(/.*/)
            .query({
                '$limit': 50,
                commonname: 'Swamp Wallaby'
            })
            .reply(200, [wombat()])
            .persist();

        nock('http://www.datasciencetoolkit.org')
            .get(/\/coordinates2politics\/.*/)
            .reply(200, [{
                "politics": [
                    {"type": "admin2", "friendly_type": "country", "name": "Australia", "code": "aus"},
                    {"type": "admin4", "friendly_type": "state", "name": "New South Wales", "code": "as02"},
                    {"type": "admin4", "friendly_type": "state", "name": "New South Wales", "code": "as02"},
                    {
                        "type": "admin4",
                        "friendly_type": "state",
                        "name": "Australian Capital Territory",
                        "code": "as01"
                    }],
                "location": {"latitude": -35.4566, "longitude": 148.89}
            }])
            .persist();

        app = await require('../src/index');
    });

    afterAll((done) => {
        app.close(done);
    });

    describe("/wombats", () => {
        it("should return ok", (done) => {
            request(app).get('/wombats').then((response) => {
                expect(response.statusCode).toEqual(200);
                done();
            });
        });

        it("should return one wombat", (done) => {
            request(app).get('/wombats').then((response) => {
                expect(response.body).toHaveLength(1);
                done();
            });
        });

        it("should return a wombat with state", (done) => {
            request(app).get('/wombats').then((response) => {
                console.log(response.body);
                expect(response.body[0].state).toEqual('Australian Capital Territory');
                done();
            });
        });

        it("should return a wombat with country", (done) => {
            request(app).get('/wombats').then((response) => {
                expect(response.body[0].country).toEqual('Australia');
                done();
            });
        });

    })

    describe('/wallabies', () => {
        it('should return ok', (done) => {
            request(app).get('/wallabies').then((response) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });

    describe('/healthcheck', () => {
        it('should return ok', (done) => {
            request(app).get('/healthcheck').then((response) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });
});
