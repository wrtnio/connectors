import { Logger } from "@nestjs/common";

export function retry<T extends any[], ReturnType>(
  fn: (...args: T) => ReturnType,
  count: number = 5, // default로 5번까지는 재실행되게 한다.
) {
  const logger = new Logger("utils/retry");
  return async function (...args: T): Promise<Awaited<ReturnType>> {
    let attempts = 0;
    while (attempts < count) {
      try {
        return await fn(...args);
      } catch (error) {
        attempts++;
        if (attempts >= count) {
          throw error;
        }
        logger.debug(JSON.stringify(error));
      }
    }

    throw new Error(`${fn.name} failed count: ${count}`);
  };
}
