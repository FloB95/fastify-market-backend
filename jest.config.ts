import { pathsToModuleNameMapper, JestConfigWithTsJest } from 'ts-jest'

const { compilerOptions } = require('./tsconfig.json')

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  moduleDirectories: ['node_modules', '<rootDir>'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  },
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.test.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/build/'],
  testTimeout: 30000,
}

export default jestConfig
