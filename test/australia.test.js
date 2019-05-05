const australia = require('../src/australia');
const Promise = require('bluebird');

describe('Australia', () => {

  const animalServiceMock = {
    fetchAnimals: jest.fn()
  };
  const geolocationServiceMock = {
    reverse: jest.fn()
      .mockReturnValue(Promise.resolve([{
        country: 'Country',
        state: 'State'
      }]))
  };
  it('should have wombats', () => {
    animalServiceMock.fetchAnimals.mockReturnValue([]);

    australia(animalServiceMock, geolocationServiceMock).wombats();
    expect(animalServiceMock.fetchAnimals).toHaveBeenCalledWith('Common Wombat');
  });

  it('should call animal service for two types of wallabies', () => {
    animalServiceMock.fetchAnimals.mockReturnValue([]);

    australia(animalServiceMock, geolocationServiceMock).wallabies();
    expect(animalServiceMock.fetchAnimals).toHaveBeenCalledWith('Swamp Wallaby');
    expect(animalServiceMock.fetchAnimals).toHaveBeenCalledWith('Red-necked wallaby');
  });

  it('should return two types of wallabies', async () => {
    const wallaby = {
      commonname: 'Some wallaby',
    };
    animalServiceMock.fetchAnimals
      .mockReturnValue(Promise.resolve([wallaby]));

    const wallabies = await australia(animalServiceMock, geolocationServiceMock).wallabies();

    expect(wallabies).toHaveLength(2);
  })

});