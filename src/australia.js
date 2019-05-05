
const australia = function (animalService, geocodingService) {

    function fetchAnimals(name) {
        return animalService.fetchAnimals(name).map((animal) => {
            return geocodingService.reverse(animal.lat, animal.long).then((locations) => {
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
            const redNeckedWallabies = fetchAnimals('Red-necked wallaby');
            return fetchAnimals('Swamp Wallaby');
        }
    };
};

module.exports = australia;
