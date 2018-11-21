const request = require('request-promise');

const url = 'https://www.data.act.gov.au/resource/ymvu-tmp4.json';

const animals = {
  get: function(queries) {
    return request({
      uri: url,
      qs: queries,
      json: true
    });
  }
}

module.exports = animals
