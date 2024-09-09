import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";

export const test_api_connector_open_data_get_get_standard_region_code_list =
  async (connection: CApi.IConnection) => {
    const regions = [
      "서울특별시",
      "부산광역시",
      "대구광역시",
      "인천광역시",
      "광주광역시",
      "대전광역시",
      "울산광역시",
      "세종특별자치시",
      "경기도",
      "충청북도",
      "충청남도",
      "경상북도",
      "경상남도",
      "전라남도",
      "제주특별자치도",
      "강원특별자치도",
      "전북특별자치도",
    ] as const;

    for await (const locatadd_nm of regions) {
      const res =
        await CApi.functional.connector.open_data.getStandardRegionCodeList(
          connection,
          {
            locatadd_nm,
          },
        );

      typia.assertEquals(res);
    }
  };
