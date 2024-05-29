import { JSONSchemaFaker } from "json-schema-faker";

export const OpenAIMock = () => ({
  chat: {
    completions: {
      create: async (
        {
          tools = [],
          tool_choice,
        }: {
          tools?: { function: { name: string, parameters: any } }[],
          tool_choice?: { type: "function", function: { name: string } },
          [key: string]: any,
        } = {
        }
      ) => {
        let message;
        if (!!tool_choice && tools.length > 0) {
          const functionSchema = tools
            .filter(({ function: { name } }) => name === tool_choice.function.name)[0]
            .function
            .parameters;
          message = {
            tool_calls: [{
              function: {
                arguments: JSON.stringify(
                  JSONSchemaFaker.generate(
                    functionSchema,
                    Object.entries(functionSchema["$defs"]).reduce(
                      (acc, [key, value]) => ({
                        [`#/components/schemas/${key}`]: value,
                        ...acc,
                      }), {}
                    )
                  )
                )
              }
            }]
          }
        } else {
          message = {
            content: "dummy data",
            role: "assistant",
          }
        }
        return {
          choices: [{
            message: message,
          }]
        }
      }
    }
  },
  images: {
    generate: async ()  => {
      return {
        data: [{
          // dummy url
          url: "https://dummyimage.com/600x400/000/fff",
        }]
      }
    }
  }

});
