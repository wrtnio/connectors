import { OpenApi } from "@samchon/openapi";
import { OpenApiTypeChecker } from "@samchon/openapi/lib/internal/OpenApiTypeChecker";
import cp from "child_process";
import fs from "fs";

import { MapUtil } from "../api/utils/MapUtil";

const main = async (): Promise<void> => {
  const dict: Map<string, Array<(str: string) => void>> = new Map();
  cp.execSync("npm run build:swagger", { stdio: "inherit" });
  const swagger: OpenApi.IDocument = JSON.parse(
    await fs.promises.readFile(__dirname + "/../../packages/api/swagger.json", "utf8"),
  );

  // PREPARE EMPLACERS
  const emplace = (key: string) => MapUtil.take(dict)(key, () => []);
  const gather = (schema: { title?: string; summary?: string; description?: string }) => {
    if (schema.title) emplace(schema.title).push((str) => (schema.title = str));
    if (schema.description) emplace(schema.description).push((str) => (schema.description = str));
    if (schema.summary) emplace(schema.summary).push((str) => (schema.summary = str));
  };
  const iterate = (schema: OpenApi.IJsonSchema) => {
    gather(schema);
    if (OpenApiTypeChecker.isArray(schema)) iterate(schema.items);
    else if (OpenApiTypeChecker.isOneOf(schema)) schema.oneOf.forEach(iterate);
    else if (OpenApiTypeChecker.isObject(schema)) Object.values(schema.properties ?? {}).forEach(iterate);
  };

  // ITERATE SWAGGER MEMBERS
  for (const collection of Object.values(swagger.paths ?? {}))
    for (const method of ["get", "post", "put", "patch", "delete"] as const) {
      const route = collection[method];
      if (route === undefined) continue;
      gather(route);
      if (route.requestBody) {
        iterate(route.requestBody);
        for (const v of Object.values(route.requestBody.content ?? {})) if (v?.schema !== undefined) iterate(v.schema);
      }
      for (const response of Object.values(route.responses ?? {})) {
        gather(response);
        for (const v of Object.values(response.content ?? {})) if (v?.schema !== undefined) iterate(v.schema);
      }
      for (const param of route.parameters ?? []) iterate(param.schema);
    }

  // TRANSLATE
  for (const [key, setters] of dict) {
    const translated: string = "@todo - MARK - " + key;
    for (const s of setters) s(translated);
  }

  // SAVE AS SWAGGER.JSON
  await fs.promises.writeFile(__dirname + "/../../packages/api/swagger.korean.json", JSON.stringify(swagger, null, 2));
};
main().catch((exp) => {
  console.log(exp);
  process.exit(-1);
});
