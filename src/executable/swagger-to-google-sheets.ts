import { OpenApi } from "@samchon/openapi";
import { randomInt } from "crypto";
import { readFileSync } from "fs";
import { google, sheets_v4 } from "googleapis";
import path from "path";
import typia from "typia";
import { ConnectorGlobal } from "../ConnectorGlobal";

const googleSheets = google.sheets("v4");
const googleDrive = google.drive("v3");
const folderId = `1FKoWiXIrVSYBZh7zPTLGEU0Oc2uXi2dB`;

async function getAccessToken() {
  try {
    const client = new google.auth.OAuth2(
      ConnectorGlobal.env.GOOGLE_CLIENT_ID,
      ConnectorGlobal.env.GOOGLE_CLIENT_SECRET,
    );

    client.setCredentials({
      refresh_token: decodeURIComponent(ConnectorGlobal.env.GOOGLE_TEST_SECRET),
    });

    const { credentials } = await client.refreshAccessToken();
    const accessToken = credentials.access_token;
    if (!accessToken) {
      throw new Error("AccessToken is not defined.");
    }

    return accessToken;
  } catch (err) {
    throw err;
  }
}

function getRandomColor() {
  return randomInt(255);
}

function getServiceName(pathname: string) {
  return pathname.match(/connector\/([^/]+)/)?.at(1) ?? "NONAMED";
}

async function setSize(
  spreadsheetId: string,
  totalRowLength: number,
  totalColumnLength: number,
  accessToken: string,
) {
  await googleSheets.spreadsheets.batchUpdate({
    spreadsheetId: spreadsheetId,
    requestBody: {
      requests: [
        {
          updateDimensionProperties: {
            range: {
              dimension: "ROWS",
              startIndex: 1,
              endIndex: totalRowLength, // 추가된 행 수 만큼
            },
            properties: {
              pixelSize: 80, // 아이콘 크기에 맞게 80으로 정의
            },
            fields: "pixelSize",
          },
        },
        {
          updateDimensionProperties: {
            range: {
              sheetId: 0,
              dimension: "COLUMNS",
              startIndex: 0,
              endIndex: totalColumnLength,
            },
            properties: {
              pixelSize: 160,
            },
            fields: "pixelSize",
          },
        },
        {
          updateDimensionProperties: {
            range: {
              sheetId: 0,
              dimension: "COLUMNS",
              startIndex: 1,
              endIndex: 2,
            },
            properties: {
              pixelSize: 40,
            },
            fields: "pixelSize",
          },
        },
        {
          updateDimensionProperties: {
            range: {
              sheetId: 0,
              dimension: "COLUMNS",
              startIndex: 2,
              endIndex: 3,
            },
            properties: {
              pixelSize: 80,
            },
            fields: "pixelSize",
          },
        },
        {
          updateDimensionProperties: {
            range: {
              sheetId: 0,
              dimension: "COLUMNS",
              startIndex: 3,
              endIndex: 4,
            },
            properties: {
              pixelSize: 40,
            },
            fields: "pixelSize",
          },
        },
        {
          updateDimensionProperties: {
            range: {
              sheetId: 0,
              dimension: "COLUMNS",
              startIndex: 4,
              endIndex: 5,
            },
            properties: {
              pixelSize: 440,
            },
            fields: "pixelSize",
          },
        },
        {
          updateDimensionProperties: {
            range: {
              sheetId: 0,
              dimension: "COLUMNS",
              startIndex: 7,
              endIndex: 8,
            },
            properties: {
              pixelSize: 400,
            },
            fields: "pixelSize",
          },
        },
        {
          updateDimensionProperties: {
            range: {
              sheetId: 0,
              dimension: "COLUMNS",
              startIndex: 8,
              endIndex: 9,
            },
            properties: {
              pixelSize: 800,
            },
            fields: "pixelSize",
          },
        },
      ],
    },
    access_token: accessToken,
  });
}

async function convertSwaggerToGoogleSheet(input: {
  document: OpenApi.IDocument;
  filename: string;
  accessToken: string;
}): Promise<{ spreadsheetId: string }> {
  const { document, filename, accessToken } = input;
  // 시트를 생성
  const sheet = await googleSheets.spreadsheets.create({
    requestBody: { properties: { title: filename } },
    access_token: accessToken,
  });

  const countByConnector = new Map<string, number>();
  const spreadsheetId = sheet.data.spreadsheetId;
  if (!spreadsheetId) {
    throw new Error("Error on onverting swagger to google sheets.");
  }

  const values: (string | number | boolean)[][] = [];

  Object.entries(document.paths ?? {})
    .sort(([keyA], [keyB]) => {
      const serviceA = getServiceName(keyA);
      const serviceB = getServiceName(keyB);

      return serviceA.localeCompare(serviceB);
    })
    .flatMap(([path, schema]) => {
      const service = getServiceName(path);

      return Object.entries(schema).map(([method, operation]) => {
        if (typia.is<OpenApi.IOperation<OpenApi.IJsonSchema>>(operation)) {
          const icon = String(
            "x-wrtn-icon" in operation ? operation["x-wrtn-icon"] : "",
          );

          const isFirst = countByConnector.get(service) ? false : true;
          if (isFirst) {
            values.push([
              service ? service : "",
              0, // 세일에 해당하는 인덱스로, 워크플로우 상 노드를 표현
              icon,
            ]);
            if (service) {
              countByConnector.set(service, 1);
            }
          }

          const index = service ? countByConnector.get(service) ?? 2 : 2;
          if (service) {
            countByConnector.set(service, index + 1);
          }

          const tags = JSON.stringify(operation.tags, null, 2);
          values.push([
            service ? service : "",
            index,
            icon,
            method,
            path,
            operation.deprecated ?? "",
            tags,
            operation.summary ?? "",
            operation.description ?? "",
          ]);
        }
      });
    });

  // 방금 생성한 파일을 이동
  await googleDrive.files.update({
    fileId: spreadsheetId,
    addParents: folderId, // 생성할 폴더 ID를 여기에 입력
    removeParents: "root", // 기본 폴더에서 이동
    access_token: accessToken,
  });

  // 헤더를 추가
  values.unshift([
    "Connector",
    "#",
    "Icon",
    "Method",
    "Path",
    "Deprecated",
    "Tags",
    "Summary",
    "Description",
  ]);

  // 데이터 삽입
  await googleSheets.spreadsheets.values.append({
    spreadsheetId: spreadsheetId,
    valueInputOption: "RAW",
    requestBody: {
      values: values,
    },
    range: "1:1000",
    access_token: accessToken,
  });

  // 칼럼 사이즈 정의
  await setSize(spreadsheetId, values.length, values[0].length, accessToken);

  // 커넥터 별로 색상 지정

  const requests = [...countByConnector].flatMap(([_, count], index, arr) => {
    const [r, g, b] = new Array(3).fill(0).map(() => getRandomColor());
    const sum = arr
      .slice(0, index)
      .map((el) => el[1])
      .reduce((acc, cur) => acc + cur, 1); // 헤더를 포함해서 세기 위해서 1부터 카운트한다.

    return new Array(count)
      .fill(0)
      .flatMap(
        (
          _,
          currentIdx,
        ): { updateCells: sheets_v4.Schema$UpdateCellsRequest }[] => {
          const icon = values[sum + currentIdx][2];
          return [
            {
              updateCells: {
                range: {
                  startColumnIndex: 1,
                  endColumnIndex: 2,
                  startRowIndex: sum + currentIdx,
                  endRowIndex: sum + currentIdx + 1,
                },
                rows: [
                  {
                    values: [
                      {
                        userEnteredFormat: {
                          backgroundColor: {
                            red: r,
                            green: g,
                            blue: b,
                            alpha: 0.8,
                          },
                        },
                      },
                    ],
                  },
                ],
                fields: "userEnteredFormat.backgroundColor",
              },
            },
            {
              updateCells: {
                range: {
                  startColumnIndex: 2,
                  endColumnIndex: 3,
                  startRowIndex: sum + currentIdx,
                  endRowIndex: sum + currentIdx + 1,
                },
                rows: [
                  {
                    values: [
                      {
                        userEnteredValue: {
                          formulaValue: `=IMAGE("${icon}", 4, 80, 80)`,
                        },
                      },
                    ],
                  },
                ],
                fields: "userEnteredValue",
              },
            },
          ];
        },
      );
  });

  await googleSheets.spreadsheets.batchUpdate({
    spreadsheetId: spreadsheetId,
    requestBody: {
      requests: requests,
    },
    access_token: accessToken,
  });

  return { spreadsheetId };
}

async function syncGoogleSheet(values: string[][], accessToken: string) {
  const originalSheet = `1TUDy4NdlHuv9BCVqBeIULkmVJ9t7ud4YBqCQmqzhegA` as const;

  await googleSheets.spreadsheets.values.append({
    spreadsheetId: originalSheet,
    valueInputOption: "RAW",
    requestBody: {
      values: values,
    },
    range: "수급 커넥터 이벤트 문서 관리!1:1000",
    access_token: accessToken,
  });
}

const main = async (): Promise<void> => {
  const filepath = path.join(__dirname, "../../packages/api/swagger.json");
  const swaggerJSon = readFileSync(filepath, { encoding: "utf-8" });
  const document = typia.json.assertParse<OpenApi.IDocument>(swaggerJSon);

  // 구글 시트 생성
  const accessToken = await getAccessToken();
  const version = document.info?.version;
  const today = new Intl.DateTimeFormat("ko-KR").format(new Date());
  const filename = `Connector Document v${version} (${today})`;
  const res = await convertSwaggerToGoogleSheet({
    document,
    accessToken,
    filename,
  });

  if (res?.spreadsheetId) {
    const url = `https://docs.google.com/spreadsheets/d/${res.spreadsheetId}`;
    await syncGoogleSheet([[version ?? "", url]], accessToken);
  }
};

main().catch((exp) => {
  console.log(exp);
  process.exit(-1);
});
