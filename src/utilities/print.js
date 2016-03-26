import chalk from 'chalk';
import moment from 'moment';

const APP_IDENTIFIER = chalk.underline('[rcli]');

export const print = (...messages) => {
  const timestamp = chalk.gray(moment().format('h:mm:ss'));

  console.log(timestamp, APP_IDENTIFIER, ...messages);
};

export const printError = (error) => {
  const timestamp = chalk.gray(moment().format('h:mm:ss'));

  console.log(
    timestamp,
    APP_IDENTIFIER,
    chalk.bgRed(`Error!`),
    chalk.bgBlack(error.message)
  );
  console.log(error.stack);
};

export const printWarning = (warning) => {
  const timestamp = chalk.gray(moment().format('h:mm:ss'));

  console.log(
    timestamp,
    APP_IDENTIFIER,
    chalk.bgBlack(chalk.yellow('Warning:')),
    warning
  );
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
