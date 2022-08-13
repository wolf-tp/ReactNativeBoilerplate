/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

const rootDir = __dirname.replace(/\/scripts/g, '/src');
/**
 * @param {string} string - input string
 * @returns
 */
const capitalizeFirstLetter = string =>
  string?.charAt(0).toUpperCase() + string?.slice(1);
/**
 * @param {string} string - input string
 * @returns
 */
const lowerCaseFirstLetter = string =>
  string?.charAt(0).toLocaleLowerCase() + string?.slice(1);
/**
 * @param  {...string} params
 */
const withHyphen = (...params) => params?.join('-');

module.exports = {
  loadEnvFile: () => {
    return new Promise((resolve, reject) => {
      fs.readFile(path.join('./', process.argv[2]), 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        const envJson = data.split('\n').reduce((prev, curr) => {
          const firstEqualSign = curr.indexOf('=');
          const key = curr.slice(0, firstEqualSign);
          const value = curr.slice(firstEqualSign + 1);
          prev[key] = value;
          return prev;
        }, {});
        console.log({ envJson });
        resolve(envJson);
      });
    });
  },
  /**
   * @param {string} stringName
   * @return string filename after format
   */
  getFileNameByString: stringName =>
    stringName
      ?.trim()
      ?.replace(/([a-z])([A-Z])/g, '$1-$2')
      ?.replace(/[ -]+/g, '-')
      ?.toLocaleLowerCase(),
  rootDir,
  capitalizeFirstLetter,
  withHyphen,
  lowerCaseFirstLetter,
  /**
   * @param {string} value
   * @returns string value or empty string if not found
   */
  maybeString: value => value || '',
};
