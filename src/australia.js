const request = require('request-promise');
const Http = require('./Http');

const Australia = function() {

  const http = new Http;

  this.wombats = function() {
    return http.get({commonname: 'Common Wombat'});
  };

  this.wallabies = function() {
    return http.get({commonname: 'Swamp Wallaby'});
  };

};

module.exports = Australia
