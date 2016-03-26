import path from 'path';
import { copySync } from 'fs-extra';
import { command } from './command';
import { adapter as jestAdapter } from '../blueprints/tests/jest';
import { adapter as eslintAdapter } from '../blueprints/linters/eslint';
import { buildPackage } from '../Package';
import { print, printError, printOptions } from '../utilities/print';
import { defaultOptionValues } from '../utilities/defaultOptionValues';

const blueprintPath = path.resolve(__dirname, '../blueprints', 'base');

const adapters = {
  eslint: eslintAdapter,
  jest: jestAdapter,
};

const defaultOptionValue = defaultOptionValues({
  test: 'jest',
  linter: 'eslint',
});

/* eslint-disable max-len */
export const newCommand = command({
  name: 'new <appName>',
  options: [
    {
      value: '-t, --test [testFramework]',
      description: 'Choose a test framework to include in your build.',
    },
    {
      value: '-l, --linter [linter]',
      description: 'Choose a linter to include in your build.'
    },
  ],
  handler: async (appName, program) => {
    const { test, linter } = program.parent;
    const distPath = path.join(process.cwd(), appName);
    const options = [
      { name: 'test', value: test },
      { name: 'linter', value: linter }
    ].filter((option) => option.value)
     .map(defaultOptionValue);

    if (options.length === 0) {
      print(`Creating your project, \`${appName}\``);
    } else {
      print(`Creating your project, \`${appName}\`, with ${printOptions(options)}`);
    }

    try {
      print('Moving the base project files over...');
      copySync(blueprintPath, distPath);

      print('Registering the project\'s `package.json` file');
      const packageFilePath = path.resolve(distPath, 'package.json');
      const pkg = await buildPackage(packageFilePath);

      await pkg.installAll();

      for (let option of options) {
        const adapter = adapters[option];

        print(adapter.message);

        await adapter.updatePackageInfo(pkg);
        await adapter.addFiles(distPath);
      }

      print(`✅  All Done! Check out your project at ${distPath} 🚀`);
    } catch (error) {
      printError(error);
    }
  },
});
