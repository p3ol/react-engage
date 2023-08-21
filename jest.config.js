const path = require('path');

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  fakeTimers: {
    enableGlobally: false,
  },
  testEnvironment: 'jsdom',
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/tests/',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '^~tests-utils$': path.resolve(__dirname, 'tests/utils.js'),
  },
};
