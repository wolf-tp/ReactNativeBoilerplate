import Config from 'react-native-config';
import { MMKV } from 'react-native-mmkv';

const appName = Config.APP_ENV;

export const AsyncStorage = new MMKV({
  id: `animo-${appName}-storage`,
  encryptionKey: Config.MMKV_ENCRYPTION_KEY,
});

/**
 * Loads a string from storage.
 *
 * @param key The key to fetch.
 */
export async function loadString(key: string): Promise<string | null> {
  try {
    return (await AsyncStorage.getString(key)) as string;
  } catch {
    // not sure why this would fail... even reading the RN docs I'm unclear
    return null;
  }
}

/**
 * Saves a string to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function saveString(key: string, value: string): Promise<boolean> {
  try {
    await AsyncStorage.set(key, value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Loads something from storage and runs it thru JSON.parse.
 *
 * @param key The key to fetch.
 */
export function load<T = unknown>(key: string): T | null {
  try {
    const almostThere = AsyncStorage.getString(key);
    return JSON.parse(almostThere ?? '');
  } catch {
    return null;
  }
}

/**
 * Saves an object to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function save(key: string, value: unknown): Promise<boolean> {
  try {
    AsyncStorage.set(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/**
 * Removes something from storage.
 *
 * @param key The key to kill.
 */
export async function remove(key: string): Promise<void> {
  try {
    await AsyncStorage.delete(key);
    // eslint-disable-next-line no-empty
  } catch {}
}

/**
 * Burn it all to the ground.
 */
export async function clear(): Promise<void> {
  try {
    await AsyncStorage.clearAll();
    // eslint-disable-next-line no-empty
  } catch {}
}

export const clientStorage = {
  setItem: save,
  getItem: load,
  removeItem: remove,
};
