import { Injectable } from "@nestjs/common";
import { gmail_v1, google } from "googleapis";

import { IGmail } from "@wrtn/connector-api/lib/structures/connector/gmail/IGmail";

import axios from "axios";
import { GoogleProvider } from "../../internal/google/GoogleProvider";
import { OAuthSecretProvider } from "../../internal/oauth_secret/OAuthSecretProvider";
import { IOAuthSecret } from "../../internal/oauth_secret/structures/IOAuthSecret";

@Injectable()
export class GmailProvider {
  constructor(private readonly googleProvider: GoogleProvider) {}

  async deleteMailList(input: IGmail.IDeleteMailListInput): Promise<void> {
    try {
      const token = await this.getToken(input.secretKey);
      const accessToken = await this.googleProvider.refreshAccessToken(token);
      const authClient = new google.auth.OAuth2();

      authClient.setCredentials({ access_token: accessToken });
      const gmail = google.gmail({ version: "v1", auth: authClient });

      await gmail.users.messages.batchDelete({
        userId: "me",
        requestBody: {
          ids: input.ids,
        },
      });
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  async hardDelete(id: string, input: IGmail.ISecret): Promise<void> {
    try {
      const token = await this.getToken(input.secretKey);
      const accessToken = await this.googleProvider.refreshAccessToken(token);
      const authClient = new google.auth.OAuth2();

      authClient.setCredentials({ access_token: accessToken });
      const gmail = google.gmail({ version: "v1", auth: authClient });

      await gmail.users.messages.delete({
        userId: "me",
        id,
      });
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  async sendEmail(
    input: IGmail.ICreateMailInput,
  ): Promise<IGmail.ISendMailOutput> {
    try {
      const token = await this.getToken(input.secretKey);
      const accessToken = await this.googleProvider.refreshAccessToken(token);
      const authClient = new google.auth.OAuth2();

      authClient.setCredentials({ access_token: accessToken });
      const gmail = google.gmail({ version: "v1", auth: authClient });

      const raw = await this.makeConpleteContents(input);
      const res = await gmail.users.messages.send({
        userId: "me",
        requestBody: {
          raw: raw,
        },
      });
      const id = res.data.id;
      if (!id) {
        throw new Error("Failed to Send Email");
      }
      return { id };
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  async createDraft(input: IGmail.ICreateMailInput): Promise<void> {
    try {
      const token = await this.getToken(input.secretKey);
      const accessToken = await this.googleProvider.refreshAccessToken(token);
      const authClient = new google.auth.OAuth2();

      authClient.setCredentials({ access_token: accessToken });

      const gmail = google.gmail({ version: "v1", auth: authClient });

      const raw = await this.makeConpleteContents(input);
      await gmail.users.drafts.create({
        userId: "me",
        requestBody: {
          message: {
            raw: raw,
          },
        },
      });
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  async reply(
    id: string,
    input: IGmail.IReplyInput,
  ): Promise<IGmail.ISendMailOutput> {
    try {
      const token = await this.getToken(input.secretKey);
      const accessToken = await this.googleProvider.refreshAccessToken(token);
      const authClient = new google.auth.OAuth2();

      authClient.setCredentials({ access_token: accessToken });

      const gmail = google.gmail({ version: "v1", auth: authClient });

      /**
       * 원본 이메일 정보 가져오기
       */
      const originalMessage = await gmail.users.messages.get({
        userId: "me",
        id: id,
      });

      /**
       * 원본 이메일 헤더 정보 사용하여 답장 내용 구성
       */
      const headers = originalMessage.data.payload?.headers;
      const subject = headers?.find(
        (header) => header.name === "Subject",
      )?.value;
      const to = headers?.find((header) => header.name === "From")?.value;
      const references =
        (headers?.find((header) => header.name === "References")?.value || "") +
        " " +
        id;
      const inReplyTo = headers?.find(
        (header) => header.name === "Message-ID",
      )?.value;

      const emailLines = [
        `To: ${to}`,
        this.encodeHeaderFieldForKorean("Subject", `Re: ${subject}`),
        `In-Reply-To: ${inReplyTo}`,
        `References: ${references}`,
        "Content-Type: text/html; charset=utf-8",
        "MIME-Version: 1.0",
      ];

      const raw = this.makeEmailContent(emailLines, input.replyText);
      const res = await gmail.users.messages.send({
        userId: "me",
        requestBody: {
          raw: raw,
        },
      });

      const replyId = res.data.id;
      if (!replyId) {
        throw new Error("Failed to Create Label");
      }

      return { id: replyId };
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  async createLabel(input: IGmail.ILabelInput): Promise<IGmail.ILabelOutput> {
    try {
      const token = await this.getToken(input.secretKey);
      const accessToken = await this.googleProvider.refreshAccessToken(token);
      const authClient = new google.auth.OAuth2();

      authClient.setCredentials({ access_token: accessToken });

      const gmail = google.gmail({ version: "v1", auth: authClient });

      const res = await gmail.users.labels.create({
        userId: "me",
        requestBody: {
          name: input.labelName,
          labelListVisibility: input.labelListVisibility,
          messageListVisibility: input.messageListVisibility,
          color: input.color,
        },
      });
      const id = res.data.id;
      if (!id) {
        throw new Error("Failed to Create Label");
      }
      return { id };
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  async addLabelToMail(
    mailId: string,
    input: IGmail.IMailLabelOperationInput,
  ): Promise<void> {
    try {
      const token = await this.getToken(input.secretKey);
      const accessToken = await this.googleProvider.refreshAccessToken(token);
      const authClient = new google.auth.OAuth2();

      authClient.setCredentials({ access_token: accessToken });

      const gmail = google.gmail({ version: "v1", auth: authClient });

      await gmail.users.messages.modify({
        userId: "me",
        id: mailId,
        requestBody: {
          addLabelIds: input.labelIds,
        },
      });
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  async removeLabelFromMail(
    mailId: string,
    input: IGmail.IMailLabelOperationInput,
  ): Promise<void> {
    try {
      const token = await this.getToken(input.secretKey);
      const accessToken = await this.googleProvider.refreshAccessToken(token);
      const authClient = new google.auth.OAuth2();

      authClient.setCredentials({ access_token: accessToken });

      const gmail = google.gmail({ version: "v1", auth: authClient });

      await gmail.users.messages.modify({
        userId: "me",
        id: mailId,
        requestBody: {
          removeLabelIds: input.labelIds,
        },
      });
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  async findEmail(
    id: string,
    input: IGmail.ISecret,
  ): Promise<IGmail.IFindGmailOutput> {
    try {
      const token = await this.getToken(input.secretKey);
      const accessToken = await this.googleProvider.refreshAccessToken(token);
      const authClient = new google.auth.OAuth2();

      authClient.setCredentials({ access_token: accessToken });

      const gmail = google.gmail({ version: "v1", auth: authClient });

      if (!id) {
        throw new Error("Email ID is required");
      }
      const emailData = await this.getEmailData(gmail, id);
      return emailData;
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  async findEmails(
    input: IGmail.IFindEmailListInput,
  ): Promise<IGmail.IFindGmailListOutput> {
    try {
      const token = await this.getToken(input.secretKey);
      const accessToken = await this.googleProvider.refreshAccessToken(token);
      const authClient = new google.auth.OAuth2();

      authClient.setCredentials({ access_token: accessToken });

      const gmail = google.gmail({ version: "v1", auth: authClient });
      const query = this.makeQueryForGetGmail(input);
      const response = await gmail.users.messages.list({
        userId: "me",
        q: query,
        maxResults: input.maxResults,
        labelIds: input.labelIds,
      });

      const messages = response.data.messages;

      if (messages && messages.length > 0) {
        const detailedMessages = await Promise.all(
          messages.map(async (message) => {
            if (!message.id) {
              return {
                data: [],
              };
            }
            return await this.getEmailData(gmail, message.id);
          }),
        );
        return {
          data: detailedMessages,
        };
      } else {
        return {
          data: [],
        };
      }
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  // TODO: 이미 휴지통에 들어있을 때 처리하는 로직 추가되어야 함

  async removeEmail(id: string, input: IGmail.ISecret): Promise<void> {
    try {
      const token = await this.getToken(input.secretKey);
      const accessToken = await this.googleProvider.refreshAccessToken(token);
      const authClient = new google.auth.OAuth2();

      authClient.setCredentials({ access_token: accessToken });

      const gmail = google.gmail({ version: "v1", auth: authClient });

      if (!id) {
        throw new Error("Email ID is required");
      }

      await gmail.users.messages.trash({
        userId: "me",
        id: id,
      });
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  async getEmailData(gmail: gmail_v1.Gmail, id: string) {
    if (!id) {
      return {
        data: [],
      };
    }

    const result = await gmail.users.messages.get({
      userId: "me",
      id: id,
    });

    const messageId = result.data.id;

    if (!messageId) {
      throw new Error("Find Email Error");
    }

    const labelIds = result.data.labelIds;
    const payload = result.data.payload;
    const headers = payload?.headers;

    const from = headers?.find((header) => header.name === "From")?.value;
    const subject = headers?.find((header) => header.name === "Subject")?.value;
    const body = result.data.snippet;
    const attachments = payload?.parts?.filter(
      (part) => part.filename && part.filename.length > 0,
    );

    return { id, labelIds, from, subject, body, attachments };
  }

  async makeConpleteContents(input: IGmail.ICreateMailInput): Promise<string> {
    // 파일이 존재할 경우에는 Content-Type을 multipart/mixed가 되게 수정
    const boundary = "__my_boundary__";
    const emailLines = [
      `To: ${input.to.join(",")}`,
      `From: me`,
      "MIME-Version: 1.0",
      this.encodeHeaderFieldForKorean("Subject", input.subject),
      `Content-Type: multipart/mixed; boundary="${boundary}"`, // 파일이 들어갈지도 모르기 때문에 multipart/mixed로 수정, 바운더리 기호 명시
      "",
      `--${boundary}`,
      `Content-Type: text/html; charset=utf-8`,
    ];

    if (input.files?.length) {
      for await (const { filename, fileUrl } of input.files) {
        const res = await axios.get(fileUrl, { responseType: "arraybuffer" });
        const base64Buffer = Buffer.from(res.data).toString("base64");

        const filePart = [
          `--${boundary}`,
          `Content-Type: application/octet-stream; name="${filename}"`,
          `Content-Disposition: attachment; filename="${filename}"`,
          `Content-Transfer-Encoding: base64`,
          "",
          base64Buffer,
          "",
        ] as const;

        emailLines.push(...filePart);
      }
      emailLines.push(`--${boundary}--`); // 모든 파일이 입력된 후 바운더리를 추가로 입력하여 바운더리 사이에 파일이 위치하도록 한다.
    }

    /**
     * 참조 대상 있는 경우 헤더에 추가
     */
    if (input.cc) {
      emailLines.push(`Cc: ${input.cc.join(",")}`);
    }

    if (input.Bcc) {
      emailLines.push(`Bcc: ${input.Bcc.join(",")}`);
    }

    const raw = this.makeEmailContent(emailLines, input.body);
    return raw;
  }

  /**
   * 한글 base64 인코딩
   */
  encodeHeaderFieldForKorean(name: string, value: string) {
    return `${name}: =?utf-8?B?${Buffer.from(value, "utf-8").toString(
      "base64",
    )}?=`;
  }

  /**
   * gmail 메일 헤더 및 본문 base64 인코딩
   */
  makeEmailContent(headers: string[], body: string) {
    const emailLines = [...headers, "", body, ""];

    const email = emailLines.join("\r\n");
    return Buffer.from(email)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  makeQueryForGetGmail(input: IGmail.IFindEmailListInput) {
    let query: string = "";

    if (input.from) {
      query += `from:${input.from} `;
    }

    if (input.to) {
      query += `to:${input.to} `;
    }

    if (input.subject) {
      query += `subject:${input.subject} `;
    }

    if (input.after) {
      query += `after:${input.after} `;
    }

    if (input.before) {
      query += `before:${input.before} `;
    }

    if (input.label) {
      query += `label:${input.label} `;
    }

    return query.trim();
  }

  private async getToken(secretValue: string): Promise<string> {
    const secret = await OAuthSecretProvider.getSecretValue(secretValue);
    const token =
      typeof secret === "string"
        ? secret
        : (secret as IOAuthSecret.ISecretValue).value;
    return token;
  }
}
