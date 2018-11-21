const request = require('request-promise');


const australia = function(animals) {
  return {
    wombats: function() {
      return animals.get({commonname: 'Common Wombat'});
    },
    wallabies: function() {
      return animals.get({commonname: 'Swamp Wallaby'});
    }
  };
};

module.exports = australia
