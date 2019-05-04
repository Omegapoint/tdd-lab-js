const Promise = require('bluebird');
const request = require('request-promise');
const geocoding = require('./geocoding');

const url = 'https://www.data.act.gov.au/resource/ymvu-tmp4.json';

const australia = function (animals) {
  return {
    wombats: function () {
      const req = request({
        uri: url,
        qs: {
          '$limit': 50,
          commonname: 'Common Wombat'
        },
        json: true
      });
      return Promise.map(req, (animal) => {
        return {
          commonname: animal.commonname,
          scientificname: animal.scientificname,
          lat: animal.northing_mga,
          long: animal.easting_mga,
          date: animal.recorddate,
        };
      }).map((animal) => {
        return {
          commonname: animal.commonname,
          scientificname: animal.scientificname,
          date: animal.date
        };
      })
    },
    wallabies: function () {
      const wallabies = animals.get({commonname: 'Swamp Wallaby'});
      return Promise.map(wallabies, (animal) => {
        return geocoding.reverse(animal.lat, animal.long).then((locations) => {
          const location = locations.find((location) => true);
          return {
            commonname: animal.commonname,
            scientificname: animal.scientificname,
            date: animal.date,
            state: location.state,
            country: location.country
          };
        });
      });
    }
  };
};

module.exports = australia;
