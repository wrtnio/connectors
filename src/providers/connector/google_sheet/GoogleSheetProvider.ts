import { Injectable, InternalServerErrorException } from "@nestjs/common";
import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";
import { google } from "googleapis";

import { IGoogleSheet } from "@wrtn/connector-api/lib/structures/connector/google_sheet/IGoogleSheet";

import { GoogleProvider } from "../../internal/google/GoogleProvider";
import { OAuthSecretProvider } from "../../internal/oauth_secret/OAuthSecretProvider";

@Injectable()
export class GoogleSheetProvider {
  /**
   * Create Google Sheet
   */
  async createSpreadsheet(
    input: IGoogleSheet.ICreateGoogleSheetInput,
  ): Promise<IGoogleSheet.ICreateGoogleSheetOutput> {
    try {
      const { title, secretKey } = input;
      const token = await OAuthSecretProvider.getSecretValue(secretKey);
      const accessToken = await GoogleProvider.refreshAccessToken(token);
      const authClient = new google.auth.OAuth2();

      authClient.setCredentials({ access_token: accessToken });

      const sheets = google.sheets({ version: "v4", auth: authClient });

      const response = await sheets.spreadsheets.create({
        requestBody: {
          properties: {
            title: title,
          },
        },
      });

      const spreadsheetId = response.data.spreadsheetId;
      const spreadsheetUrl = response.data.spreadsheetUrl;

      if (!spreadsheetId || !spreadsheetUrl) {
        throw new InternalServerErrorException("Failed to create spreadsheet");
      }

      return {
        spreadsheetId,
        spreadsheetUrl,
      };
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  /**
   * Append To Sheet
   */
  async appendToSheet(input: IGoogleSheet.IAppendToSheetInput): Promise<void> {
    try {
      const { values, secretKey, spreadSheetId, range } = input;
      const token = await OAuthSecretProvider.getSecretValue(secretKey);
      const accessToken = await GoogleProvider.refreshAccessToken(token);
      const authClient = new google.auth.OAuth2();

      authClient.setCredentials({ access_token: accessToken });
      const sheets = google.sheets({ version: "v4", auth: authClient });
      await sheets.spreadsheets.values.append({
        spreadsheetId: spreadSheetId,
        range: range,
        valueInputOption: "RAW",
        requestBody: {
          values: values,
        },
      });
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  /**
   * Read Google Sheet Headers
   * @param input Google Sheet Url and index number(default 0)
   */
  async readHeaders(
    input: IGoogleSheet.IReadGoogleSheetHeadersInput,
  ): Promise<IGoogleSheet.IReadGoogleSheetOutput> {
    try {
      const { url, index = 0, secretKey } = input;
      const id = this.getSpreadSheetId(url);
      const token = await OAuthSecretProvider.getSecretValue(secretKey);
      const accessToken = await GoogleProvider.refreshAccessToken(token);
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
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  /**
   * Add Permission to Google Sheet
   * @param input Google Sheet Url and Permission List including email and role
   */
  async permission(input: IGoogleSheet.IPermissionInput): Promise<void> {
    const { url, permissions, secretKey } = input;
    const id = this.getSpreadSheetId(url);
    const token = await OAuthSecretProvider.getSecretValue(secretKey);
    const accessToken = await GoogleProvider.refreshAccessToken(token);
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
        /**
         * @todo 권한 할당에 실패한 경우를 찾아서 재실행하거나 유저에게 알려줄 수 있어야 한다.
         */
        console.error(JSON.stringify(err));
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
    try {
      const { url, headerNames, index = 0, secretKey } = input;
      const token = await OAuthSecretProvider.getSecretValue(secretKey);
      const accessToken = await GoogleProvider.refreshAccessToken(token);
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
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  async getWorkSheet(
    input: IGoogleSheet.IGetWorkSheetInput,
  ): Promise<IGoogleSheet.IGetWorkSheetOutput> {
    try {
      const { url, secretKey } = input;
      const id = this.getSpreadSheetId(url);
      const token = await OAuthSecretProvider.getSecretValue(secretKey);
      const accessToken = await GoogleProvider.refreshAccessToken(token);
      const authClient = new google.auth.OAuth2();

      authClient.setCredentials({ access_token: accessToken });

      const doc = new GoogleSpreadsheet(id, authClient);
      await doc.loadInfo();
      const workSheets = doc.sheetsByIndex;
      const res = workSheets.map((worksheet: GoogleSpreadsheetWorksheet) => {
        return worksheet.title;
      });
      return { data: res };
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  async readRows(
    input: IGoogleSheet.IReadGoogleSheetRowsInput,
  ): Promise<IGoogleSheet.IReadGoogleSheetRowsOutput> {
    try {
      const { url, workSheetTitle, secretKey } = input;
      const id = this.getSpreadSheetId(url);
      const token = await OAuthSecretProvider.getSecretValue(secretKey);
      const accessToken = await GoogleProvider.refreshAccessToken(token);
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
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
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
