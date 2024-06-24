import { IMigrateProgram } from "@nestia/migrate";
import { MigrateAnalyzer } from "@nestia/migrate/lib/analyzers/MigrateAnalyzer";
import { MigrateApiProgrammer } from "@nestia/migrate/lib/programmers/MigrateApiProgrammer";
import { IMigrateRoute } from "@nestia/migrate/lib/structures/IMigrateRoute";
import { OpenApi, OpenApiV3 } from "@samchon/openapi";
import { OpenApiTypeChecker } from "@samchon/openapi/lib/internal/OpenApiTypeChecker";
import { OpenApiV3Downgrader } from "@samchon/openapi/lib/internal/OpenApiV3Downgrader";
import typia from "typia";

import { IOpenAiDocument } from "./IOpenAiDocument";

export namespace OpenAiConverter {
  export const convert = (document: OpenApi.IDocument): IOpenAiDocument => {
    const program: IMigrateProgram = MigrateAnalyzer.analyze({
      mode: "sdk",
      document,
      dictionary: new Map(),
      simulate: false,
      e2e: false,
    });
    MigrateApiProgrammer.write(program);
    const operations: Array<IOpenAiDocument.IOperation> = program.controllers
      .map((c) => c.routes)
      .flat()
      .map(convertOperation(program.document.components))
      .filter((v) => v !== null) as IOpenAiDocument.IOperation[];
    for (const [path, collection] of Object.entries(document.paths ?? {}))
      for (const method of Object.keys(collection))
        if (
          operations.find((v) => v.path === path && v.method === method) ===
          undefined
        )
          console.log(method, path, "has failed to escape $ref");
    return {
      openapi: "3.0.3",
      operations: operations,
    };
  };

  const convertOperation =
    (components: OpenApi.IComponents) =>
    (route: IMigrateRoute): IOpenAiDocument.IOperation | null => {
      const parameters: Array<OpenApi.IJsonSchema | null> =
        route.parameters.map((p) =>
          escapeReference(components)(new Set())(p.schema),
        );
      if (route.query)
        parameters.push(
          escapeReference(components)(new Set())(route.query.schema),
        );
      if (route.body)
        parameters.push(
          escapeReference(components)(new Set())(route.body.schema),
        );
      if (parameters.some((v) => v === null)) return null;
      return {
        method: typia.assert<OpenApiV3.Method>(route.method),
        path: route.originalPath,
        name: route.accessor.join("_"),
        parameters: (parameters as OpenApi.IJsonSchema[]).map((schema) =>
          OpenApiV3Downgrader.downgradeSchema({
            original: {},
            downgraded: {},
          })(schema),
        ),
        description: route.comment(),
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
