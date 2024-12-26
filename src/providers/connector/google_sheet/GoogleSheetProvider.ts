import { InternalServerErrorException } from "@nestjs/common";
import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";
import { google } from "googleapis";

import { IGoogleSheet } from "@wrtn/connector-api/lib/structures/connector/google_sheet/IGoogleSheet";

import { ISpreadsheet } from "@wrtn/connector-api/lib/structures/connector/swal/spreadsheet/ISpreadsheet";
import { ISpreadsheetCell } from "@wrtn/connector-api/lib/structures/connector/swal/spreadsheet/ISpreadsheetCell";
import { AxiosError } from "axios";
import { GoogleProvider } from "../../internal/google/GoogleProvider";
import { OAuthSecretProvider } from "../../internal/oauth_secret/OAuthSecretProvider";

export namespace GoogleSheetProvider {
  /**
   * Create Google Sheet
   */
  export async function createSpreadsheet(
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

  export async function insertCells(input: {
    secretKey: ISpreadsheet.IExport.ToGoogleSheetsToInput["google_sheets"]["secret"];
    spreadsheetId: string;
    cells: ISpreadsheetCell.ICreate[];
  }) {
    const token = await OAuthSecretProvider.getSecretValue(input.secretKey);
    const accessToken = await GoogleProvider.refreshAccessToken(token);
    const authClient = new google.auth.OAuth2();
    authClient.setCredentials({ access_token: accessToken });

    await google
      .sheets({ version: "v4", auth: authClient })
      .spreadsheets.batchUpdate({
        spreadsheetId: input.spreadsheetId,
        requestBody: {
          requests: input.cells.map((cell) => {
            return {
              updateCells: {
                range: {
                  /**
                   * @todo 시트 아이디를 지정할 수 있게 하기
                   */
                  sheetId: 0, // 0번째 시트를 의미
                  startRowIndex: cell.row - 1,
                  startColumnIndex: cell.column - 1,
                  endRowIndex: cell.row,
                  endColumnIndex: cell.column,
                },
                rows: [
                  {
                    values: [
                      {
                        userEnteredValue: { stringValue: cell.snapshot.value },
                      },
                    ],
                  },
                ],
                fields: "*",
              },
            };
          }),
        },
      });
  }

  /**
   * Append To Sheet
   */
  export async function appendToSheet(
    input: IGoogleSheet.IAppendToSheetInput,
  ): Promise<IGoogleSheet.ICreateGoogleSheetOutput> {
    try {
      const { values, secretKey, spreadSheetId } = input;
      const token = await OAuthSecretProvider.getSecretValue(secretKey);
      const accessToken = await GoogleProvider.refreshAccessToken(token);
      const authClient = new google.auth.OAuth2();

      authClient.setCredentials({ access_token: accessToken });
      const sheets = google.sheets({ version: "v4", auth: authClient });

      const res = await sheets.spreadsheets.values.append({
        spreadsheetId: spreadSheetId,
        valueInputOption: "RAW",
        requestBody: {
          values: values,
        },
        range: "A1:Z1000",
      });

      const spreadsheetId = res.data.spreadsheetId;
      if (!spreadsheetId) {
        throw new Error("Error to append rows.");
      }

      const spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}`;
      return { spreadsheetId: spreadsheetId, spreadsheetUrl };
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(JSON.stringify(error.response?.data));
      } else {
        console.error(JSON.stringify(error));
      }
      throw error;
    }
  }

  /**
   * Read Google Sheet Headers
   * @param input Google Sheet Url and index number(default 0)
   */
  export async function readHeaders(
    input: IGoogleSheet.IReadGoogleSheetHeadersInput,
  ): Promise<IGoogleSheet.IReadGoogleSheetOutput> {
    try {
      const { url, index = 0, secretKey } = input;
      const id = GoogleSheetProvider.getSpreadSheetId(url);
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
  export async function permission(
    input: IGoogleSheet.IPermissionInput,
  ): Promise<void> {
    const { url, permissions, secretKey } = input;
    const id = GoogleSheetProvider.getSpreadSheetId(url);
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
  export async function writeHeaders(
    input: IGoogleSheet.IWriteGoogleSheetHeadersInput,
  ): Promise<void> {
    try {
      const { url, headerNames, index = 0, secretKey } = input;
      const token = await OAuthSecretProvider.getSecretValue(secretKey);
      const accessToken = await GoogleProvider.refreshAccessToken(token);
      const authClient = new google.auth.OAuth2();

      authClient.setCredentials({ access_token: accessToken });

      const doc = new GoogleSpreadsheet(
        GoogleSheetProvider.getSpreadSheetId(url),
        authClient,
      );
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

  export async function getWorkSheet(
    input: IGoogleSheet.IGetWorkSheetInput,
  ): Promise<IGoogleSheet.IGetWorkSheetOutput> {
    try {
      const { url, secretKey } = input;
      const id = GoogleSheetProvider.getSpreadSheetId(url);
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

  export async function readRows(
    input: IGoogleSheet.IReadGoogleSheetRowsInput,
  ): Promise<IGoogleSheet.IReadGoogleSheetRowsOutput> {
    try {
      const { url, workSheetTitle, secretKey } = input;
      const id = GoogleSheetProvider.getSpreadSheetId(url);
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
  export function getSpreadSheetId(url: string): string {
    const match = url.match(/\/d\/(.+?)\/edit/);
    return match ? match[1] : "";
  }
}
