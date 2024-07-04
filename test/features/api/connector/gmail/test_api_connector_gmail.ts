import { RandomGenerator } from "@nestia/e2e";
import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IGmail } from "@wrtn/connector-api/lib/structures/connector/gmail/IGmail";

import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { Try } from "../../../../../src/utils/createResponseForm";

export const test_api_connector_gmail = async (connection: CApi.IConnection) => {
  const secretKey = ConnectorGlobal.env.GOOGLE_TEST_SECRET;
  const createMailInput: IGmail.ICreateMailInput = {
    to: ["store@wrtn.io"],
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
  const sendEmailOutput: Try<IGmail.ISendMailOutput> = await CApi.functional.connector.gmail.send(
    connection,
    createMailInput,
  );
  typia.assertEquals(sendEmailOutput);

  const emailId = sendEmailOutput.data.id;

  /**
   * Find Email
   */
  const email: Try<IGmail.IFindGmailOutput> = await CApi.functional.connector.gmail.get.findEmail(connection, emailId, {
    secretKey,
  });
  typia.assertEquals(email);

  /**
   * Find Emails
   */
  const emailList: Try<IGmail.IFindGmailListOutput> = await CApi.functional.connector.gmail.read_list.findEmails(
    connection,
    {
      from: "store@wrtn.io",
      secretKey,
    },
  );
  typia.assertEquals(emailList);

  /**
   * remove Email
   */
  await CApi.functional.connector.gmail.removeMail(connection, emailId, {
    secretKey,
  });

  /**
   * Create Label
   */
  const label = await CApi.functional.connector.gmail.label.createLabel(connection, {
    labelName: RandomGenerator.name(),
    secretKey,
  });
  typia.assertEquals(label);

  const labelId = label.data.id;

  /**
   * Add Label To Email
   */
  await CApi.functional.connector.gmail.label.addLabelToMail(connection, emailId, {
    labelIds: [labelId],
    secretKey,
  });

  /**
   * Remove Label From Email
   */
  await CApi.functional.connector.gmail.label.removeLabelFromMail(connection, emailId, {
    labelIds: [labelId],
    secretKey,
  });

  /**
   * Reply To Email
   */
  await CApi.functional.connector.gmail.reply(connection, emailId, {
    replyText: "답장입니다.",
    secretKey,
  });
};
