import { ActionType, NodePlopAPI } from 'plop';

import { appendNotExist } from './common';

type DataType = {
  type: 'Authorized' | 'UnAuthorize' | 'BottomNavigation';
};

export default function generateComponent(plop: NodePlopAPI) {
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
    // @ts-ignore
    actions: (data: DataType) => {
      const actions: ActionType[] = [];
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
              template: '  {{pascalCase inputName}}: undefined;',
            },
          );
          break;
        case 'BottomNavigation':
          break;
      }
      return actions;
    },
  });
}
