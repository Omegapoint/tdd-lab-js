const expect = require ('chai').expect;
const animals = require('../src/animals');
const australia = require('../src/australia');
const geocoding = require('../src/geocoding');

describe('Animals in Australia', () => {
  var animalsInAustralia;
  var sandbox;

  beforeEach(() => {
    this.animalsInAustralia = australia(animals);
  });

  afterEach(() => {
  })

  it('should pass this canary test', () => {
    expect(true).to.be.true;
  });

  it('sweden', async () => {
    const location = await geocoding.reverse(59.3000, 18.05000);
    console.log(location);
  });

  it('australia', async () => {
    const location = await geocoding.reverse(148.8900, -35.4566);
    console.log(location);
  });

  it('should not have any wombats', async () => {
    const wombats = await this.animalsInAustralia.wombats();
    expect(wombats).to.be.empty;
  });

  it('should have two wombats', async () => {
    const wombats = await this.animalsInAustralia.wombats();
    expect(wombats).to.have.length(2);
  });

  it('should have scientific name', async () =>  {
    const wombats = await this.animalsInAustralia.wombats();
    const scientificnames = wombats.map((wombat) => wombat.scientificname);
    expect(scientificnames).to.include('Vombatus ursinus');
  });

  it('should get wallabies', async () => {
    const wallabies = await this.animalsInAustralia.wallabies();
    console.log(wallabies.map(animal => animal.location_1.coordinates));
  })
});
