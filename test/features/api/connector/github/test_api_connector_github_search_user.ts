import CApi from "@wrtn/connector-api/lib/index";

export async function test_api_story_generator(connection: CApi.IConnection) {
  const res = await CApi.functional.connector.github.get_users.searchUser(
    connection,
    {},
  );
}
