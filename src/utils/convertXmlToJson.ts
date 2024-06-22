import { InternalServerErrorException } from "@nestjs/common";
import { parseString } from "xml2js";

export const convertXmlToJson = async (xmlData: string): Promise<any> => {
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
    throw new InternalServerErrorException("Failed to convert xml to json");
  }
};
