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

  it('should not have any wombats', async () => {
    const wombats = await this.australia.wombats();
    expect(wombats).to.be.empty;
  });

  it('should have two wombats', async () => {
    const wombats = await this.australia.wombats();
    expect(wombats).to.have.length(2);
  });

  it('should have scientific name', async () =>  {
    const wombats = await this.australia.wombats();
    const scientificnames = wombats.map((wombat) => wombat.scientificname);
    expect(scientificnames).to.include('Vombatus ursinus');
  });
});
