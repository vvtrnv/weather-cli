import chalk from 'chalk';

const errorStyle = chalk.bgRed;
const warningStyle = chalk.bgYellow;
const successStyle = chalk.bgGreen;
const infoStyle = chalk.bgBlue;

export const logError = (err) => {
  console.log(errorStyle('ERROR '), err);
}

export const logWarning = (warn) => {
  console.log(warningStyle('WARN ', warn));
}

export const logSuccess = (msg) => {
  console.log(successStyle('SUCCESS '), msg);
}

export const logInfo = (info) => {
  console.log(infoStyle('INFO '), info);
}
