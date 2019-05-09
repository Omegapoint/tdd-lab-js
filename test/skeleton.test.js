const request = require('supertest');
const nock = require('nock');
const fs = require('fs');

describe('The Animals in Australia API', () => {

    let app;

    beforeAll(async () => {
        nock('https://www.data.act.gov.au/resource/ymvu-tmp4.json')
            .get(/.*/)
            .query({
                '$limit': 50,
                commonname: "Common Wombat"
            })
            .reply(200, [
                {
                    "commonname": "Common Wombat",
                    "coordinateuncertaintyinmeters": "50",
                    "data_resource_name": "ACT Wildlife Atlas",
                    "easting_mga": "149.11",
                    "fid": "35606",
                    "geodeticdatum": "GDA94",
                    "individualcount": "1",
                    "location_1": {
                        "type": "Point",
                        "coordinates": [
                            149.11,
                            -35.5831
                        ]
                    },
                    "northing_mga": "-35.5831",
                    "recorddate": "12/07/2015",
                    "scientificname": "Vombatus ursinus"
                },
                {
                    "commonname": "Common Wombat",
                    "coordinateuncertaintyinmeters": "500",
                    "data_resource_name": "ACT Wildlife Atlas",
                    "easting_mga": "149.128",
                    "fid": "16507",
                    "geodeticdatum": "GDA94",
                    "individualcount": "1",
                    "location_1": {
                        "type": "Point",
                        "coordinates": [
                            149.128,
                            -35.2804
                        ]
                    },
                    "northing_mga": "-35.2804",
                    "recorddate": "14/01/1986",
                    "scientificname": "Vombatus ursinus"
                }
            ])
            .persist();

        nock('https://www.data.act.gov.au/resource/ymvu-tmp4.json')
            .get(/.*/)
            .query({
                '$limit': 50,
                commonname: "Swamp Wallaby"
            })
            .reply(200, [
                {
                    "commonname": "Swamp Wallaby",
                    "coordinateuncertaintyinmeters": "1000",
                    "data_resource_name": "ACT Wildlife Atlas",
                    "easting_mga": "149.088",
                    "fid": "16054",
                    "geodeticdatum": "GDA94",
                    "individualcount": "1",
                    "location_1": {
                        "type": "Point",
                        "coordinates": [
                            149.088,
                            -35.3992
                        ]
                    },
                    "northing_mga": "-35.3992",
                    "recorddate": "1/04/1987",
                    "scientificname": "Wallabia bicolor"
                },
                {
                    "commonname": "Swamp Wallaby",
                    "coordinateuncertaintyinmeters": "500",
                    "data_resource_name": "ACT Wildlife Atlas",
                    "easting_mga": "148.856",
                    "fid": "15961",
                    "geodeticdatum": "GDA94",
                    "individualcount": "1",
                    "location_1": {
                        "type": "Point",
                        "coordinates": [
                            148.856,
                            -35.54
                        ]
                    },
                    "northing_mga": "-35.54",
                    "recorddate": "16/07/1995",
                    "scientificname": "Wallabia bicolor"
                }
            ])
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

    describe('/wallabies', () => {

        it('should respond with ok', (done) => {
            request(app).get('/wallabies').then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toMatchSnapshot();
                done();
            });
        });
    });

    describe('/wombats', () => {

        it('should respond with ok', (done) => {
            request(app).get('/wombats').then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toMatchSnapshot();
                done();
            });
        });
    });

});
