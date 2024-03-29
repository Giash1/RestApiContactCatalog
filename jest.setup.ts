const mockRouter = {
  use: jest.fn(),
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};

jest.mock('express', () => ({
  __esModule: true,
  default: () => mockRouter,
  Router: () => mockRouter,
}));

export { mockRouter };