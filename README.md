# React Command Line, `rcli`

`rcli` is a utility to help quickly scaffold out new, production-grade applications as well as provide convenient generators for rapid application development.

## Overview

```
Usage: rcli [options] [command]

Commands:

  generate <item>
  new <appName>

Options:

  -h, --help                       output usage information
  -V, --version                    output the version number
  -d, --directory [directory]      The output directory where the item will be placed into.
  -c, --component [componentName]  The name of the component.
  -f, --folder [folder]            Should this component have it's own folder.
  -s, --stateless [stateless]      Specify whether this is a stateless component or not.
  --include-test                   Include a test when creating a component
  -t, --test [testFramework]       Choose a test framework to include in your build.
  -l, --linter [linter]            Choose a linter to include in your build.
```

## Scaffolding new applications

You can quickly scaffold a new application by running:

```sh
rcli new applicationName
```

This will create a folder called `applicationName` that contains a base project that will allow you to run a development server that includes useful features like Hot-Module Replacement. It also provides a base production-grade implementation that includes support for Server-side Rendering, basic Express Security, and asset fingerprinting.

You can use both features by running the following commands in the application root folder:

```sh
# Start the development server with HMR support
$ npm run start:dev

# Build out the application assets, fingerprinting support including
$ npm run build

# Start the production application, includes SSR
$ npm run start:prod
```

### Scaffold options

You can pass in a variety of options while generating a new application. As of right now, `rcli` supports two flags, `--test` and `--linter` and has implementations for the `jest` testing framework as well as `eslint`.

To include them when building out your application, just do the following:

```sh
$ rcli new appName -t jest -l eslint
```

And the project will now have `jest` and `eslint` support for testing and linting, respectively.

## Generators

`rcli` has support for easy component generation by running the following command:

```sh
$ rcli generate component -c ComponentName
```

By default, this will generate components and put them in your application's `src/cmoponents` folder. If you want to change that, just use the `-d, --directory` flag:

```sh
$ rcli generate component -c ComponentName -d some/other/directory
```

You can also specify whether the generated component should be a stateless component with the `-s, --stateless` flag:

```sh
$ rcli generate component -c ComponentName -s
```

In addition, you can scaffold out a component folder with an included CSS file for working with CSS Modules by using the `-f, --folder` flag:

```sh
$ rcli generate component -c ComponentName -f
```

Finally, you can choose to include a test for your component in the directory's `__tests__` folder by using the `--include-test` flag:

```sh
$ rcli generate component -c ComponentName -t
```
