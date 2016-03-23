import path from 'path';
import { cp } from 'shelljs';
import mkdirp from 'mkdirp';
import { command } from './command';
import { copy, copyR } from '../utilities/copy';

const blueprintPath = path.resolve(process.cwd(), 'src', 'blueprints', 'base');
const hiddenFiles = ['.babelrc', '.eslintrc', '.gitignore'];

export const newCommand = command({
  name: 'new <appName>',
  handler: (appName, program) => {
    const { directory } = program.parent;
    let distPath;

    if (directory) {
      distPath = path.join(process.cwd(), directory, appName);
    } else {
      distPath = path.join(process.cwd(), appName);
    }

    copyR(appName, blueprintPath, distPath);

    hiddenFiles.forEach((file) => {
      copy(
        file,
        path.join(blueprintPath, file),
        path.join(distPath, file)
      );
    });
  },
});
