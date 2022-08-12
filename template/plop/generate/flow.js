const { exec } = require("child_process");

module.exports = function generateComponent(
  /** @type {import('plop').NodePlopAPI} */ plop
) {
  plop.setGenerator("flow", {
    prompts: [
      {
        type: "input",
        name: "inputName",
        message: "Input Flow name: ",
      },
    ],
    actions: (data) => {
      data.inputName;
      exec("yarn generate redux-flow " + data.inputName);
      exec("yarn generate screen " + data.inputName);
      return [];
    },
  });
};
