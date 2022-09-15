module.exports = function generateComponent(
  /** @type {import('plop').NodePlopAPI} */ plop,
) {
  plop.setGenerator('component', {
    prompts: [
      {
        type: 'input',
        name: 'inputName',
        filter: input => input.replace(/component/gi, ''),
        message: 'Input component name: ',
      },
    ],
    actions: () => {
      /**@type {import('plop').ActionType[]} */
      const actions = [];
      actions.push(
        {
          type: 'add',
          path: '../src/app/components/{{dashCase inputName}}/index.tsx',
          templateFile: '../src/template/component.tsx.hbs',
        },
        {
          type: 'modify',
          pattern: /[^\S\n\r]*\n$/,
          path: '../src/app/components/index.ts',
          template: "\nexport * from './{{dashCase inputName}}';\n",
        },
      );
      return actions;
    },
  });
};
