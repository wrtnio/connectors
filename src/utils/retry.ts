import { AxiosError } from "axios";
import typia from "typia";
import { IGoogleAds } from "../api/structures/connector/google_ads/IGoogleAds";
import { TypedSplit } from "./TypedSplit";

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

        /**
         * For Google Ads Connectors
         */
        if (error instanceof AxiosError) {
          if (typia.is<IGoogleAds.GoogleAdsError>(error.response?.data)) {
            error.response.data.error.details
              .flatMap((detail) => detail.errors)
              .find(async (googleError) => {
                if ("quotaError" in googleError.errorCode) {
                  const errorType = googleError.errorCode.quotaError;
                  if (errorType === "RESOURCE_EXHAUSTED") {
                    if (
                      typia.is<IGoogleAds.RESOURCE_EXHAUSTED_ERROR>(googleError)
                    ) {
                      const delay =
                        googleError.details.quotaErrorDetails.retryDelay;
                      const [seconds] = TypedSplit(delay, "s");

                      console.log(`delay ${seconds}s...`);
                      /**
                       * Wait for n seconds.
                       */
                      await new Promise<void>(async (res) => {
                        setTimeout(() => res(), Number(seconds) * 1000);
                      });
                    }
                  }
                }
              });
          }
        }

        console.log(attempts, JSON.stringify(error));
      }
    }

    throw new Error(`${fn.name} failed count: ${count}`);
  };
}
