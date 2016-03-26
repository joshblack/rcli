import path from 'path';
import invariant from 'fbjs/lib/invariant';
import { command } from './command';
import { generators } from '../generators';
import { print, printError } from '../utilities/print';
import { requiredOptions } from '../utilities/requiredOptions';

// Component, Component Folder, test, class syntax, component syntax
// Route
// path option, default to src/components

const checkRequiredOptions = requiredOptions({
  component: true,
  directory: false,
  folder: true,
  stateless: true,
  includeTest: true,
});

export const generate = command({
  name: 'generate <item>',
  options: [
    {
      value: '-d, --directory [directory]',
      description: 'The output directory where the item will be placed into.',
      defaultValue: 'src/components',
    },
    {
      value: '-c, --component [componentName]',
      description: 'The name of the component.',
    },
    {
      value: '-f, --folder [folder]',
      description: 'Should this component have it\'s own folder.',
    },
    {
      value: '-s, --stateless [stateless]',
      description: 'Specify whether this is a stateless component or not.',
    },
    {
      value: '--include-test',
      description: 'Include a test when creating a component',
    },
  ],
  handler: async (item, program) => {
    const {
      component,
      directory,
      folder = false,
      stateless = false,
      includeTest = false,
    } = program.parent;

    const options = {
      component,
      directory,
      folder,
      stateless,
      includeTest,
    };

    try {
      invariant(
        item === 'component',
        'Whoops! `generate` expects `component` right now.',
      );

      checkRequiredOptions(options);

      const generator = generators[item];
      await generator(options);
    } catch (error) {
      printError(error);
    }
  },
});
