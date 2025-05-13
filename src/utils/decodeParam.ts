export const decodeParam = (rawQuery: string) => {
  const params = new URLSearchParams(rawQuery);
  const entries = [];

  for (const [key, value] of params.entries()) {
    try {
      const decodedValue = decodeURIComponent(value);
      entries.push(`${key}=${decodedValue}`);
    } catch {
      entries.push(`${key}=${value}`);
    }
  }

  return entries.join("&");
};
