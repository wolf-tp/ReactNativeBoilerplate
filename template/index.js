import 'react-native-gesture-handler';
import './src/app/redux/store/store';
import { AppRegistry } from 'react-native';

import { name as appName } from './app.json';
import App from './src/app/App';

AppRegistry.registerComponent(appName, () => App);
