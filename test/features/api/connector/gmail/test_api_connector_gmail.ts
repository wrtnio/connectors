import { RandomGenerator } from "@nestia/e2e";
import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IGmail } from "@wrtn/connector-api/lib/structures/connector/gmail/IGmail";

import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_gmail = async (
  connection: CApi.IConnection,
) => {
  const secretKey = ConnectorGlobal.env.GOOGLE_TEST_SECRET;
  const createMailInput: IGmail.ICreateMailInput = {
    to: ["store@wrtn.io"],
    subject: "안녕하세요",
    body: "Gmail Connector 테스트 입니다.",
    cc: ["store@wrtn.io"],
    secretKey,
  };

  /**
   * Send Email
   */
  const sendEmailOutput: IGmail.ISendMailOutput =
    await CApi.functional.connector.gmail.send(connection, createMailInput);
  typia.assert<IGmail.ISendMailOutput>(sendEmailOutput);

  const emailId = sendEmailOutput.id;

  /**
   * Find Email
   */
  const email: IGmail.IFindGmailOutput =
    await CApi.functional.connector.gmail.get.findEmail(connection, emailId, {
      secretKey,
    });
  typia.assert<IGmail.IFindGmailOutput>(email);

  /**
   * Find Emails
   */
  const emailList: IGmail.IFindGmailListOutput =
    await CApi.functional.connector.gmail.read_list.findEmails(connection, {
      from: "store@wrtn.io",
      secretKey,
    });
  typia.assert<IGmail.IFindGmailListOutput>(emailList);

  /**
   * remove Email (move mail to trash)
   */
  await CApi.functional.connector.gmail.removeMail(connection, emailId, {
    secretKey,
  });

  /**
   * Create Label
   */
  const label = await CApi.functional.connector.gmail.label.createLabel(
    connection,
    {
      labelName: RandomGenerator.name(),
      secretKey,
    },
  );
  typia.assert<IGmail.ILabelOutput>(label);

  const labelId = label.id;

  /**
   * Add Label To Email
   */
  await CApi.functional.connector.gmail.label.addLabelToMail(
    connection,
    emailId,
    {
      labelIds: [labelId],
      secretKey,
    },
  );

  /**
   * Remove Label From Email
   */
  await CApi.functional.connector.gmail.label.removeLabelFromMail(
    connection,
    emailId,
    {
      labelIds: [labelId],
      secretKey,
    },
  );

  /**
   * Reply To Email
   */
  const reply = await CApi.functional.connector.gmail.reply(
    connection,
    emailId,
    {
      replyText: "답장입니다.",
      secretKey,
    },
  );

  /**
   * remove Email (hard delete)
   */
  await CApi.functional.connector.gmail.hardDelete(connection, emailId, {
    secretKey,
  });

  /**
   * remove Reply Email (hard delete)
   */
  await CApi.functional.connector.gmail.hardDelete(connection, reply.id, {
    secretKey,
  });
};

export const test_api_connector_gmail_remove_all_test_mail = async (
  connection: CApi.IConnection,
) => {
  /**
   * Find Email
   */
  const emails = await CApi.functional.connector.gmail.read_list.findEmails(
    connection,
    {
      from: "studio@wrtn.io", // 자기 자신으로부터
      subject: "안녕하세요", // "안녕하세요" 라고만 적힌 메일이 온 경우를 삭제한다.
      maxResults: 500,
      secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
    },
  );

  const mailIds = emails.data
    .filter((email) => email.subject === "안녕하세요") // 혹시나 커넥터가 업데이트되며 하위호환성이 깨지고 '안녕하세요'가 제목이 아니라 '포함된' 메일들이 될 경우를 대비
    .map((el) => el.id)
    .filter((id) => id !== null && id !== undefined);

  if (emails.data.length) {
    await CApi.functional.connector.gmail.deleteMailList(connection, {
      ids: mailIds,
      secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
    });
  }
};
