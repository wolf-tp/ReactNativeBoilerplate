#!/usr/bin/env node
var yargs = require("yargs/yargs");
const {
  promptInputName,
  inputName,
  exitApp,
  yargsBuilder,
  generatorHandler,
  getExtensionFile,
  flowType,
} = require("./generator-handle");
const {
  getFileNameByString,
  rootDir,
  capitalizeFirstLetter,
} = require("./common");

var fs = require("fs");

// /**
//  * Generate new file, if it empty or contains special characters then exit functions
//  */
const generatorFile = () => {
  /**
   * @param {string} inputNamePrompt
   */
  const onStartGenerate = (inputNamePrompt) =>
    generatorHandler({
      flowType,
      inputName: inputNamePrompt || inputName,
    });

  inputName ? onStartGenerate() : promptInputName(onStartGenerate);
};

yargsBuilder
  .command("component", "CustomName 👉 Make a component", generatorFile)
  .command("screen", "CustomName 👉 Make a new screen", generatorFile)
  .command("slice", "CustomName 👉 Make a new slice", generatorFile)
  .help().argv;

!["component", "screen", "slice", "saga"].includes(flowType) && exitApp();
