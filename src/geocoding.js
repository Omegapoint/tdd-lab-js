const request = require('request-promise');
const Promise = require("bluebird");

// http://www.datasciencetoolkit.org/coordinates2politics/37.769456%2c-122.429128"
// [{"politics":[
// {"type":"admin2","friendly_type":"country","name":"Australia","code":"aus"},
// {"type":"admin4","friendly_type":"state","name":"New South Wales","code":"as02"},
// {"type":"admin4","friendly_type":"state","name":"New South Wales","code":"as02"},
// {"type":"admin4","friendly_type":"state","name":"Australian Capital Territory","code":"as01"}],
// "location":{"latitude":-35.4566,"longitude":148.89}}]
const api = 'http://www.datasciencetoolkit.org/coordinates2politics/';


const geocode = {
    reverse: function (lat, long) {
        const url = api + lat + ',' + long;
        const response = request({
            uri: url,
            json: true
        });
        return Promise.map(response, function (response) {
            const admin2 = response.politics.reverse().find(politic => politic.type === 'admin2');
            const admin4 = response.politics.find(politic => politic.type === 'admin4');
            return {
                state: admin4.name,
                country: admin2.name
            };
        }).catch((e) => {
            console.log(e);
        });
    }
};

module.exports = geocode;
