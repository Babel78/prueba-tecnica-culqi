// eslint-disable-next-line no-undef
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    'test/(.*)': '<rootDir>/src/test/$1',
  },
  testMatch: ['**/*.(test|spec).(ts|tsx|js|jsx)'],
  coveragePathIgnorePatterns: ['/node_modules/'],
};
