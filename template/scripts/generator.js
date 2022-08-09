#!/usr/bin/env node
const {
  promptInputName,
  inputName,
  exitApp,
  yargsBuilder,
  generatorHandler,
  flowType,
  ALL_FLOW,
} = require("./generator-handle");

/**
 * @param {string} inputNamePrompt
 * @param {string} flowParams
 */
const onStartGenerate = (inputNamePrompt, flowParams) =>
  generatorHandler({
    flowType: flowParams || flowType,
    inputName: inputNamePrompt || inputName,
  });

/**
 * @param {( value: string ) => void} callback
 * Generate new file, if it empty or contains special characters then exit functions
 */
const checkPromptQuestion = (callback) => {
  inputName ? callback(inputName) : promptInputName(callback);
};

const generatorFile = () => checkPromptQuestion(onStartGenerate);
/**
 * @param {string} inputName
 */
const onStartGenerateAllFlow = (inputName) => {
  //
  const generateFlows = ALL_FLOW.filter(
    (value) => !["flow", "component"]?.includes(value)
  );
  generateFlows?.forEach((flowType) => onStartGenerate(inputName, flowType));
};

yargsBuilder
  .command("component", "CustomName 👉 Make a component", generatorFile)
  .command("screen", "CustomName 👉 Make a new screen", generatorFile)
  .command("slice", "CustomName 👉 Make a new slice", generatorFile)
  .command("saga", "CustomName 👉 Make a new saga", generatorFile)
  .command("flow", "CustomName 👉 Make a new flow", () =>
    checkPromptQuestion(onStartGenerateAllFlow)
  )
  .help().argv;

!ALL_FLOW.includes(flowType) && exitApp();
