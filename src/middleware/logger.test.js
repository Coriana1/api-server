const logger = require('./logger');

describe('Logger Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {};
    next = jest.fn();
  });

  test('should call next function', () => {
    logger(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
