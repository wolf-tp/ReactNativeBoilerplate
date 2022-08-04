const fs = require("fs");
const path = require("path");
const replace = require("replace-in-file");

const rootDir = __dirname.replace(/\/scripts/g, "/src");

const capitalizeFirstLetter = (string) => {
  return string?.charAt(0).toUpperCase() + string?.slice(1);
};

module.exports = {
  loadEnvFile: () => {
    return new Promise((resolve, reject) => {
      fs.readFile(path.join("./", process.argv[2]), "utf8", (err, data) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        const envJson = data.split("\n").reduce((prev, curr) => {
          const firstEqualSign = curr.indexOf("=");
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
  getFileNameByString: (stringName) =>
    stringName
      ?.trim()
      ?.replace(/([a-z])([A-Z])/g, "$1-$2")
      ?.replace(/[ -]+/g, "-")
      ?.toLocaleLowerCase(),
  generatorHandler,
  rootDir,
  capitalizeFirstLetter,
  maybeString: (value) => value || "",
};
