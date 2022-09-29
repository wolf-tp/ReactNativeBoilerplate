import { useEffect } from 'react';
import {
  EmitterSubscription,
  NativeEventEmitter,
  NativeModules,
  processColor,
} from 'react-native';

import { isIOS } from '@common';

const { AppModule } = NativeModules;

export const getVersion = (): string => {
  return AppModule.getVersion();
};
export const getAppName = (): string => {
  return AppModule.getAppName();
};
export const getDeviceId = (): string => {
  return AppModule.getDeviceId();
};
export const setAppBadges = (count: number) => {
  if (typeof count !== 'number' || !isIOS) {
    return;
  }
  AppModule.setBadges(count);
};
export const clearNotification = () => {
  AppModule.clearNotification();
};
export const clearCache = () => {
  AppModule.clearCache();
};
export const checkChannelExist = (channelId: string) => {
  return new Promise<boolean>(rs => {
    if (isIOS) {
      rs(false);
    }
    AppModule.checkChannelExist(channelId).then((res: boolean) => {
      rs(res);
    });
  });
};

export const deleteChannel = (channelId: string) => {
  if (isIOS) {
    return;
  }
  AppModule.deleteChannel(channelId);
};

export const getBuildNumber = (): string => {
  return AppModule.getBuildNumber();
};
export const registerPhotosChanges = () => {
  if (isIOS) {
    AppModule.registerPhotosChanges();
  }
};

type Image = {
  uri: string;
  width?: number;
  height?: number;
};
type ImageResponse = {
  uri: string;
  name: string;
};
export const fixRotation = ({ uri, height = 800, width = 600 }: Image) => {
  return new Promise<ImageResponse>(rs => {
    if (isIOS) {
      AppModule.fixRotation(
        uri,
        width,
        height,
        (_?: string, res?: ImageResponse) => {
          if (res) {
            rs({ uri: res.uri, name: res.name });
          } else {
            rs({ uri: uri, name: 'new_image.png' });
          }
        },
      );
    } else {
      AppModule.fixRotation(uri, width, height, rs, () => {
        rs({ uri: uri, name: 'new_image.png' });
      });
    }
  });
};

export const usePhotosPermissionChange = (callback: () => void) => {
  // effect
  useEffect(() => {
    let photosChangeEvent: NativeEventEmitter,
      subscription: EmitterSubscription;
    if (isIOS) {
      photosChangeEvent = new NativeEventEmitter(AppModule);
      subscription = photosChangeEvent.addListener('PhotosChange', callback);
    }
    return () => {
      if (isIOS) {
        subscription.remove();
      }
    };
  }, [callback]);

  return null;
};

export const setEnableIQKeyboard = (enable: boolean) => {
  if (!isIOS) {
    return;
  }
  AppModule.setIQKeyboardOption({ enable });
};

export const hexStringFromCSSColor = (color: string) => {
  const processedColor = processColor(color);
  const colorStr = `${(processedColor ?? '').toString(16)}`;
  const withoutAlpha = colorStr.substring(2, colorStr.length);
  const alpha = colorStr.substring(0, 2);
  return `#${withoutAlpha}${alpha}`;
};

export const setIQKeyboardOption = (options: {
  enable?: boolean;
  layoutIfNeededOnUpdate?: boolean;
  enableDebugging?: boolean;
  keyboardDistanceFromTextField?: number;
  enableAutoToolbar?: boolean;
  toolbarDoneBarButtonItemText?: string;
  toolbarManageBehaviourBy?: 'subviews' | 'tag' | 'position';
  toolbarPreviousNextButtonEnable?: boolean;
  toolbarTintColor?: string;
  toolbarBarTintColor?: string;
  shouldShowToolbarPlaceholder?: boolean;
  overrideKeyboardAppearance?: boolean;
  keyboardAppearance?: 'default' | 'light' | 'dark';
  shouldResignOnTouchOutside?: boolean;
  shouldPlayInputClicks?: boolean;
  resignFirstResponder?: boolean;
  reloadLayoutIfNeeded?: boolean;
}) => {
  if (!isIOS) {
    return;
  }
  const actualOption = { ...options };
  if (options.toolbarBarTintColor) {
    actualOption.toolbarBarTintColor = hexStringFromCSSColor(
      options.toolbarBarTintColor,
    );
  }
  if (options.toolbarTintColor) {
    actualOption.toolbarTintColor = hexStringFromCSSColor(
      options.toolbarTintColor,
    );
  }
  AppModule.setIQKeyboardOption(actualOption);
};
