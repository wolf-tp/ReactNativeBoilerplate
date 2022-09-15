const { exec, execSync } = require('child_process');

module.exports = function generateComponent(
  /** @type {import('plop').NodePlopAPI} */ plop,
) {
  plop.setGenerator('flow', {
    prompts: [
      {
        type: 'input',
        name: 'inputName',
        filter: input => input.replace(/flow/gi, ''),
        message: 'Input Flow name: ',
      },
    ],
    actions: data => {
      data.inputName;
      exec('yarn generate redux-flow ' + data.inputName);
      execSync('yarn generate screen ' + data.inputName, { stdio: 'inherit' });
      return [];
    },
  });
};
