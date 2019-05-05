const geocoding = require('./geocoding');

const australia = function (animalService) {

    function fetchAnimals(name) {
        return animalService.fetchAnimals(name).map((animal) => {
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

    return {
        wombats: function () {
            return fetchAnimals('Common Wombat');
        },
        wallabies: function () {
            return fetchAnimals('Swamp Wallaby');
        }
    };
};

module.exports = australia;
