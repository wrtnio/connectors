import {
  IMigrateDocument,
  IMigrateRoute,
  OpenApi,
  OpenApiV3,
} from "@samchon/openapi";
import { OpenApiTypeChecker } from "@samchon/openapi/lib/internal/OpenApiTypeChecker";
import { OpenApiV3Downgrader } from "@samchon/openapi/lib/internal/OpenApiV3Downgrader";
import typia from "typia";

import { IOpenAiDocument } from "./IOpenAiDocument";

export namespace OpenAiConverter {
  export interface IOptions {
    isKeywordParameter: boolean;
  }
  export const convert = (props: {
    document: OpenApi.IDocument;
    options: IOptions;
    migrated?: IMigrateDocument;
  }): IOpenAiDocument => {
    const migrated: IMigrateDocument = props.migrated
      ? props.migrated
      : OpenApi.migrate(props.document);
    const functions: IOpenAiDocument.IFunction[] = migrated.routes
      .map(convertFunction(props.options)(props.document.components))
      .filter((v): v is IOpenAiDocument.IFunction => v !== null);
    for (const [path, collection] of Object.entries(props.document.paths ?? {}))
      for (const method of Object.keys(collection))
        if (
          functions.find((v) => v.path === path && v.method === method) ===
          undefined
        )
          console.log(method, path, "has failed to escape $ref");
    return {
      openapi: "3.0.3",
      functions: functions,
      isKeywordParameter: props.options.isKeywordParameter,
    };
  };

  const convertFunction =
    (options: IOptions) =>
    (components: OpenApi.IComponents) =>
    (route: IMigrateRoute): IOpenAiDocument.IFunction | null => {
      const escape = escapeReference(components)(new Set());
      const parameter = {
        type: "object",
        properties: Object.fromEntries([
          ...route.parameters.map((p) => [
            p.key,
            {
              ...escape(p.schema),
              description: p.description ?? p.schema.description,
            },
          ]),
          ...(route.query
            ? [[route.query.key, escape(route.query.schema)]]
            : []),
          ...(route.body ? [[route.body.key, escape(route.body.schema)]] : []),
        ]),
      } satisfies OpenApiV3.IJsonSchema.IObject;
      if (Object.values(parameter.properties).some((v) => v === null))
        return null;

      const output: OpenApi.IJsonSchema | null | undefined = route.success
        ? escape(route.success.schema)
        : undefined;
      if (output === null) return null;

      const operation: OpenApi.IOperation = route.operation();
      return {
        method: typia.assert<OpenApiV3.Method>(route.method),
        path: route.path,
        name: route.accessor.join("_"),
        parameters: options.isKeywordParameter
          ? [
              OpenApiV3Downgrader.downgradeSchema({
                original: {},
                downgraded: {},
              })(parameter) as OpenApiV3.IJsonSchema.IObject,
            ]
          : Object.values(parameter.properties).map((v) =>
              OpenApiV3Downgrader.downgradeSchema({
                original: {},
                downgraded: {},
              })(v as any),
            ),
        output: output
          ? OpenApiV3Downgrader.downgradeSchema({
              original: {},
              downgraded: {},
            })(output)
          : undefined,
        description: (() => {
          if (operation.summary && operation.description) {
            return operation.description.startsWith(operation.summary)
              ? operation.description
              : [
                  operation.summary,
                  operation.summary.endsWith(".") ? "" : ".",
                  "\n\n",
                  operation.description,
                ].join("");
          }
          return operation.description ?? operation.summary;
        })(),
        route: () => route,
        operation: () => route.operation(),
      };
    };

  const escapeReference =
    (components: OpenApi.IComponents) =>
    (visited: Set<string>) =>
    (input: OpenApi.IJsonSchema): OpenApi.IJsonSchema | null => {
      if (OpenApiTypeChecker.isReference(input)) {
        // REFERENCE
        const name: string = input.$ref.split("#/components/schemas/")[1];
        const target: OpenApi.IJsonSchema | undefined =
          components.schemas?.[name];
        if (!target) return null;
        else if (visited.has(name)) return null;
        return escapeReference(components)(new Set([...visited, name]))(target);
      } else if (OpenApiTypeChecker.isOneOf(input)) {
        // ONE-OF
        const oneOf: Array<OpenApi.IJsonSchema | null> = input.oneOf.map(
          (schema) => escapeReference(components)(visited)(schema)!,
        );
        if (oneOf.some((v) => v === null)) return null;
        return {
          ...input,
          oneOf: oneOf as OpenApi.IJsonSchema[],
        };
      } else if (OpenApiTypeChecker.isObject(input)) {
        // OBJECT
        const properties:
          | Array<[string, OpenApi.IJsonSchema | null]>
          | undefined = input.properties
          ? Object.entries(input.properties).map(
              ([key, value]) =>
                [key, escapeReference(components)(visited)(value)] as const,
            )
          : undefined;
        const additionalProperties:
          | OpenApi.IJsonSchema
          | null
          | boolean
          | undefined = input.additionalProperties
          ? typeof input.additionalProperties === "object" &&
            input.additionalProperties !== null
            ? escapeReference(components)(visited)(input.additionalProperties)
            : input.additionalProperties
          : undefined;
        if (properties && properties.some(([_k, v]) => v === null)) return null;
        else if (additionalProperties === null) return null;
        return {
          ...input,
          properties: properties
            ? Object.fromEntries(
                properties.filter(([_k, v]) => !!v) as Array<
                  [string, OpenApi.IJsonSchema]
                >,
              )
            : undefined,
          additionalProperties,
        };
      } else if (OpenApiTypeChecker.isTuple(input)) {
        // TUPLE
        const prefixItems: Array<OpenApi.IJsonSchema | null> =
          input.prefixItems.map((schema) =>
            escapeReference(components)(visited)(schema),
          );
        const additionalItems:
          | OpenApi.IJsonSchema
          | null
          | boolean
          | undefined =
          typeof input.additionalItems === "object" &&
          input.additionalItems !== null
            ? escapeReference(components)(visited)(input.additionalItems)
            : input.additionalItems;
        if (prefixItems.some((v) => v === null)) return null;
        else if (additionalItems === null) return null;
        return {
          ...input,
          prefixItems: prefixItems as OpenApi.IJsonSchema[],
          additionalItems,
        };
      } else if (OpenApiTypeChecker.isArray(input)) {
        // ARRAY
        const items: OpenApi.IJsonSchema | null = escapeReference(components)(
          visited,
        )(input.items);
        if (items === null) return null;
        return {
          ...input,
          items,
        };
      }
      return input;
    };
}
