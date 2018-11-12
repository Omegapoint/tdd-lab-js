const request = require('request-promise');

const Http = function() {
  const url = 'https://www.data.act.gov.au/resource/ymvu-tmp4.json';

  this.get = function(queries) {
    return request({
      uri: url,
      qs: queries,
      json: true
    });
  };
};

module.exports = Http
