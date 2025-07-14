import { ELSProps } from "../constants/ELSProps";
import { LsData } from "../models/LsData";

export function getLSItem<T extends ELSProps>(
  key: T
): Promise<LsData[T] | undefined> {
  return new Promise((resolve) => {
    if (!window.Telegram?.WebApp.initData) {
      const data = localStorage.getItem(key);
      if (!data) {
        resolve(undefined);
        return;
      }
      try {
        resolve(JSON.parse(data) as LsData[typeof key]);
      } catch {
        resolve(data as LsData[typeof key]);
      }
      return;
    }

    window.Telegram.WebApp.CloudStorage.getItem(
      key,
      (error: string | null, value: any) => {
        if (error) {
          resolve(undefined);
        } else {
          resolve(value);
        }
      }
    );
  });
}

export function getLSItems(
  keys: string[]
): Promise<Record<string, string> | undefined> {
  return new Promise((resolve) => {
    if (!window.Telegram?.WebApp.initData) {
      const result: Record<string, any> = {};
      let error: string | null = null;

      keys.forEach((key) => {
        const data = localStorage.getItem(key);
        if (data === null) {
          error = "data not found";
          result[key] = null;
        } else {
          try {
            result[key] = JSON.parse(data);
          } catch {
            result[key] = data;
          }
        }
      });

      if (error) {
        resolve(undefined);
      } else {
        resolve(result);
      }
      return;
    }

    window.Telegram.WebApp.CloudStorage.getItems(keys, (error, values) => {
      if (error || !values) {
        resolve(undefined);
      } else {
        resolve(values);
      }
    });
  });
}

export const setLSItem = <T>(key: string, data: T) => {
  const stringifiedData =
    typeof data === "string" ? data : JSON.stringify(data);
  if (!window.Telegram?.WebApp.initData) {
    localStorage.setItem(key, stringifiedData);
    return;
  }

  window.Telegram.WebApp.CloudStorage.setItem(key, stringifiedData);
};

export const removeLSItem = (key: string) => {
  if (!window.Telegram?.WebApp.initData) {
    localStorage.removeItem(key);
    return;
  }

  window.Telegram.WebApp.CloudStorage.removeItem(key);
};
