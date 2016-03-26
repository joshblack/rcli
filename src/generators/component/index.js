import path from 'path';
import { lstat, outputFileSync } from 'fs-extra';
import { reactClassTemplate } from './reactClassTemplate';
import { reactStatelessTemplate } from './reactStatelessTemplate';
import { exportHelperTemplate } from './exportHelperTemplate';
import { print, printError, printWarning } from '../../utilities/print';

const createComponentFolder = (component, directory, stateless) => new Promise((resolve, reject) => {
  const distPath = path.resolve(process.cwd(), directory);
  const componentFolderPath = path.resolve(distPath, component);
  const indexPath = path.resolve(componentFolderPath, 'index.js');
  const stylePath = path.resolve(componentFolderPath, `${component}.css`);
  const componentPath = path.resolve(componentFolderPath, `${component}.js`);

  lstat(componentFolderPath, (error, stats) => {
    if (!error && stats.isDirectory()) {
      printWarning(`A directory for the component ${component} already exists at ${componentFolderPath}`);
      reject();
      return;
    }

    print('Creating export helper file');
    outputFileSync(indexPath, exportHelperTemplate(component));

    if (stateless) {
      print('Creating React Stateless Component file');
      outputFileSync(componentPath, reactStatelessTemplate(component, true));
    } else {
      print('Creating React Component Class file');
      outputFileSync(componentPath, reactClassTemplate(component, true));
    }

    print('Creating placeholder CSS file');
    outputFileSync(stylePath, '');

    resolve();
  });
});

const createComponentFile = (component, directory, stateless) => new Promise((resolve, reject) => {
  const distPath = path.resolve(process.cwd(), directory);
  const componentFilePath = path.resolve(distPath, `${component}.js`);

  lstat(componentFilePath, (error, stats) => {
    if (!error && stats.isFile()) {
      printWarning(`A file already exists for the component ${component} at ${componentFilePath}`);
      reject();
      return;
    }

    if (stateless) {
      print('Creating React Stateless Component file');
      outputFileSync(componentFilePath, reactStatelessTemplate(component, false));
    } else {
      print('Creating React Component Class file');
      outputFileSync(componentFilePath, reactClassTemplate(component, false));
    }

    resolve();
  });
});

export const componentGenerator = async (options) => {
  const { component, directory, folder, stateless } = options;

  try {
    if (folder) {
      await createComponentFolder(component, directory, stateless);
    } else {
      await createComponentFile(component, directory, stateless);
    }

    print(`✅  Generated React Component: ${component}`);
  } catch (error) {}
};
