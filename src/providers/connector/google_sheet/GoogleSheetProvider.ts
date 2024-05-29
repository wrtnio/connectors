import { Injectable } from "@nestjs/common";
import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";
import { google } from "googleapis";

import { ICommon } from "@wrtn/connector-api/lib/structures/connector/common/ISecretValue";
import { IGoogleSheet } from "@wrtn/connector-api/lib/structures/connector/google_sheet/IGoogleSheet";

import { GoogleProvider } from "../../internal/google/GoogleProvider";

@Injectable()
export class GoogleSheetProvider {
  constructor(private readonly googleProvider: GoogleProvider) {}
  /**
   * Read Google Sheet Headers
   * @param input Google Sheet Url and index number(default 0)
   */
  async readHeaders(
    input: IGoogleSheet.IReadGoogleSheetHeadersInput,
  ): Promise<IGoogleSheet.IReadGoogleSheetOutput> {
    const { url, index = 0, secretKey } = input;
    const id = this.getSpreadSheetId(url);
    const accessToken = await this.googleProvider.refreshAccessToken(secretKey);
    const authClient = new google.auth.OAuth2();

    authClient.setCredentials({ access_token: accessToken });

    const doc = new GoogleSpreadsheet(id, authClient);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[index];
    await sheet.getRows();
    const headerValues = sheet.headerValues;

    // 아무런 헤더 정보가 존재하지 않을 때
    if (!headerValues) {
      return { data: [] };
    }

    return { data: headerValues };
  }

  /**
   * Add Permission to Google Sheet
   * @param input Google Sheet Url and Permission List including email and role
   */
  async permission(input: IGoogleSheet.IPermissionInput): Promise<void> {
    const { url, permissions, secretKey } = input;
    const id = this.getSpreadSheetId(url);
    const accessToken = await this.googleProvider.refreshAccessToken(secretKey);
    const authClient = new google.auth.OAuth2();

    authClient.setCredentials({ access_token: accessToken });

    const doc = new GoogleSpreadsheet(id, authClient);
    for (let i = 0; i < permissions.length; i++) {
      try {
        await doc.share(permissions[i].email, {
          role: permissions[i].role,
          emailMessage: false,
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  /**
   * Add new Headers to Google Sheet
   * @param input Google Sheet Url and new Header Names
   */
  async writeHeaders(
    input: IGoogleSheet.IWriteGoogleSheetHeadersInput,
  ): Promise<void> {
    const { url, headerNames, index = 0, secretKey } = input;
    const accessToken = await this.googleProvider.refreshAccessToken(secretKey);
    const authClient = new google.auth.OAuth2();

    authClient.setCredentials({ access_token: accessToken });

    const doc = new GoogleSpreadsheet(this.getSpreadSheetId(url), authClient);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[index];

    // 현재 헤더를 가져옵니다.
    await sheet.loadHeaderRow();
    const _headers = sheet.headerValues;

    // 새로운 헤더를 추가합니다.
    for (let i = 0; i < headerNames.length; i++) {
      if (!_headers.includes(headerNames[i])) {
        _headers.push(headerNames[i]);
      }
    }

    // 수정된 헤더를 다시 설정합니다.
    await sheet.setHeaderRow(_headers);
  }

  async getWorkSheet(
    input: IGoogleSheet.IGetWorkSheetInput,
  ): Promise<IGoogleSheet.IGetWorkSheetOutput> {
    const { url, secretKey } = input;
    const id = this.getSpreadSheetId(url);
    const accessToken = await this.googleProvider.refreshAccessToken(secretKey);
    const authClient = new google.auth.OAuth2();

    authClient.setCredentials({ access_token: accessToken });

    const doc = new GoogleSpreadsheet(id, authClient);
    await doc.loadInfo();
    const workSheets = doc.sheetsByIndex;
    const res = workSheets.map((worksheet: GoogleSpreadsheetWorksheet) => {
      return worksheet.title;
    });
    return { data: res };
  }

  async readRows(
    input: IGoogleSheet.IReadGoogleSheetRowsInput,
  ): Promise<IGoogleSheet.IReadGoogleSheetRowsOutput> {
    const { url, workSheetTitle, secretKey } = input;
    const id = this.getSpreadSheetId(url);
    const accessToken = await this.googleProvider.refreshAccessToken(secretKey);
    const authClient = new google.auth.OAuth2();

    authClient.setCredentials({ access_token: accessToken });

    const doc = new GoogleSpreadsheet(id, authClient);
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle[workSheetTitle];
    const rows = await sheet.getRows();
    const _headers = sheet.headerValues;

    const res = [];
    for (let i = 0; i < rows.length; i++) {
      const obj: Record<string, string> = {};
      for (let j = 0; j < _headers.length; j++) {
        obj[_headers[j]] = rows[i].get(_headers[j]);
      }
      res.push(obj);
    }

    return { data: res };
  }
  /**
   * Parsing Google Sheet Id from Google Sheet Url
   * @param url Google Sheet Url
   * @private
   */
  getSpreadSheetId(url: string): string {
    const match = url.match(/\/d\/(.+?)\/edit/);
    return match ? match[1] : "";
  }
}
