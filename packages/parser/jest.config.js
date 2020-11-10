/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */
const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('../../tsconfig.json')

module.exports = {
  preset: 'ts-jest',

  globals: {
    'ts-jest': {
      compiler: 'ttypescript',
    },
  },

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/../../',
  }),
}
