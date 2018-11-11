const expect = require ('chai').expect;
const Australia = require('../src/australia');

describe('Australia', () => {

  var australia

  beforeEach(() => {
    this.australia = new Australia;
  });

  it('should pass this canary test', () => {
    expect(true).to.be.true;
  });

  it('should not have any wombats', () => {
    expect(this.australia.wombats()).to.be.empty;
  });
});
