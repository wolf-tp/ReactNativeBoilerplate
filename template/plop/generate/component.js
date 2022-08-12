module.exports = function generateComponent(
  /** @type {import('plop').NodePlopAPI} */ plop,
) {
  plop.setGenerator('component', {
    prompts: [
      {
        type: 'input',
        name: 'inputName',
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
          type: 'append',
          path: '../src/app/components/index.ts',
          template: "export * from './{{dashCase inputName}}';",
        },
      );
      return actions;
    },
  });
};
