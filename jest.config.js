module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    /**
     * Since `<rootDir>` will be packages/*.
     */
    '@artibox/(.*)$': '<rootDir>/../$1'
  },
  transform: {
    '\\.t(s|sx)$': 'ts-jest'
  },
  testMatch: ['**/__tests__/**/*.test.*'],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json'
    }
  },
  testPathIgnorePatterns: ['/node_modules/'],
  coveragePathIgnorePatterns: ['/node_modules/']
};
