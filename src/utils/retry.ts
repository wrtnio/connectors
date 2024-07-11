const TIMEOUT = "TIMEOUT" as const;

export function retry<T extends any[], ReturnType>(
  fn: (...args: T) => ReturnType,
  count: number = 5, // default로 5번까지는 재실행되게 한다.
  timeLimit?: number,
) {
  return async function (...args: T): Promise<Awaited<ReturnType>> {
    let attempts = 0;
    while (attempts < count) {
      let timeoutId: NodeJS.Timeout | null = null;
      try {
        const response = await Promise.race([
          fn(...args),
          ...(timeLimit
            ? [
                new Promise<typeof TIMEOUT>((resolve) => {
                  timeoutId = setTimeout(() => resolve(TIMEOUT), timeLimit);
                }),
              ]
            : []),
        ]);

        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        if (response === TIMEOUT) {
          throw new Error("retry error : timeout");
        }

        return response;
      } catch (error) {
        attempts++;
        if (attempts >= count) {
          throw error;
        }

        console.log(attempts, JSON.stringify(error));
      }
    }

    throw new Error(`${fn.name} failed count: ${count}`);
  };
}
