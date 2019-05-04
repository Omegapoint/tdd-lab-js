const australia = require('../src/australia');

describe('Animals in Australia', () => {

    beforeEach(() => {
        console.log('I run before each test')
    });

    it('should pass this canary test', () => {
        expect('canary').toEqual('canary');
    });
});
