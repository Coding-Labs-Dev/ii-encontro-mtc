const PREFIX = process.env.LOCAL_STORAGE_PREFIX;

export const getLocalStorageKey = (key: string) => `${PREFIX}/${key}`;

export const getLocalStorageItem = (rawKey: string, parse = true) => {
  const key = getLocalStorageKey(rawKey);
  try {
    const data = localStorage.getItem(key);
    if (data && parse) return JSON.parse(data);
    return data;
  } catch (e) {
    localStorage.removeItem(key);
    return null;
  }
};

export const saveLocalStorageItem = (
  rawKey: string,
  data: any,
  parse = true
) => {
  try {
    const key = getLocalStorageKey(rawKey);
    localStorage.setItem(key, parse ? JSON.stringify(data) : data);
  } catch (e) {
    console.error(e);
  }
};

export const removeLocalStorageItem = (rawKey: string) => {
  const key = getLocalStorageKey(rawKey);
  localStorage.removeItem(key);
};

export const isLocaltStorageItemSet = (rawKey: string) => {
  const key = getLocalStorageKey(rawKey);
  const data = localStorage.getItem(key);
  return !!data && !!data.length;
};
