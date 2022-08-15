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
          type: 'append',
          path: '../src/app/redux/saga/index.ts',
          template: "export * from './{{dashCase inputName}}-saga';",
        },
      );
      appendNotExist(actions);
      return actions;
    },
  });
};
