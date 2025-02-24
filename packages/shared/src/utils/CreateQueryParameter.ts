export function createQueryParameter(targetObject: object): string {
  const queryParameter = Object.entries(targetObject)
    .filter(([_key, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return queryParameter;
}
