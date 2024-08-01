export function createQueryParameter(targetObject: object): string {
  const queryParameter = Object.entries(targetObject)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return queryParameter;
}
