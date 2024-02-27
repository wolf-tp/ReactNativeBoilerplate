import { execSync } from 'child_process';

import { loadEnvFile } from './common';

(async function () {
  if (process.platform !== 'darwin') {
    console.log('This script is only for macOS');
    return;
  }
  const envJson = await loadEnvFile();
  const simulator = 'iPhone 14 (16.0)';
  // try {
  //   execSync(`xcrun simctl list devices | grep "${simulator}" | grep "Booted"`);
  // } catch {
  //   execSync(`xcrun simctl boot "${simulator}"`);
  // }

  // // uninstall app using xcrun
  // execSync(`xcrun simctl uninstall booted "${envJson.BUNDLE_IDENTIFIER}"`);
  execSync(
    `npx react-native run-ios --scheme ${envJson.APP_PLACEHOLDER_NAME}-${envJson.APP_ENV} --simulator="${simulator}"`,
    { stdio: 'inherit' },
  );
})();
