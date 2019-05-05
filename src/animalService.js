const Promise = require('bluebird');
const request = require('request-promise');

const url = 'https://www.data.act.gov.au/resource/ymvu-tmp4.json';

function createRequest(name) {
  const req = request({
    uri: url,
    qs: {
      '$limit': 50,
      commonname: name
    },
    json: true
  });
  return req;
}

function mapAndLookupAnimals(req) {
  return Promise.map(req, (animal) => {
    return {
      commonname: animal.commonname,
      scientificname: animal.scientificname,
      lat: animal.northing_mga,
      long: animal.easting_mga,
      date: animal.recorddate,
    };
  });
}

function animalsFromDataSource(name) {
  return mapAndLookupAnimals(createRequest(name));
}

module.exports = {
  fetchAnimals: animalsFromDataSource
};