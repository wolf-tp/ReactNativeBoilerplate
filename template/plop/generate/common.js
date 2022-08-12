module.exports = {
  /**
   * @returns {import('plop').ActionType[]}
   */
  appendNotExist: (
    /**@type {import('plop').ActionType[]}*/
    actions
  ) => {
    const listAppendActions = [];
    actions.forEach(
      (item) => item.type === "append" && listAppendActions.push(item)
    );
    listAppendActions.forEach((action) =>
      actions.splice(actions.indexOf(action), 0, {
        type: "add",
        skipIfExists: true,
        path: action.path,
      })
    );
  },
};
