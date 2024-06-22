export const ObjectToQueryString = (obj: object): string => {
  return Object.entries(obj)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
};
