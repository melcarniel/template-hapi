module.exports = {
  preset: 'ts-jest',
  bail: true,
  testEnvironment: 'node',
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/__tests__/.*',
    '<rootDir>/src/config/.*',
    '<rootDir>/src/util/.*',
    '<rootDir>/src/plugins/.*'
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/src/config/.*',
    '<rootDir>/src/util/.*',
    '<rootDir>/src/plugins/.*'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },
  moduleDirectories: [
    'src',
    'node_modules'
  ],
  coverageReporters: ['lcov', 'json', 'text', 'html'],
  testMatch: null,
  testRegex: '(/__tests__/|(\\.|/)(test|spec))\\.ts$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  testResultsProcessor: 'jest-sonar-reporter',

  globals: {
    'ts-jest': {
      babelConfig: true
    }
  }
}

// module.exports = {
//   transform: {
//     '^.+\\.ts$': 'ts-jest'
//   },
//   testRegex: '(/__tests__/|(\\.|/)(test|spec))\\.ts$',
//   moduleFileExtensions: ['ts', 'js', 'json', 'node'],
//   coverageReporters: ['lcov', 'text'],
//   bail: true,
//   testEnvironment: 'node',
//   collectCoverageFrom: [
//     'src/**'
//   ]
// }
