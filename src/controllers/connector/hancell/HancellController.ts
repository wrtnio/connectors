import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import fs from "fs";
import path from "path";
import typia from "typia";
import xlsl from "xlsx";

@Controller("connector/hancell")
export class HancellController {
  constructor() {}

  @core.TypedRoute.Get()
  async test() {
    const file = fs.readFileSync(
      path.join(__dirname, "../../../../hancell_test_file.cell"),
    );

    const workbook = xlsl.read(file, { type: "buffer" });

    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const orderedByKeyName = Object.keys(sheet)
      .sort()
      .reduce<typeof sheet>((obj, key) => {
        return (obj[key] = sheet[key]), obj;
      }, {});

    const isCell = typia.createIs<`${string}${number}`>();
    const hancell = Object.entries(orderedByKeyName)
      .filter(([key, value]) => isCell(key))
      .map(([key, value]) => {
        value = value.v;
        return { [key]: value };
      });

    return hancell;
  }
}
