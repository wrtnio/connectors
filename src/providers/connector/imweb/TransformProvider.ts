import { IAttachmentFile } from "@samchon/shopping-api/lib/structures/common/IAttachmentFile";
import { IShoppingSaleSnapshot } from "@samchon/shopping-api/lib/structures/shoppings/sales/IShoppingSaleSnapshot";
import { IShoppingChannelCategory } from "@samchon/shopping-api/lib/structures/shoppings/systematic/IShoppingChannelCategory";
import { IImweb } from "@wrtn/connector-api/lib/structures/connector/imweb/IImweb";
import { StrictOmit } from "@wrtn/connector-api/lib/structures/types/strictOmit";
import { is, tags } from "typia";
import { v5 } from "uuid";
import { ImwebProvider } from "./ImwebProvider";

const NAMESPACE = "6ba7b810-9dad-11d1-80b4-00c04fd430c8" as const;

export namespace TransformProivder {
  export const toImage = (
    url: string,
  ): StrictOmit<IAttachmentFile, "created_at"> => {
    const splited = url.split("/");
    const LAST_INDEX = splited.length - 1;
    const filename = splited[LAST_INDEX];

    return {
      id: TransformProivder.toUUID(filename), // 파일 명 자체를 ID로 변환한다.
      name: filename,
      extension: filename.split(".")[1] ?? "", // 확장자가 명시되지 않은 경우.
      url: url,
    };
  };

  export const toCategory = (
    input: IImweb.Category,
  ): StrictOmit<IShoppingChannelCategory.IInvert, "created_at"> => {
    return {
      id: TransformProivder.toUUID(input.categoryCode),
      code: input.categoryCode,
      name: input.name,
      parent_id: null, // 최상위 Category를 의미하기 때문에 null
      parent: null,
    };
  };

  export const toUUID = (
    value: string | number | null,
  ): `${string}-${string}-${string}-${string}-${string}` => {
    type Assertion = ReturnType<typeof TransformProivder.toUUID>;
    return v5(value?.toString() ?? ("null" as const), NAMESPACE) as Assertion;
  };

  export const toTags = (
    input: Pick<
      IImweb.Product,
      "isBadgeBest" | "isBadgeHot" | "isBadgeMd" | "isBadgeNew"
    >,
  ): IShoppingSaleSnapshot["tags"] => {
    return [
      ...(input.isBadgeBest ? ["best"] : []),
      ...(input.isBadgeNew ? ["new"] : []),
      ...(input.isBadgeMd ? ["md_pick"] : []),
      ...(input.isBadgeHot ? ["hot"] : []),
    ];
  };

  export const toSaleSummary =
    (site: Awaited<ReturnType<typeof ImwebProvider.getDefaultUnit>>) =>
    (input: {
      product: IImweb.ProductSummary;
      detail: IImweb.Product;
      units: IImweb.ShoppingBackend.ImwebSaleUnitSummary[];
      categories: IImweb.Category[];
    }): IImweb.ShoppingBackend.SaleSummary => {
      const { product, detail, units } = input;

      return {
        id: TransformProivder.toUUID(product.prodNo),
        productNo: product.prodNo,
        seller: {
          id: TransformProivder.toUUID(site.site.siteCode),
          type: "seller",
          citizen: {
            mobile: site.unit.phone ?? "",
            name: site.unit.presidentName ?? "",
          },
        },
        channels: [
          {
            id: TransformProivder.toUUID(site.unit.unitCode),
            code: site.unit.unitCode,
            name: site.unit.companyName ?? "",
            categories: input.categories
              .filter((el) => detail.categories.includes(el.categoryCode))
              .map((category) => TransformProivder.toCategory(category)),
          },
        ],
        content: {
          thumbnails: product.productImages
            .filter((imageUrl) => is<string & tags.Format<"iri">>(imageUrl))
            .map((imageUrl) => TransformProivder.toImage(imageUrl)),
          title: product.name,
        },
        created_at: product.addTime,
        latest: true,
        opened_at: detail.preSaleStartDate,
        paused_at: detail.preSaleEndDate,
        price_range: {
          highest: ImwebProvider.Select.getUnit("maximum")(units),
          lowest: ImwebProvider.Select.getUnit("minimum")(units),
        },
        units: units,
        updated_at: product.editTime,
        tags: TransformProivder.toTags(detail),
      };
    };

  export const toIShoppingSaleUnitSummary =
    <Product extends { name: string; price: number }>(product: Product) =>
    (
      options: IImweb.ProductOption[],
    ): Array<IImweb.ShoppingBackend.ImwebSaleUnitSummary> => {
      if (options.length === 0) {
        return [
          {
            id: TransformProivder.toUUID(null),
            name: product.name,
            options: [],
            price_range: {
              highest: {
                nominal: product.price,
                real: product.price,
              },
              lowest: {
                nominal: product.price,
                real: product.price,
              },
            },
            stocks: [
              {
                id: TransformProivder.toUUID(null),
                choices: [],
                name: product.name,
                price: {
                  nominal: product.price,
                  real: product.price,
                },
              },
            ],
            primary: true,
            required: true,
          },
        ];
      } else if (options.every((el) => el.isCombine === "Y")) {
        /**
         * 아임웹에서의 조합형 옵션을 의미한다.
         */
        return options
          .filter((el) => el.isRequire === "Y")
          .map((unit) => {
            return {
              id: TransformProivder.toUUID(unit.optionDetailCode),
              name: unit.optionDetailInfoList
                .map(
                  (option) =>
                    `${option.name}:${option.optionValue.optionValueName}`,
                )
                .join("/"), // 아임웹에서 상품 옵션의 이름 표기를 위와 같은 형식으로 한다.
              primary: true,
              required: unit.isRequire === "Y" ? true : false,
              options: unit.optionDetailInfoList.map((option) => {
                return {
                  id: TransformProivder.toUUID(option.optionCode),
                  name: option.name,
                  variable: false,
                  type: "string",
                  candidates: [
                    {
                      id: TransformProivder.toUUID(
                        option.optionValue.optionValueCode,
                      ),
                      name: option.optionValue.optionValueName,
                    },
                  ],
                };
              }),
              stocks: [
                {
                  id: TransformProivder.toUUID(null),
                  choices: unit.optionDetailInfoList.map((option) => {
                    return {
                      id: TransformProivder.toUUID(
                        `${option.optionCode}-${option.optionValue.optionValueCode}`,
                      ),
                      candidate_id: TransformProivder.toUUID(
                        option.optionValue.optionValueCode,
                      ),
                      option_id: TransformProivder.toUUID(option.optionCode),
                    };
                  }),
                  name: unit.optionDetailInfoList
                    .map(
                      (option) =>
                        `${option.name}:${option.optionValue.optionValueName}`,
                    )
                    .join("/"),
                  price: {
                    nominal: unit.price,
                    real: unit.price,
                  },
                },
              ],
              price_range: {
                highest: {
                  nominal: unit.price,
                  real: unit.price,
                },
                lowest: {
                  nominal: unit.price,
                  real: unit.price,
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
