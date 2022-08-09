/**
 * @typedef {Object} GenerateParamsType
 * @property {'component' | 'screen' | 'flow' | 'slice' | 'saga'} flowType
 * @property {string} inputName
 * @property {string} targetFile
 * @property {string} fileName
 * @property {string} extensions
 *
 * @typedef {Object} NameType
 * @property {'sentence' | 'hyphen' | 'variable'} type
 *
 * @typedef {GenerateParamsType & NameType} GetNameParams
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
  withHyphen,
  lowerCaseFirstLetter,
} = require("./common");

const ALL_FLOW = ["component", "screen", "slice", "saga", "flow"];
const yargsBuilder = yargs(process.argv.slice(2));
let [flowType, inputName] = yargsBuilder.argv._;
const log = console.log;

/**
 * @param {boolean} isUIType
 */
const getExtensionFile = (isUIType) => (isUIType ? "tsx" : "ts");
/**
 * @param {string} value
 */
const removeFlowTypeFromString = (value) =>
  value?.replace(new RegExp(flowType, "i"), "");

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
  let fileName = getFileNameByString(inputName);
  let directoryFile = `/${fileName}`;

  let targetFile = (() => {
    let targetDir = flowType + "s";

    switch (flowType) {
      case "screen":
        targetDir = "features";
        break;
      case "slice":
        targetDir = "redux/action-slice";
        directoryFile = "";
        break;
      case "saga":
        targetDir = "redux/saga";
        directoryFile = "";
        break;
    }
    return `${rootDir}/app/${targetDir}${directoryFile}`;
  })();

  /**
   * @param {GenerateParamsType} params
   */
  const replaceDirectory = ({ flowType, inputName }) => {
    switch (flowType) {
      case "slice":
        const inputNameDisplay = removeFlowTypeFromString(inputName);
        return {
          directory: `${rootDir}/app/store/all-reducers.ts`,
          searchString: "});",
          insertString: `  ${inputNameDisplay}: slices.${inputNameDisplay}Reducer,`,
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
  const isUIType = ["screen", "component"].includes(flowType);

  return {
    extensions: getExtensionFile(isUIType),
    fileName,
    targetFile,
    inputName,
    replaceDirectory,
    insertStringReferenceFile,
    flowType,
    inputName,
    isComponent: flowType === "component",
    directoryFile,
    isUIType,
  };
}
/**
 * @param {GetNameParams} params
 * @todo Get string name follow `type` params :
 *
 * `sentence` : Capitalize the first letter of each word
 *
 * `hyphen` : Connect words with hyphens
 *
 * `variable` : Name 2 words in variable form
 */
const getName = ({
  flowType: flowTypeProps,
  inputName: inputNameParams,
  type,
}) => {
  const inputName = lowerCaseFirstLetter(inputNameParams);
  const flowType = maybeString(
    !["component"].includes(flowTypeProps) && flowTypeProps
  );

  switch (type) {
    case "sentence":
      return capitalizeFirstLetter(inputName) + capitalizeFirstLetter(flowType);
    case "hyphen":
      return withHyphen(...[inputName, flowType].filter((name) => !!name));
    case "variable":
      return inputName + capitalizeFirstLetter(flowType);
    default:
      return "";
  }
};

/**
 * Function `generatorHandler` create a file corresponding to the flow
 * @param {GenerateParamsType} params
 */
const generatorHandler = (params) => {
  let {
    extensions,
    fileName,
    flowType,
    inputName,
    insertStringReferenceFile,
    targetFile,
    isComponent,
    directoryFile,
    isUIType,
  } = getPropertyGenerate(params);
  // Ignore add flow type if it is component
  const fileNameWithExtension = getName({
    ...params,
    inputName: fileName,
    type: "hyphen",
  });
  const replaceName = getName({
    ...params,
    type: isUIType ? "sentence" : "variable",
  });

  const targetPath = `${targetFile}/${
    isComponent ? "index" : fileNameWithExtension
  }.${extensions}`;
  if (fs.existsSync(targetPath)) return;

  // Check directory exist or not. If no create directory
  !fs.existsSync(targetFile) && fs.mkdirSync(targetFile);

  isComponent && (targetFile = targetFile?.split(directoryFile)?.[0]);
  // Append data to index file
  fs.appendFileSync(
    `${targetFile}/index.ts`,
    `export * from "./${fileNameWithExtension}";\n`
  );
  insertStringReferenceFile({ ...params, inputName: replaceName });

  fs.copyFileSync(`${rootDir}/template/${flowType}.${extensions}`, targetPath);

  // Replace all characters BaseComponent to file name
  replace.sync({
    files: targetPath,
    processor: (input) =>
      input.replace(
        new RegExp("Base", "g"),
        removeFlowTypeFromString(replaceName)
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
  generatorHandler,
  ALL_FLOW,
};
