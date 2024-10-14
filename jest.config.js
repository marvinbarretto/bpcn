module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],  // Point to setup-jest.ts
  testPathIgnorePatterns: ['<rootDir>/e2e/'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.spec.json',  // TypeScript config for tests
      stringifyContentPathRegex: '\\.html$',
    },
  },
  transform: {
    '^.+\\.(ts|js|html)$': 'jest-preset-angular',
  },
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],  // Ensure node modules are transformed
};
