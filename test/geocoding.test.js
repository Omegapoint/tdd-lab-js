const geocoding = require('../src/geocoding');

describe('Geocoding', () => {
    it('should pass this canary test', () => {
        expect(true).to.be.true;
    });

    it('Coordinates should be in Stockholm', async () => {
        const location = await geocoding.reverse(59.3, 18.05);
        expect(location).to.deep.include({state: 'Stockholm', country: 'Sweden'});
    }).timeout(3000);

    it('Coordinates should be in NSW', async () => {
        const location = await geocoding.reverse(-35.4566, 148.89);
        expect(location).to.deep.include({state: 'New South Wales', country: 'Australia'});
    }).timeout(3000);
});
