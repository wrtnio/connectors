import { lexer, MarkedToken, TokensList } from "marked";
import typia from "typia";

type MarkdownConverter<T> = {
  [K in MarkedToken["type"]]?: {
    convert: (...args: any[]) => T;
    recursive?: boolean;
  };
};

const excludeGenericToken = typia.createIs<MarkedToken>();
function _convert<T>(input: {
  tokenList: TokensList | MarkedToken[];
  converter: MarkdownConverter<T[]>;
  defaultValue: T;
  weight?: number;
}): T[] {
  return input.tokenList
    .map((token) => {
      if (excludeGenericToken(token)) {
        return token;
      }
      return null;
    })
    .filter((el) => el !== null)
    .flatMap((token: MarkedToken, currentTokenIndex, arr) => {
      const previous = arr.slice(0, currentTokenIndex);
      const localWeight = previous
        .map((el) => {
          const localWeight = "text" in el ? el.text.length : 0;
          return localWeight;
        })
        .reduce((acc, cur) => acc + cur, 0);

      // 기본 값으로 무조건 1글자(줄바꿈)을 넣기 때문에 `currentTokenIndex`를 더해가야 한다.
      const finalWeight = (input.weight ?? 0) + localWeight + currentTokenIndex;

      console.log("localWeight: ", localWeight, finalWeight);
      const converter = input.converter?.[token.type];
      if ("tokens" in token && (token.tokens?.length ?? 0) > 0) {
        const children = token.tokens;
        if (converter?.recursive === true) {
          if (children?.every<MarkedToken>(excludeGenericToken)) {
            return _convert({
              tokenList: children,
              converter: input.converter,
              defaultValue: input.defaultValue,
              weight: finalWeight,
            });
          }
        }
      }

      return converter?.convert?.(token, finalWeight) ?? input.defaultValue;
    });
}

export function markdownConverter<T>(input: {
  markdownString: string;
  defaultValue: T;
  weight?: number;
  converter: MarkdownConverter<T[]>;
}) {
  const tokenList = lexer(input.markdownString);
  const converter = input.converter;
  const defaultValue = input.defaultValue;
  const weight = input.weight;
  return _convert<T>({ tokenList, converter, defaultValue, weight });
}
