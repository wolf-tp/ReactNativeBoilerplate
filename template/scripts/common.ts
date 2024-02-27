/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs';
import path from 'path';

/**
 * @typedef {Object} IValueBuffer
 * @property {Buffer} buf
 * @property {"string" | "object" | "array"} type
 * @property {string} split
 */

export const rootDir = __dirname.replace(/\/scripts/g, '/src');
/**
 * @param {string} string - input string
 * @returns
 */
export const capitalizeFirstLetter = string =>
  string?.charAt(0).toUpperCase() + string?.slice(1);
/**
 * @param {string} string - input string
 * @returns
 */
export const lowerCaseFirstLetter = string =>
  string?.charAt(0).toLocaleLowerCase() + string?.slice(1);
/**
 * @param  {...string} params
 */
export const withHyphen = (...params) => params?.join('-');

export const loadEnvFile = (): any => {
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
};
/**
 * @param {string} stringName
 * @return string filename after format
 */
export const getFileNameByString = stringName =>
  stringName
    ?.trim()
    ?.replace(/([a-z])([A-Z])/g, '$1-$2')
    ?.replace(/[ -]+/g, '-')
    ?.toLocaleLowerCase();
/**
 * @param {string} value
 * @returns string value or empty string if not found
 */
export const maybeString = value => value || '';
/**
 *
 * @param {string} path
 * @returns
 */
export const existPath = path => fs.existsSync(path);
/**
 * @param {IValueBuffer} option
 */
export const buffetToValue = ({ buf, type }) => {
  const buffString = buf.toString();
  if (type === 'string') return buffString;

  try {
    return type === 'object'
      ? JSON.parse(buffString)
      : buffString.split('\n').slice(0, -1);
  } catch (error) {
    return null;
  }
};
