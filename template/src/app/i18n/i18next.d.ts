import 'i18next';

import { langs } from '.';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'en';
    jsonFormat: 'v3';
    resources: typeof langs;
  }
}
