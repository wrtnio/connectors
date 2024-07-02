import { IConnection } from "@nestia/fetcher";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import { IMigrateRoute } from "@samchon/openapi";

import { IOpenAiDocument } from "./IOpenAiDocument";

export namespace OpenAiFetcher {
  export interface IProps {
    document: IOpenAiDocument;
    function: IOpenAiDocument.IFunction;
    connection: IConnection;
    arguments: any[];
  }
  export const request = async (props: IProps) => {
    const route = props.function.route();
    return PlainFetcher.fetch(
      props.connection,
      {
        method: props.function.method.toUpperCase() as "POST",
        path: props.document.isKeywordParameter === true
          ? getKeywordPath({
              function: props.function,
              input: props.arguments[0],
            })
          : getPositionalPath(props),
        template: props.function.path,
        status: null,
        request:
          props.function.method === "get"
            ? null
            : {
                type: "application/json",
                encrypted: false,
              },
        response: {
          type: "application/json",
          encrypted: false,
        },
      },
      route.body 
        ? props.document.isKeywordParameter 
          ? props.arguments[0].body 
          : props.arguments[route.parameters.length + (route.query ? 1: 0)]
        : undefined,
    );
  };

  const getKeywordPath = (props: {
    function: IOpenAiDocument.IFunction,
    input: Record<string, any>;
  }): string => {
    const route: IMigrateRoute = props.function.route();
    let path: string = route.emendedPath;
    for (const p of route.parameters)
      path = path.replace(`:${p.key}`, props.input[p.key] ?? "null");
    if (route.query)
      path += getvariable(props.input.query ?? {});
    return path;
  }

  const getPositionalPath = (props: {
    function: IOpenAiDocument.IFunction,
    arguments: any[];
  }): string => {
    const route: IMigrateRoute = props.function.route();
    let path: string = route.emendedPath;
    route.parameters.forEach((pp, i) => {
      path = path.replace(`:${pp.key}`, props.arguments[i]);
    });
    if (route.query)
      path += getvariable(props.arguments[route.parameters.length]);
    return path;
  };

  const getvariable = (query: any): string => {
    const variables: URLSearchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(query))
      if (undefined === value) continue;
      else if (Array.isArray(value))
        value.forEach((elem: any) => variables.append(key, String(elem)));
      else variables.set(key, String(value));
    return 0 === variables.size ? "" : `?${variables.toString()}`;
  };
}
