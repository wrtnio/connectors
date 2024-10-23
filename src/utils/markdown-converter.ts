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
    .flatMap((token: MarkedToken) => {
      const converter = input.converter?.[token.type];
      const hasChildren = "tokens" in token && (token.tokens?.length ?? 0) > 0;
      const hasItems = "items" in token && (token.items?.length ?? 0) > 0;
      const subs = hasChildren ? token.tokens : hasItems ? token.items : null;

      if (subs && subs?.length > 0) {
        if (converter?.recursive === true) {
          if (subs?.every<MarkedToken>(excludeGenericToken)) {
            return [
              ...converter?.convert?.(token, input.weight),
              ..._convert({
                tokenList: subs,
                converter: input.converter,
                defaultValue: input.defaultValue,
                weight: input.weight,
              }),
            ];
          }
        }
      }

      return converter?.convert?.(token, input.weight) ?? input.defaultValue;
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
