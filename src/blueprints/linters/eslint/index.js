import path from 'path';
import { copy } from 'fs-extra';
import { print } from '../../../utilities/print';

const eslintScripts = {
  lint: 'eslint src',
};

const packages = [
  'babel-eslint',
  'eslint',
  'eslint-plugin-react',
  'fbjs-scripts',
];

const eslintFilePath = path.resolve(__dirname, '.eslintrc');

export const adapter = {
  message: 'Adding `eslint` as a linter into the project',
  async updatePackageInfo(pkg) {
    await pkg.addScripts(eslintScripts);

    print('Installing `node_modules` for `eslint`...');
    await pkg.install(packages);
  },
  addFiles: (projectDirectoryPath) => new Promise((resolve, reject) => {
    const targetFilePath = path.resolve(projectDirectoryPath, '.eslintrc');

    copy(eslintFilePath, targetFilePath, (error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  }),
};
