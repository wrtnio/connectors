import axios from "axios";
import xlsl from "xlsx";

import { IHancell } from "@wrtn/connector-api/lib/structures/connector/hancell/IHancell";

export namespace HancellProvider {
  export async function getHancellData(
    input: IHancell.IReadHancellInput,
  ): Promise<IHancell.IReadHancellOutput> {
    const response = await axios.get(input.fileUrl, {
      responseType: "arraybuffer",
    });

    const file = response.data;
    const workbook = xlsl.read(file, { type: "buffer" });

    const data = Object.entries(workbook.Sheets)
      .map(([sheetName, sheet]) => {
        const csv = xlsl.utils.sheet_to_csv(sheet);
        return { [sheetName]: csv };
      })
      .reduce((acc, cur) => {
        return Object.assign(acc, cur);
      }, {});

    return data;
  }
}
