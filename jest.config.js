module.exports = {
  preset: 'jest-preset-angular',
  globalSetup: 'jest-preset-angular/global-setup',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
};
