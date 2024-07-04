import { Inject, Injectable } from "@nestjs/common";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import assert from "node:assert";
import OpenAI from "openai";
import { inspect } from "util";

import { ConnectorGlobal } from "../../ConnectorGlobal";
import { IMAGE_OPEN_AI_INJECT_IDENTIFIER, OPEN_AI_INJECT_IDENTIFIER } from "./constants";

export interface IChainOfThought {
  /**
   * chain of thought to correctly follow user's query
   */
  chainOfThought: string;
}

/**
 * an attempt at a general function that merges the result of a function with the input, frequently used with LLM nodes especially
 * since simply mapping input data to output data shouldn't be done probabalitistically by an LLM
 */
export async function merge<Input, Output>(
  f: (arg: Input, ...rest: any[]) => Promise<Output>,
  input: Input,
  ...rest: any[]
): Promise<Input & Output> {
  // TODO: do we just ignore the rest of the arguments when merging?
  const result = await f(input, ...rest);
  return {
    ...input,
    ...result,
  };
}

export function dump(obj: any): string {
  return inspect(obj, { depth: null });
}

type Model = "gpt-3.5-turbo" | "gpt-4-turbo";

const deploymentName = {
  "gpt-3.5-turbo": "wrtn-gpt-35-turbo",
  "gpt-4-turbo": "wrtn-gpt-4-turbo",
};

@Injectable()
export class OpenAIProvider {
  constructor(
    @Inject(OPEN_AI_INJECT_IDENTIFIER) private _client: OpenAI,
    @Inject(IMAGE_OPEN_AI_INJECT_IDENTIFIER) private _imageClient: OpenAI,
    @InjectPinoLogger(OpenAIProvider.name) private readonly logger: PinoLogger,
  ) {}

  private async generate({ messages, model, schema }: { messages: any[]; model: Model; schema?: any }): Promise<any> {
    const response = await this._client.chat.completions.create(
      {
        messages,
        model,
        // a fixed random number
        // doesn't guarantee deterministic outputs but should help
        seed: 227354071174,
        temperature: 0,
        ...(schema
          ? {
              tools: [
                {
                  type: "function",
                  function: schema,
                },
              ],
              tool_choice: {
                type: "function",
                function: { name: schema.name },
              },
            }
          : {}),
      },
      {
        path: `/v2/openai/deployments/${deploymentName[model]}/chat/completions`,
        headers: {
          [ConnectorGlobal.env.HAMLET_HEADER_KEY_NAME]: ConnectorGlobal.env.HAMLET_HEADER_KEY_VALUE,
        },
      },
    );
    return response;
  }

  public async response(userPrompt: string, model: Model): Promise<any> {
    const response = await this.generate({
      messages: [{ role: "user", content: userPrompt }],
      model,
    });
    return response;
  }

  private convertJsonSchemaToFunctionSchema(schema: any): any {
    const schemaName = (schema?.schemas[0] as any)["$ref"].split("/").pop();
    const { [schemaName]: properties, ...defs } = schema?.components?.schemas as any;

    const parameters = {
      ...properties,
      $defs: defs,
    };

    const functionSchema = {
      name: schemaName,
      description: properties.description,
      parameters,
    };
    return functionSchema;
  }

  // use function call to fill an interface, similar to https://github.com/jxnl/instructor
  public async extractInterface(
    userPrompt: string,
    schema: any,
    validationFunction: (args: any) => any,
    model: Model,
  ): Promise<any> {
    const functionSchema = this.convertJsonSchemaToFunctionSchema(schema);
    this.logger.info(JSON.stringify({ userPrompt, functionSchema, model }));
    const response = await this.generate({
      messages: [
        {
          role: "user",
          content: userPrompt,
        },
      ],
      schema: functionSchema,
      model,
    });
    const args = response?.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    const parsedArgs = JSON.parse(args || "{}");
    this.logger.info(JSON.stringify(parsedArgs));
    assert(validationFunction(parsedArgs));
    return parsedArgs;
  }

  public async generateImage(userPrompt: string, image_ratio?: string): Promise<any> {
    let size: "1024x1024" | "1792x1024" | "1024x1792" = "1024x1024";

    if (image_ratio) {
      const imageDimensions: {
        [key: string]: "1024x1024" | "1792x1024" | "1024x1792";
      } = {
        square: "1024x1024",
        landscape: "1792x1024",
        portrait: "1024x1792",
      };

      size = imageDimensions[image_ratio];
    }

    //TODO: 현재 분당 200회 생성 제한. 처리 로직 필요.
    const response = await this._imageClient.images.generate({
      prompt: userPrompt,
      // TODO: different models have different options
      //       so make option selection more refined later
      size: size,
      quality: "hd",
      model: "dall-e-3",
      n: 1,
    });
    return response.data[0];
  }
}
