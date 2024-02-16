import { pathsToModuleNameMapper, JestConfigWithTsJest } from "ts-jest";

const { compilerOptions } = require('./tsconfig.json')

const jestConfig: JestConfigWithTsJest = {
  preset: "ts-jest",
  moduleDirectories: ["node_modules", "<rootDir>"],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  },
  testEnvironment: 'node',
 }

export default jestConfig;