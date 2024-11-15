export function convertAllPropertyToString(
  obj: Record<string, any>,
): Record<string, string> {
  return Object.entries(obj).reduce<Record<string, any>>(
    (acc, [key, value]) => {
      acc[key] = String(value);
      return acc;
    },
    {},
  );
}
