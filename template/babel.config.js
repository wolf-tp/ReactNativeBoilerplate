module.exports = {
  presets: ['module:@react-native/babel-preset'],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
  plugins: [
    'react-native-reanimated/plugin',
    'babel-plugin-styled-components',
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@config': './src/app/config',
          '@assets': './src/app/assets',
          '@common': './src/app/common',
          '@hooks': './src/app/common/hooks',
          '@native-module': './src/app/common/native-module',
          '@animated': './src/app/common/animated',
          '@features': './src/app/features',
          '@components': './src/app/components',
          '@utils': './src/app/library/utils',
          '@storage': './src/app/library/utils/storage',
          '@model': './src/app/model',
          '@navigation': './src/app/root-navigation',
          '@store': './src/app/redux/store',
          '@redux-slice': './src/app/redux/action-slice',
          '@services': './src/app/redux/services',
          '@saga': './src/app/redux/saga',
          '@typed-redux-saga': './src/app/redux/typed-redux-saga',
          '@theme': './src/app/themes',
          '@template/*': './src/template/*',
          '@i18n': './src/app/i18n',
        },
      },
    ],
  ],
};
