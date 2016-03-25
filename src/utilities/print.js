import chalk from 'chalk';
import moment from 'moment';

const APP_IDENTIFIER = '[rcli]';

export const print = (message) => {
  const timestamp = chalk.gray(moment().format('h:mm:ss'));

  console.log(`${timestamp} ${chalk.bgMagenta(APP_IDENTIFIER)} ${message}`);
};

export const printError = (error) => {
  console.log(`${chalk.bgRed(APP_IDENTIFIER)} Error!`);
  console.log(error.message);
  console.log(error.stack);
};

export const printOptions = (options) => options.reduce((acc, option, i) => {
  if (i === options.length - 1) {
    if (options.length === 2) {
      return `${acc} and ${option}`;
    } else {
      return `${acc}, and ${option}`;
    }
  }

  return `${acc}, ${option}`;
});
