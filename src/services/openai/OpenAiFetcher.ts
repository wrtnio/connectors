import { IConnection } from "@nestia/fetcher";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import { IMigrateRoute } from "@samchon/openapi";

import { IOpenAiDocument } from "./IOpenAiDocument";

export namespace OpenAiFetcher {
  export interface IProps {
    document: IOpenAiDocument;
    function: IOpenAiDocument.IFunction;
    connection: IConnection;
    input: any;
  }
  export const request = async (props: IProps) => {
    if (props.document.propertised === false)
      throw new Error("Not implemeneted yet for non-propertised API.");
    return PlainFetcher.fetch(props.connection, {
      method: props.function.method.toUpperCase() as "POST",
      path: getPath(props),
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
    });
  };

  const getPath = (props: Pick<IProps, "function" | "input">): string => {
    const route: IMigrateRoute = props.function.route();
    let path: string = route.emendedPath;
    for (const pp of route.parameters)
      path = path.replace(`:${pp.key}`, props.input[pp.name]);
    if (route.query && props.input.query)
      path += getvariable(props.input.query);
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
