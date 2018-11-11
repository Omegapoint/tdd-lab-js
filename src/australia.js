var rp = require('request-promise');

const Australia = function() {

  const url = 'https://www.data.act.gov.au/resource/ymvu-tmp4.json?commonname=Common Wombat'

  this.wombats = function() {
    return rp({
      uri: url,
      qs: { commonname: 'Common Wombat' },
      json: true
    });
  };
};

module.exports = Australia
