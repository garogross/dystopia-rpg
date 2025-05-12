export function getLSItem(key: string, clb: CloudStorageGetItemCallback): void {
  if (process.env.NODE_ENV === "development") return;
  // if (window.Telegram?.WebApp.CloudStorage)
  // window.Telegram.WebApp.CloudStorage.getItem(key, clb);
}

export function getLSItems(
  keys: string[],
  clb: CloudStorageGetItemsCallback
): void {
  if (process.env.NODE_ENV === "development") return;

  if (window.Telegram?.WebApp.CloudStorage)
    window.Telegram.WebApp.CloudStorage.getItems(keys, clb);
}

export const setLSItem = <T>(key: string, data: T) => {
  if (process.env.NODE_ENV === "development") return;

  if (window.Telegram?.WebApp.CloudStorage) {
    window.Telegram.WebApp.CloudStorage.setItem(key, JSON.stringify(data));
  }
};
export const removeLSItem = (key: string) => {
  if (process.env.NODE_ENV === "development") return;

  if (window.Telegram?.WebApp.CloudStorage) {
    window.Telegram.WebApp.CloudStorage.removeItem(key);
  }
};
