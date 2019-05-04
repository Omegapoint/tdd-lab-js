const request = require('request-promise');
const Promise = require("bluebird");

const url = 'https://www.data.act.gov.au/resource/ymvu-tmp4.json';
// [{
// "commonname":"Swamp Wallaby",
// "coordinateuncertaintyinmeters":"1000",
// "data_resource_name":"ACT Wildlife Atlas",
// "easting_mga":"148.836",
// "fid":"15794",
// "geodeticdatum":"GDA94",
// "individualcount":"1",
// "location_1":{"
// type":"Point","coordinates":[148.836,-35.3798]},
// "northing_mga":"-35.3798","recorddate":"18/01/1992",
// "scientificname":"Wallabia bicolor"
// }]
const animals = {
    get: function (queries) {

        const qs = queries;
        qs['$limit'] = 50;
        const response = request({
            uri: url,
            qs: qs,
            json: true
        });
        return Promise.map(response, function(animal) {
            return {commonname: animal.commonname,
                scientificname: animal.scientificname,
                lat: animal.northing_mga,
                long: animal.easting_mga,
                date: animal.recorddate,
            };
        });
    }
}

module.exports = animals
