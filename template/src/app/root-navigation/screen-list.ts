import { createStackNavigator } from '@react-navigation/stack';

export type AuthorizedParams = {
  Home: undefined;
};
export type UnAuthorParams = {
  Home: undefined;
};

export type AppScreensParams = UnAuthorParams & AuthorizedParams;

export const Stack = createStackNavigator<AppScreensParams>();
