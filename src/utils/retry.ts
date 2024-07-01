export function retry<T extends any[]>(
  fn: (...args: T) => any,
  count: number = 5, // default로 5번까지는 재실행되게 한다.
) {
  return async function (...args: T): Promise<any> {
    let attempts = 0;
    while (attempts < count) {
      try {
        return await fn(...args);
      } catch (error) {
        attempts++;
        if (attempts >= count) {
          throw error;
        }
      }
    }
  };
}
