
function someFunction(service) {
  return service.getValue();
}

describe('Some function', () => {

  it('should collaborate with injected service', () => {
    const mockService = {
      getValue: jest.fn(() => 'value!')
    };

    someFunction(mockService);

    expect(mockService.getValue).toHaveBeenCalled();
  });

  it('should return value from injected service', () => {
    const mockService = {
      getValue: jest.fn(() => 'value!')
    };

    expect(someFunction(mockService)).toEqual('value!');
  });


});
