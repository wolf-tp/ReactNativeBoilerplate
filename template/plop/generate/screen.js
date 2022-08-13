/* eslint-disable @typescript-eslint/no-var-requires */
const { appendNotExist } = require('./common');
module.exports = function generateComponent(
  /** @type {import('plop').NodePlopAPI} */ plop,
) {
  plop.setGenerator('screen', {
    prompts: [
      {
        type: 'input',
        name: 'inputName',
        message: 'Input screen name: ',
      },
    ],
    actions: () => {
      /**@type {import('plop').ActionType[]} */
      const actions = [];
      actions.push(
        {
          type: 'add',
          path: '../src/app/features/{{dashCase inputName}}/index.tsx',
          abortOnFail: true,
          templateFile: '../src/template/screen.tsx.hbs',
        },
        {
          type: 'append',
          path: '../src/app/features/index.ts',
          template: "export * from './{{dashCase inputName}}';",
        },
      );
      appendNotExist(actions);
      return actions;
    },
  });
};
