/* eslint-disable @typescript-eslint/no-var-requires */
const {execSync} = require('child_process');

const {loadEnvFile} = require('./common');

(async function () {
  if (process.platform !== 'darwin') {
    console.log('This script is only for macOS');
    return;
  }
  const envJson = await loadEnvFile();
  const simulator = 'iPhone 11';
  try {
    execSync(`xcrun simctl list devices | grep "${simulator}" | grep "Booted"`);
  } catch {
    execSync(`xcrun simctl boot "${simulator}"`);
  }

  // // uninstall app using xcrun
  execSync(`xcrun simctl uninstall booted "${envJson.BUNDLE_IDENTIFIER}"`);
  execSync(
    `npx react-native run-ios --scheme ${envJson.APP_PLACEHOLDER_NAME}-${envJson.APP_ENV} --simulator="${simulator} (13.7)"`,
    {stdio: 'inherit'},
  );
})();
