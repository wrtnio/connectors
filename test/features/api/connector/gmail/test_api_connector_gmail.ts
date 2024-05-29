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
    from: "me",
    subject: "안녕하세요",
    body: "Gmail Connector 테스트 입니다.",
    cc: ["store@wrtn.io"],
    secretKey,
  };

  /**
   * Create Draft
   */
  await CApi.functional.connector.gmail.draft(connection, createMailInput);

  /**
   * Send Email
   */
  const sendEmailOutput: IGmail.ISendMailOutput =
    await CApi.functional.connector.gmail.send(connection, createMailInput);
  typia.assertEquals<IGmail.ISendMailOutput>(sendEmailOutput);

  const emailId = sendEmailOutput.id;

  /**
   * Find Email
   */
  const email: IGmail.IFindGmailOutput =
    await CApi.functional.connector.gmail.get.findEmail(connection, emailId, {
      secretKey,
    });
  typia.assertEquals<IGmail.IFindGmailOutput>(email);

  /**
   * Find Emails
   */
  const emailList: IGmail.IFindGmailListOutput =
    await CApi.functional.connector.gmail.read_list.findEmails(connection, {
      from: "store@wrtn.io",
      secretKey,
    });
  typia.assertEquals<IGmail.IFindGmailListOutput>(emailList);

  /**
   * remove Email
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
  typia.assertEquals<IGmail.ILabelOutput>(label);

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
  await CApi.functional.connector.gmail.reply(connection, {
    originalMailId: emailId,
    replyText: "답장입니다.",
    secretKey,
  });
};
