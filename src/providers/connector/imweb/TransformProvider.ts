import { IImweb } from "@wrtn/connector-api/lib/structures/connector/imweb/IImweb";
import { v5 } from "uuid";

const NAMESPACE = "6ba7b810-9dad-11d1-80b4-00c04fd430c8" as const;

export namespace TransformProivder {
  export const toUUID = (value: string | null) => {
    return v5(value ?? ("null" as const), NAMESPACE);
  };

  export const toIShoppingSaleUnitSummary =
    (product: { price: number }) =>
    (
      options: IImweb.ProductOption[],
    ): Array<IImweb.ShoppingBackend.ImwebSaleUnitSummary> => {
      if (options.every((el) => el.isCombine === "Y")) {
        /**
         * 아임웹에서의 조합형 옵션을 의미한다.
         */
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
              highest: {
                nominal: product.price + unit.price,
                real: product.price + unit.price,
              },
              lowest: {
                nominal: product.price + unit.price,
                real: product.price + unit.price,
              },
            },
          };
        });
      } else {
        // 비조합형 옵션의 경우
        throw new Error("비조합형 옵션의 경우");
      }
    };
}
