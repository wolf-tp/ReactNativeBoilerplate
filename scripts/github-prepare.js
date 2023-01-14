const { execSync } = require("child_process");

/**
 * @typedef {Object} IValueBuffer
 * @property {Buffer} buf
 * @property {"string" | "object" | "array"} type
 * @property {string} split
 */

/**
 * @param {IValueBuffer} option
 */
const buffetToValue = ({ buf, split, type }) => {
  const buffString = buf.toString();
  if (type === "string") return buffString;

  return type === "object" ? JSON.parse(buffString) : buffString.split("\n");
};

(async () => {
  const buffFilesName = execSync("find . -type f -maxdepth 1 -name '_*'");

  /** Handle copy file _ -> . in project
   * Example: _gitignore -> .gitignore
   * @type {string[]} */
  const filesName = buffetToValue({ buf: buffFilesName }).slice(0, -1);
  filesName.forEach((fName) => {
    if (!fName) return;
    const targetFileName = fName.replace("_", ".");
    execSync(`cp ${fName} ${targetFileName}`, { stdio: "inherit" });

    console.log(`Copy ${fName} -> ${targetFileName}`);
  });
})();
