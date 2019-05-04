const animals = require('../src/animals');
const australia = require('../src/australia');

describe('Animals in Australia', () => {
    var animalsInAustralia;

    beforeEach(() => {
        this.animalsInAustralia = australia(animals);
    });

    it('should pass this canary test', () => {
        expect(true).to.be.true;
    });

    function scientificnames(animals) {
        return animals.map((animal) => animal.scientificname);
    }

    describe('Wombats', () => {
        it('there should be ten', async () => {
            const wombats = await this.animalsInAustralia.wombats();
            expect(wombats).to.have.length(10);
        });

        it('should have scientific name', async () => {
            const wombats = await this.animalsInAustralia.wombats();
            expect(scientificnames(wombats)).to.include('Vombatus ursinus');
        });
    });

    describe('Wallabies', () => {
        it('should have scientific name', async () => {
            const wallabies = await this.animalsInAustralia.wallabies();
            expect(scientificnames(wallabies)).to.include('Wallabia bicolor');
        })
    });
});
