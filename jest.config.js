module.exports = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
  verbose: false,
  collectCoverageFrom: ['**/*.(t|j)s', '!src/index.ts', '!**/node_modules/**', '!**/vendor/**'],
  coverageDirectory: './coverage',
  coverageReporters: ['json', 'json-summary', 'lcov', 'html'],
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './coverage',
        filename: 'report.html',
        expand: true,
      },
    ],
  ],
};
