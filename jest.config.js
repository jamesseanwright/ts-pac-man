'use strict';

module.exports = {
  clearMocks: true,
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  testRegex: "src(\/.*)?\/__tests__\/.*\.test\.ts$",
  moduleFileExtensions: ['ts', 'js', 'json'],
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.json',
      diagnostics: false,
    },
  },
};
