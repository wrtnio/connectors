import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IImweb } from "../../../../src/api/structures/connector/imweb/IImweb";

export const test_api_connector_imweb_get_products_getProducts = async (
  connection: api.IConnection,
) => {
  const output: Primitive<Array<IImweb.Product>> =
    await api.functional.connector.imweb.get_products.getProducts(
      connection,
      typia.random<IImweb.IGetProductInput>(),
    );
  typia.assert(output);
};
