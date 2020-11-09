/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */
const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('../../tsconfig.json')

module.exports = {
  preset: 'ts-jest',

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/../../',
  }),
}
