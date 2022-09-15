/* eslint-disable @typescript-eslint/no-var-requires */
const { appendNotExist } = require('./common');
module.exports = function generateComponent(
  /** @type {import('plop').NodePlopAPI} */ plop,
) {
  plop.setGenerator('saga', {
    prompts: [
      {
        type: 'input',
        name: 'inputName',
        filter: input => input.replace(/saga/gi, ''),
        message: 'Input Saga name: ',
      },
    ],
    actions: () => {
      /**@type {import('plop').ActionType[]} */
      const actions = [];
      actions.push(
        {
          type: 'add',
          path: '../src/app/redux/saga/{{dashCase inputName}}-saga.tsx',
          abortOnFail: true,
          templateFile: '../src/template/saga.ts.hbs',
        },
        {
          type: 'modify',
          pattern: /(\r\n|\n|\r)/gm,
          path: '../src/app/redux/saga/index.ts',
          template: "\nexport * from './{{dashCase inputName}}-saga';\n",
        },
      );
      appendNotExist(actions);
      return actions;
    },
  });
};
