const { exec } = require("child_process");

module.exports = function generateComponent(
  /** @type {import('plop').NodePlopAPI} */ plop
) {
  plop.setGenerator("redux-flow", {
    prompts: [
      {
        type: "input",
        name: "inputName",
        message: "Input Redux Flow name: ",
      },
    ],
    actions: (data) => {
      data.inputName;
      exec("yarn generate saga " + data.inputName);
      exec("yarn generate slice " + data.inputName);
      return [];
    },
  });
};
