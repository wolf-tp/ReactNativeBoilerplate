const generateComponent = require('./generate/component');
const generateScreen = require('./generate/screen');
const generateSaga = require('./generate/saga');
const generateSlice = require('./generate/slice');
const generateReduxFlow = require('./generate/redux-flow');
const generateFlow = require('./generate/flow');

module.exports = function (
  /** @type {import('plop').NodePlopAPI} */
  plop,
) {
  generateComponent(plop);
  generateScreen(plop);
  generateSaga(plop);
  generateSlice(plop);
  generateReduxFlow(plop);
  generateFlow(plop);
};
