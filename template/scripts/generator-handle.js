/**
 * @typedef {Object} GenerateParamsType
 * @property {string} flowType
 * @property {string} inputName
 * @property {string} targetFile
 * @property {string} fileName
 * @property {string} extensions
 */
const replace = require("replace-in-file");
const readline = require("readline");
const fs = require("fs");
const yargs = require("yargs/yargs");
const {
  capitalizeFirstLetter,
  getFileNameByString,
  rootDir,
  maybeString,
} = require("./common");

const yargsBuilder = yargs(process.argv.slice(2));
let [flowType, inputName] = yargsBuilder.argv._;
const log = console.log;

/**
 * @param {GenerateParamsType} params
 */
const getExtensionFile = ({ flowType }) =>
  ["screen", "component"].includes(flowType) ? "tsx" : "ts";

/**
 * @param {(value: string)=>void} onSuccess
 * @todo show prompt command line with question
 */
function promptInputName(onSuccess) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question(
    `Input name of ${capitalizeFirstLetter(flowType)}: `,
    (answer) => {
      if (!/^[a-zA-Z]+$/.test(answer)) {
        log(
          "❗️ Name is not valid, You can only enter characters and cannot be blank. ❗️"
        );
        return promptInputName();
      }
      inputName = answer;
      rl.close();
      onSuccess?.(answer);
    }
  );
}
/**
 * @param {GenerateParamsType} params
 */
function getPropertyGenerate({ flowType, inputName }) {
  const fileName = getFileNameByString(inputName);

  const targetFile = (() => {
    let targetDir = flowType + "s";
    let directoryFile = `/${fileName}`;

    switch (flowType) {
      case "screen":
        targetDir = "features";
        break;
      case "slice":
        targetDir = "redux/action-slice";
        directoryFile = "";
        break;
    }
    return `${rootDir}/app/${targetDir}${directoryFile}`;
  })();

  /**
   * @param {GenerateParamsType} params
   */
  const replaceDirectory = ({ flowType }) => {
    switch (flowType) {
      case "slice":
        return {
          directory: `${rootDir}/app/store/all-reducers.ts`,
          searchString: "});",
          insertString: `  ${inputName}: ${inputName}Slice.reducer,`,
        };
      default:
        return {};
    }
  };
  /**
   * @param {GenerateParamsType} params
   */
  const insertStringReferenceFile = (params) => {
    const { directory, insertString, searchString } = replaceDirectory(params);
    if (!directory) return;
    const allLines = fs.readFileSync(directory).toString().split("\n");
    allLines.every((line, index) => {
      // var newLine = line;
      const canInsert = line.includes(searchString);
      canInsert && allLines.splice(index, 0, insertString);
      return !canInsert;
    });

    fs.writeFileSync(directory, allLines.join("\n"));
  };

  return {
    extensions: getExtensionFile({ flowType }),
    fileName,
    targetFile,
    inputName,
    replaceDirectory,
    insertStringReferenceFile,
    flowType,
    inputName,
  };
}

/**
 * Function `generatorHandler` create a file corresponding to the flow
 * @param {GenerateParamsType} params
 */
const generatorHandler = (params) => {
  const {
    extensions,
    fileName,
    flowType,
    inputName,
    insertStringReferenceFile,
    targetFile,
  } = getPropertyGenerate(params);

  // Ignore add flow type if it is component
  const fileNameWithExtension =
    fileName + maybeString(["component"].includes(flowType) && "-" + flowType);

  const targetPath = `${targetFile}/${fileNameWithExtension}.${extensions}`;
  if (fs.existsSync(targetPath)) return;

  // Check directory exist or not. If no create directory
  !fs.existsSync(targetFile) && fs.mkdirSync(targetFile);

  // Append data to index file
  ["screen", "component"].includes(flowType)
    ? fs.appendFileSync(
        `${targetFile}/index.ts`,
        `export * from "./${fileNameWithExtension}";\n`
      )
    : insertStringReferenceFile(flowType);

  fs.copyFileSync(`${rootDir}/template/${flowType}.${extensions}`, targetPath);

  // Replace all characters BaseComponent to file name
  replace.sync({
    files: targetPath,
    processor: (input) =>
      input.replace(
        new RegExp("Base" + capitalizeFirstLetter(flowType), "g"),
        inputName + capitalizeFirstLetter(flowType)
      ),
  });
};

const exitApp = () => {
  yargsBuilder.showHelp();
  process.exit();
};
module.exports = {
  flowType,
  inputName,
  promptInputName,
  yargsBuilder,
  exitApp,
  getExtensionFile,
  generatorHandler,
};
