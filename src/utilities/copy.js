import chalk from 'chalk';
import { cp } from 'shelljs';

export const copy = (name, source, dest) => {
  console.log(
    `${chalk.cyan('[rcli]')} Writing file \`${name}\``,
  );

  cp(source, dest);
};

export const copyR = (dir, source, dest) => {
  console.log(
    `${chalk.cyan('[rcli]')} Writing directory \`${dir}\``,
  );

  cp('-R', source, dest);
};
