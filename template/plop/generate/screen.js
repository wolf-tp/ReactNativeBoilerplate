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
        filter: input => input.replace(/screen/gi, ''),
        message: 'Input screen name: ',
      },
      {
        type: 'list',
        choices: ['Authorized', 'UnAuthorize', 'BottomNavigation'],
        name: 'type',
      },
    ],
    /**
     * @param {Object} data
     * @param {'Authorized' | 'UnAuthorize' | 'BottomNavigation'} data.type
     */
    actions: data => {
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
          type: 'modify',
          pattern: /[^\S\n\r]*\n$/,
          path: '../src/app/features/index.ts',
          template: "\nexport * from './{{dashCase inputName}}';\n",
        },
      );
      appendNotExist(actions);
      switch (data.type) {
        case 'Authorized':
        case 'UnAuthorize':
          const isAuthorized = data.type === 'Authorized';
          const fileName = isAuthorized
            ? 'authorized-navigation'
            : 'unauthorize-navigation';

          const typeName = isAuthorized ? 'Authorized' : 'UnAuthorize';

          actions.push(
            {
              type: 'append',
              path: `../src/app/root-navigation/${fileName}.tsx`,
              pattern: `{/* ===== Defined ${typeName}Stack ===== */}`,
              template:
                '      <Stack.Screen name="{{pascalCase inputName}}" component={screens.{{pascalCase inputName}}Screen} />',
            },
            {
              type: 'append',
              path: `../src/app/root-navigation/screen-list.ts`,
              pattern: `//${typeName}`,
              template:
                '  {{pascalCase inputName}}: undefined;',
            },
          );
          break;
        case 'BottomNavigation':
          break;
      }
      return actions;
    },
  });
};
