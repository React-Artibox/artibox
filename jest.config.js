module.exports = {
  transform: {
    '\\.t(s|sx)$': 'ts-jest'
  },
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json'
    }
  },
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  moduleNameMapper: {
    '@artibox/([a-zA-Z-]*)/(.*)$': '<rootDir>/packages/$1/src/$2',
    '@artibox/([a-zA-Z-]*)$': '<rootDir>/packages/$1/src',
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.ts'
  },
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverageFrom: ['packages/*/src/**/*', '!**/index.ts', '!**/*fixtures*/**', '!**/*mocks*/**', '!**/*stories*'],
  coveragePathIgnorePatterns: ['/node_modules/']
};
