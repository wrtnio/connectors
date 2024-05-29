import { ISwaggerComponents } from "../structures/openapi/ISwaggerComponents";
import { ISwaggerSchema } from "../structures/openapi/ISwaggerSchema";
import { MapUtil } from "./MapUtil";

export namespace SwaggerTypeChecker {
  /* -----------------------------------------------------------
    TYPE CHECKERS
  ----------------------------------------------------------- */
  export const isAnyOf = (
    schema: ISwaggerSchema,
  ): schema is ISwaggerSchema.IAnyOf => (schema as any).anyOf !== undefined;

  export const isOneOf = (
    schema: ISwaggerSchema,
  ): schema is ISwaggerSchema.IOneOf => (schema as any).oneOf !== undefined;

  export const isNullOnly = (
    schema: ISwaggerSchema,
  ): schema is ISwaggerSchema.INullOnly => (schema as any).type === "null";

  export const isBoolean = (
    schema: ISwaggerSchema,
  ): schema is ISwaggerSchema.IBoolean => (schema as any).type === "boolean";

  export const isInteger = (
    schema: ISwaggerSchema,
  ): schema is ISwaggerSchema.IInteger => (schema as any).type === "integer";

  export const isNumber = (
    schema: ISwaggerSchema,
  ): schema is ISwaggerSchema.INumber => (schema as any).type === "number";

  export const isString = (
    schema: ISwaggerSchema,
  ): schema is ISwaggerSchema.IString => (schema as any).type === "string";

  export const isArray = (
    schema: ISwaggerSchema,
  ): schema is ISwaggerSchema.IArray => (schema as any).type === "array";

  export const isObject = (
    schema: ISwaggerSchema,
  ): schema is ISwaggerSchema.IObject => (schema as any).type === "object";

  export const isReference = (
    schema: ISwaggerSchema,
  ): schema is ISwaggerSchema.IReference => (schema as any).$ref !== undefined;

  export const isUnknown = (
    schema: ISwaggerSchema,
  ): schema is ISwaggerSchema.IUnknown =>
    (schema as any).type === undefined &&
    !isAnyOf(schema) &&
    !isOneOf(schema) &&
    !isReference(schema);

  export const isNullable =
    (components: ISwaggerComponents) =>
    (schema: ISwaggerSchema): boolean => {
      if (SwaggerTypeChecker.isAnyOf(schema))
        return schema.anyOf.some(isNullable(components));
      else if (SwaggerTypeChecker.isOneOf(schema))
        return schema.oneOf.some(isNullable(components));
      else if (SwaggerTypeChecker.isReference(schema)) {
        const $id = schema.$ref.replace("#/components/schemas/", "");
        const target = (components.schemas ?? {})[$id];
        return target === undefined ? false : isNullable(components)(target);
      }
      return (schema as ISwaggerSchema.IString).nullable === true;
    };

  /* -----------------------------------------------------------
    DEEP CHECKERS
  ----------------------------------------------------------- */
  export const containsReference = (schema: ISwaggerSchema): boolean =>
    isReference(schema) ||
    (isAnyOf(schema) && schema.anyOf.some(containsReference)) ||
    (isOneOf(schema) && schema.oneOf.some(containsReference)) ||
    (isObject(schema) &&
      Object.values(schema.properties ?? {}).some(containsReference)) ||
    (isArray(schema) && containsReference(schema.items));

  /* -----------------------------------------------------------
    OPERATORS
  ----------------------------------------------------------- */
  export const covers = (
    components: ISwaggerComponents,
  ): ((x: ISwaggerSchema, y: ISwaggerSchema) => boolean) =>
    coverStation(components)(new Map());

  const coverStation =
    (components: ISwaggerComponents) =>
    (visited: Map<ISwaggerSchema, Map<ISwaggerSchema, boolean>>) =>
    (x: ISwaggerSchema, y: ISwaggerSchema): boolean => {
      const cache: boolean | undefined = visited.get(x)?.get(y);
      if (cache !== undefined) return cache;

      // FOR RECURSIVE CASE
      const nested: Map<ISwaggerSchema, boolean> = MapUtil.take(visited)(
        x,
        () => new Map(),
      );
      nested.set(y, true);

      // COMPUTE IT
      const result: boolean = coverSchema(components)(visited)(x, y);
      nested.set(y, result);
      return result;
    };

  const coverSchema =
    (components: ISwaggerComponents) =>
    (visited: Map<ISwaggerSchema, Map<ISwaggerSchema, boolean>>) =>
    (x: ISwaggerSchema, y: ISwaggerSchema): boolean => {
      // CHECK EQUALITY
      if (x === y) return true;
      else if (isReference(x) && isReference(y) && x.$ref === y.$ref)
        return true;

      // COMPARE WITH FLATTENING
      const alpha: ISwaggerSchema[] = flatSchema(components)(x);
      const beta: ISwaggerSchema[] = flatSchema(components)(y);
      if (alpha.some((x) => isUnknown(x))) return true;
      else if (beta.some((x) => isUnknown(x))) return false;
      else if (
        alpha.every((a) => !isNullOnly(a) && !isNullable(components)(a)) &&
        beta.some((b) => isNullOnly(b) || isNullable(components)(b))
      )
        return false;
      return beta
        .filter((x) => !isNullOnly(x))
        .every((b) =>
          alpha
            .filter((x) => !isNullOnly(x))
            .some((a) => coverEscapedSchema(components)(visited)(a, b)),
        );
    };

  const coverEscapedSchema =
    (components: ISwaggerComponents) =>
    (visited: Map<ISwaggerSchema, Map<ISwaggerSchema, boolean>>) =>
    (x: ISwaggerSchema, y: ISwaggerSchema): boolean => {
      if (x === y) return true;
      if (isUnknown(x)) return true;
      else if (isUnknown(y)) return false;

      if (isBoolean(x)) return isBoolean(y) && coverBoolean(x, y);
      else if (isInteger(x) || isNumber(x))
        return (isInteger(y) || isNumber(y)) && coverNumber(x, y);
      else if (isString(x)) return isString(y) && coverString(x, y);
      else if (isArray(x))
        return isArray(y) && coverArray(components)(visited)(x, y);
      else if (isObject(x))
        return isObject(y) && coverObject(components)(visited)(x, y);
      return false;
    };

  const coverArray =
    (components: ISwaggerComponents) =>
    (visited: Map<ISwaggerSchema, Map<ISwaggerSchema, boolean>>) =>
    (x: ISwaggerSchema.IArray, y: ISwaggerSchema.IArray): boolean => {
      if (
        !(
          x.minItems === undefined ||
          (y.minItems !== undefined && x.minItems <= y.minItems)
        )
      )
        return false;
      else if (
        !(
          x.maxItems === undefined ||
          (y.maxItems !== undefined && x.maxItems >= y.maxItems)
        )
      )
        return false;
      return coverStation(components)(visited)(x.items, y.items);
    };

  const coverObject =
    (components: ISwaggerComponents) =>
    (visited: Map<ISwaggerSchema, Map<ISwaggerSchema, boolean>>) =>
    (x: ISwaggerSchema.IObject, y: ISwaggerSchema.IObject): boolean => {
      if (!x.additionalProperties && !!y.additionalProperties) return false;
      else if (
        !!x.additionalProperties &&
        !!y.additionalProperties &&
        ((typeof x.additionalProperties === "object" &&
          y.additionalProperties === true) ||
          (typeof x.additionalProperties === "object" &&
            typeof y.additionalProperties === "object" &&
            !coverStation(components)(visited)(
              x.additionalProperties,
              y.additionalProperties,
            )))
      )
        return false;
      return Object.entries(y.properties ?? []).every(([key, b]) => {
        const a: ISwaggerSchema | undefined = x.properties?.[key];
        if (a === undefined) return false;
        else if (
          (x.required?.includes(key) ?? false) === true &&
          (y.required?.includes(key) ?? false) === false
        )
          return false;
        return coverStation(components)(visited)(a, b);
      });
    };

  const coverBoolean = (
    x: ISwaggerSchema.IBoolean,
    y: ISwaggerSchema.IBoolean,
  ): boolean =>
    x.enum === undefined ||
    (y.enum !== undefined && y.enum.every((v) => x.enum!.includes(v)));

  const coverNumber = (
    x: ISwaggerSchema.INumber | ISwaggerSchema.IInteger,
    y: ISwaggerSchema.INumber | ISwaggerSchema.IInteger,
  ): boolean =>
    [
      x.type === y.type || (x.type === "number" && y.type === "integer"),
      x.enum === undefined ||
        (y.enum !== undefined && y.enum.every((v) => x.enum!.includes(v))),
      x.minimum === undefined ||
        (y.minimum !== undefined && x.minimum <= y.minimum),
      x.maximum === undefined ||
        (y.maximum !== undefined && x.maximum >= y.maximum),
      x.exclusiveMinimum !== true ||
        x.minimum === undefined ||
        (y.minimum !== undefined &&
          (y.exclusiveMinimum === true || x.minimum < y.minimum)),
      x.exclusiveMaximum !== true ||
        x.maximum === undefined ||
        (y.maximum !== undefined &&
          (y.exclusiveMaximum === true || x.maximum > y.maximum)),
      x.multipleOf === undefined ||
        (y.multipleOf !== undefined &&
          y.multipleOf / x.multipleOf ===
            Math.floor(y.multipleOf / x.multipleOf)),
    ].every((v) => v);

  const coverString = (
    x: ISwaggerSchema.IString,
    y: ISwaggerSchema.IString,
  ): boolean =>
    [
      x.enum === undefined ||
        (y.enum !== undefined && y.enum.every((v) => x.enum!.includes(v))),
      x.format === undefined ||
        (y.format !== undefined && coverFormat(x.format, y.format)),
      x.pattern === undefined || x.pattern === y.pattern,
      x.minLength === undefined ||
        (y.minLength !== undefined && x.minLength <= y.minLength),
      x.maxLength === undefined ||
        (y.maxLength !== undefined && x.maxLength >= y.maxLength),
    ].every((v) => v);

  const coverFormat = (
    x: Required<ISwaggerSchema.IString>["format"],
    y: Required<ISwaggerSchema.IString>["format"],
  ): boolean =>
    x === y ||
    (x === "idn-email" && y === "email") ||
    (x === "idn-hostname" && y === "hostname") ||
    (["uri", "iri"].includes(x) && y === "url") ||
    (x === "iri" && y === "uri") ||
    (x === "iri-reference" && y === "uri-reference");

  const flatSchema =
    (components: ISwaggerComponents) =>
    (schema: ISwaggerSchema): ISwaggerSchema[] => {
      schema = escapeReference(components)(schema);
      if (isAnyOf(schema))
        return schema.anyOf.map(flatSchema(components)).flat();
      else if (isOneOf(schema))
        return schema.oneOf.map(flatSchema(components)).flat();
      return [schema];
    };

  const escapeReference =
    (components: ISwaggerComponents) =>
    (
      schema: ISwaggerSchema,
    ): Exclude<ISwaggerSchema, ISwaggerSchema.IReference> =>
      isReference(schema)
        ? escapeReference(components)(
            components.schemas![
              schema.$ref.replace("#/components/schemas/", "")
            ],
          )
        : schema;
}
