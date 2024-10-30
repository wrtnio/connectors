import { OpenApi } from "@samchon/openapi";
import { randomInt } from "crypto";
import { readFileSync } from "fs";
import { google, sheets_v4 } from "googleapis";
import path from "path";
import typia from "typia";
import { ConnectorGlobal } from "../ConnectorGlobal";

const getAccessToken = async () => {
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
};

const getRandomColor = () => {
  return randomInt(255);
};

const getServiceName = (pathname: string) => {
  return pathname.match(/connector\/([^/]+)/)?.at(1) ?? "NONAMED";
};

const main = async (): Promise<void> => {
  const filepath = path.join(__dirname, "../../packages/api/swagger.json");
  const swaggerJSon = await readFileSync(filepath, { encoding: "utf-8" });
  const document = typia.json.assertParse<OpenApi.IDocument>(swaggerJSon);

  const accessToken = await getAccessToken();
  const googleSheets = google.sheets("v4");
  const googleDrive = google.drive("v3");
  const version = document.info?.version;
  const today = new Intl.DateTimeFormat("ko-KR").format(new Date());
  const filename = `Connector Document v${version} (${today})`;
  const folderId = `1FKoWiXIrVSYBZh7zPTLGEU0Oc2uXi2dB`;

  // 시트를 생성
  const sheet = await googleSheets.spreadsheets.create({
    requestBody: { properties: { title: filename } },
    access_token: accessToken,
  });

  const countByConnector = new Map<string, number>();
  if (sheet.data.spreadsheetId) {
    const values = Object.entries(document.paths ?? {})
      .sort(([keyA], [keyB]) => {
        const serviceA = getServiceName(keyA);
        const serviceB = getServiceName(keyB);

        return serviceA.localeCompare(serviceB);
      })
      .flatMap(([path, schema]) => {
        const service = getServiceName(path);

        return Object.entries(schema).map(([method, operation]) => {
          if (typia.is<OpenApi.IOperation<OpenApi.IJsonSchema>>(operation)) {
            const index = service ? countByConnector.get(service) ?? 1 : 1; // 커넥터 별로 인덱스를 센다.
            if (service) {
              countByConnector.set(service, index + 1);
            }

            const tags = JSON.stringify(operation.tags, null, 2);
            return [
              service ? service : "",
              index,
              method,
              path,
              operation.deprecated,
              tags,
              operation.summary,
              operation.description,
            ];
          }
          return [];
        });
      });

    // 방금 생성한 파일을 이동
    await googleDrive.files.update({
      fileId: sheet.data.spreadsheetId,
      addParents: folderId, // 생성할 폴더 ID를 여기에 입력
      removeParents: "root", // 기본 폴더에서 이동
      access_token: accessToken,
    });

    // 헤더를 추가
    values.unshift([
      "Connector",
      "#",
      "Method",
      "Path",
      "Deprecated",
      "Tags",
      "Summary",
      "Description",
    ]);

    // 데이터 삽입
    await googleSheets.spreadsheets.values.append({
      spreadsheetId: sheet.data.spreadsheetId,
      valueInputOption: "RAW",
      requestBody: {
        values: values,
      },
      range: "1:1000",
      access_token: accessToken,
    });

    // 스타일 수정
    await googleSheets.spreadsheets.batchUpdate({
      spreadsheetId: sheet.data.spreadsheetId,
      requestBody: {
        requests: [
          {
            updateDimensionProperties: {
              range: {
                sheetId: 0,
                dimension: "COLUMNS",
                startIndex: 0,
                endIndex: values.length - 1,
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
                pixelSize: 320,
              },
              fields: "pixelSize",
            },
          },
          {
            updateDimensionProperties: {
              range: {
                sheetId: 0,
                dimension: "COLUMNS",
                startIndex: 6,
                endIndex: 7,
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
                startIndex: 7,
                endIndex: 8,
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

    // 커넥터 별로 색상 지정

    const requests = [...countByConnector].flatMap(
      ([service, count], index, arr) => {
        const [r, g, b] = new Array(3).fill(0).map(() => getRandomColor());
        const sum = arr
          .slice(0, index)
          .map((el) => el[1] - 1) // count는 마지막에 +1 상태로 멈춰있기 때문에 Length는 1을 뺀 것만큼에 해당한다.
          .reduce((acc, cur) => acc + cur, 1); // 헤더를 제외하기 위해 + 1을 추가

        // count는 마지막에 +1 상태로 멈춰있기 때문에 Length는 1을 뺀 것만큼에 해당한다.
        return new Array(count - 1)
          .fill(0)
          .map(
            (
              _,
              currentIdx,
            ): { updateCells: sheets_v4.Schema$UpdateCellsRequest } => ({
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
            }),
          );
      },
    );

    await googleSheets.spreadsheets.batchUpdate({
      spreadsheetId: sheet.data.spreadsheetId,
      requestBody: {
        requests: requests,
      },
      access_token: accessToken,
    });
  }
};

main().catch((exp) => {
  console.log(exp);
  process.exit(-1);
});
