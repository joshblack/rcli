import path from 'path';
import { copy } from 'fs-extra';
import { print } from '../../../utilities/print';

const jestPackageConfig = {
  modulePathIgnorePatterns: [
    '/lib/',
    '/node_modules/'
  ],
  persistModuleRegistryBetweenSpecs: true,
  preprocessorIgnorePatterns: [
    '/node_modules/'
  ],
  rootDir: '',
  scriptPreprocessor: 'resources/jest/preprocessor.js',
  setupEnvScriptFile: 'resources/jest/environment.js',
  testPathDirs: [
    '<rootDir>/src'
  ],
  unmockedModulePathPatterns: [
    '<rootDir>/node_modules/fbjs',
    '<rootDir>/node_modules/react',
    '<rootDir>/node_modules/react-dom',
    '<rootDir>/node_modules/react-addons-test-utils',
    '<rootDir>/node_modules/core-js'
  ]
};

const packages = [
  'jest-cli',
  'object-assign',
  'babel-plugin-webpack-loaders',
  'babel-polyfill',
  'babel-core',
  'react-addons-test-utils',
];

const jestScripts = {
  test: 'BABEL_DISABLE_CACHE=1 jest',
  'test:clean': 'rm -rf node_modules/jest-cli/.haste_cache && jest',
};

const jestFilePath = path.resolve(__dirname, 'resources');

export const adapter = {
  message: 'Adding `jest` as a test framework into the project',
  async updatePackageInfo(pkg) {
    await pkg.addInfo('jest', jestPackageConfig);
    await pkg.addScripts(jestScripts);

    print('Installing `node_modules` for `jest`...');
    await pkg.install(packages);
  },
  addFiles: (projectDirectoryPath) => new Promise((resolve, reject) => {
    const targetDir = path.resolve(projectDirectoryPath, 'resources');

    copy(jestFilePath, targetDir, (error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  }),
};
