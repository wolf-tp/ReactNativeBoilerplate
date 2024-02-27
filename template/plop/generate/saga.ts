import { ActionType, NodePlopAPI } from 'plop';

import { appendNotExist } from './common';

export default function generateComponent(plop: NodePlopAPI) {
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
      const actions: ActionType[] = [];

      actions.push(
        {
          type: 'add',
          path: '../src/app/redux/saga/{{dashCase inputName}}-saga.tsx',
          abortOnFail: true,
          templateFile: '../src/template/saga.ts.hbs',
        },
        {
          type: 'modify',
          pattern: /[^\S\n\r]*\n$/,
          path: '../src/app/redux/saga/index.ts',
          template: "\nexport * from './{{dashCase inputName}}-saga';\n",
        },
      );
      appendNotExist(actions);
      return actions;
    },
  });
}
