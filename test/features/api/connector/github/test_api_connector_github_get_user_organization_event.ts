import CApi from "@wrtn/connector-api/lib/index";

export const test_api_connector_github_get_user_organization_events = async (
  connection: CApi.IConnection,
) => {
  // TODO : 현재 캐싱된 상태라 테스트 불과하므로 추후 주석 제거
  // const res =
  //   await CApi.functional.connector.github.organizations.users.get_events.getUserOrganizationEvents(
  //     connection,
  //     {
  //       organization: "wrtnio",
  //       secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
  //     },
  //   );
  // typia.assert(res);
};
