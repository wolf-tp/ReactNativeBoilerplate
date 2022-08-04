const readline = require("readline");
var fs = require("fs");
var yargs = require("yargs/yargs");
const {
  capitalizeFirstLetter,
  getFileNameByString,
  rootDir,
} = require("./common");
const yargsBuilder = yargs(process.argv.slice(2));

let [flowType, inputName] = yargsBuilder.argv._;

const log = console.log;

const fileName = getFileNameByString(inputName);
const extensionFile = ["screen"].includes(flowType) ? "tsx" : "ts";

const replaceDirectory = (() => {
  const directory = (() => {
    switch (flowType) {
      case "slice":
        return {
          directory: `${rootDir}/app/store/all-reducers.ts`,
          searchString: "});",
          insertString: `  ${inputName}: ${inputName}Slice.reducer,`,
        };
      case "saga":
        return {
          directory: `${rootDir}/app/redux/store/root-sagas.ts`,
          searchString: "]);",
          insertString: `${inputName}Slice.reducer,`,
        };
    }
  })();
  return directory;
})();

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
      onSuccess?.();
    }
  );
}
function insertStringReferenceFile({ searchString, insertString, flowType }) {
  const allLines = fs.readFileSync(replaceDirectory).toString().split("\n");
  allLines.every((line, index) => {
    // var newLine = line;
    const canInsert = line.includes(searchString);
    canInsert && allLines.splice(index, 0, insertString);
    return !canInsert;
  });

  fs.writeFileSync(replaceDirectory, allLines.join("\n"));
}

/**
 * Function `generatorHandler` create a file corresponding to the flow
 */
const generatorHandler = ({
  inputName,
  flowType,
  targetFile,
  fileName,
  extensions,
}) => {
  extensions = extensions || "tsx";
  fileName = fileName + "-" + flowType;

  const targetPath = `${targetFile}/${fileName}.${extensions}`;
  if (fs.existsSync(targetPath)) return;

  // Check directory exist or not. If no create directory
  !fs.existsSync(targetFile) && fs.mkdirSync(targetFile);

  // Append data to index file
  ["screen"].includes(flowType)
    ? fs.appendFileSync(
        `${targetFile}/index.ts`,
        `export * from "./${fileName}";\n`
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
  targetFile,
  yargsBuilder,
  exitApp,
  replaceDirectory,
  insertStringReferenceFile,
  extensionFile,
};
