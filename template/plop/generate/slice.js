const { appendNotExist } = require('./common');
module.exports = function generateComponent(
  /** @type {import('plop').NodePlopAPI} */ plop,
) {
  plop.setGenerator('slice', {
    prompts: [
      {
        type: 'input',
        name: 'inputName',
        filter: input => input.replace(/slice/gi, ''),
        message: 'Input Slice name: ',
      },
    ],
    actions: () => {
      /**@type {import('plop').ActionType[]} */
      const actions = [];
      actions.push(
        {
          type: 'add',
          path: '../src/app/redux/action-slice/{{dashCase inputName}}-slice.ts',
          abortOnFail: true,
          templateFile: '../src/template/slice.ts.hbs',
        },
        {
          type: 'modify',
          pattern: /(\r\n|\n|\r)/gm,
          path: '../src/app/redux/action-slice/index.ts',
          template: "\nexport * from './{{dashCase inputName}}-slice';\n",
        },
        {
          type: 'append',
          path: '../src/app/redux/store/all-reducers.ts',
          pattern: '/* LIST ALL REDUCER. */',
          template:
            '  {{camelCase inputName}}: slices.{{camelCase inputName}}Reducer,',
        },
      );
      appendNotExist(actions);
      return actions;
    },
  });
};
