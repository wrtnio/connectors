import { DeepStrictOmit } from "@kakasoo/deep-strict-types";
import { IImweb } from "@wrtn/connector-api/lib/structures/connector/imweb/IImweb";
import { IShoppingSaleUnit } from "@wrtn/connector-api/lib/structures/shoppings/sales/IShoppingSaleUnit";

export namespace OptionProvider {
  export function getUnits(
    options: IImweb.ProductOption[],
    price: number,
  ): Array<
    DeepStrictOmit<IShoppingSaleUnit, "stocks"> &
      Pick<IShoppingSaleUnit.ISummary, "price_range">
  > {
    if (options.every((el) => el.isCombine === "Y")) {
      // 조합형 옵션의 경우에는
      return options.map((unit) => {
        return {
          id: unit.optionDetailCode,
          name: unit.optionDetailInfoList
            .map((el) => `${el.name}:${el.optionValue.optionValueName}`)
            .join("/"),
          primary: true,
          required: unit.isRequire === "Y" ? true : false,
          options: unit.optionDetailInfoList.map((option) => {
            return {
              id: option.optionCode,
              name: option.name,
              variable: false,
              type: "string",
              candidates: [
                {
                  id: option.optionValue.optionValueCode,
                  name: option.optionValue.optionValueName,
                },
              ],
            };
          }),
          price_range: {
            highest: { nominal: price + unit.price, real: price + unit.price },
            lowest: { nominal: price + unit.price, real: price + unit.price },
          },
        };
      });
    } else {
      // 비조합형 옵션의 경우
      throw new Error("비조합형 옵션의 경우");
    }
  }
}
