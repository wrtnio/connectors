import { parseString } from "xml2js";

/**
 *
 * @param xmlData xml 형식의 데이터
 * @returns xml 형식의 데이터를 json 형식으로 변환
 */
export async function convertXmlToJson(xmlData: string | object): Promise<any> {
  if (typeof xmlData === "object") {
    return xmlData;
  }

  try {
    return new Promise((resolve, reject) => {
      parseString(xmlData, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  } catch (err) {
    throw new Error("Failed to convert xml to json");
  }
}
