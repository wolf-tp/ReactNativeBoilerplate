import { AppScreensParams } from './screen-list';

export type StackParams = {
  [key in keyof AppScreensParams]: AppScreensParams[key];
};

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends StackParams {}
  }
}
