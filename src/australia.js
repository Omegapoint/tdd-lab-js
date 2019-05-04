const geocoding = require('./geocoding');
const Promise = require('bluebird');

const australia = function (animals) {
    return {
        wombats: function () {
            const wombats = animals.get({commonname: 'Common Wombat'});
            return Promise.map(wombats, (animal) => {
                    return {
                        commonname: animal.commonname,
                        scientificname: animal.scientificname,
                        date: animal.date
                    };
                }
            );
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

module.exports = australia
