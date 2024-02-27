declare module 'react-native-config' {
  export interface NativeConfig {
    APP_ENV?: string;
    API_URL?: string;
    APP_DISPLAY_NAME?: string;
    APP_PLACEHOLDER_NAME?: string;
    VERSION_CODE?: string;
    VERSION_NAME?: string;
    BUNDLE_IDENTIFIER?: string;
    DEFAULT_FALLBACK_LNG_I18n?: string;
    CODE_PUSH_KEY_IOS?: string;
    CODE_PUSH_KEY_ANDROID?: string;
    CODE_PUSH_APP_SECRET_IOS?: string;
    MMKV_ENCRYPTION_KEY?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
