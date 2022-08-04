#!/usr/bin/env node
var yargs = require("yargs/yargs");
const {
  promptInputName,
  flowType,
  inputName,
  targetFile,
  exitApp,
  yargsBuilder,
  replaceDirectory,
} = require("./generator-handle");
const {
  getFileNameByString,
  generatorHandler,
  rootDir,
  capitalizeFirstLetter,
} = require("./common");

var fs = require("fs");
// `  ${inputName}: ${inputName}Slice.reducer,`

// /**
//  * Generate new file, if it empty or contains special characters then exit functions
//  */
const generatorFile = () => {
  const onCreateFile = () =>
    generatorHandler({
      flowType,
      inputName,
      targetFile,
      fileName,
      extensions,
    });

  fileName ? onCreateFile() : promptInputName(onCreateFile);
};

// yargsBuilder
//   .command("component", "CustomName 👉 Make a component", generatorFile)
//   .command("screen", "CustomName 👉 Make a new screen", generatorFile)
//   .command("slice", "CustomName 👉 Make a new slice", generatorFile)
//   .help().argv;

// !["component", "screen", "slice", "saga"].includes(flowType) && exitApp();
