// eslint-disable-next-line @typescript-eslint/no-var-requires
const { execSync } = require('child_process');

(function () {
  execSync('yarn patch-package', { stdio: 'inherit' });
  console.log('Link Done!!✨✨✨✨✨');
  if (process.platform === 'darwin') {
    execSync('cd ios && touch tmp.xcconfig');
    console.log(
      '                  🧐🧐🧐🧐🧐 Starting pod install!! 🧐🧐🧐🧐🧐',
    );
    execSync('cd ios && pod install', { stdio: 'inherit' });
    console.log('                      ✨✨✨✨✨ Pod done!!! ✨✨✨✨✨');
  }
})();
