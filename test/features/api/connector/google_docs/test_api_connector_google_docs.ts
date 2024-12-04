import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IGoogleDocs } from "@wrtn/connector-api/lib/structures/connector/google_docs/IGoogleDocs";

import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_google_docs = async (
  connection: CApi.IConnection,
) => {
  /**
   * create a new Google Docs
   */
  const createGoogleDocsInput: IGoogleDocs.ICreateGoogleDocsInput = {
    title: "connector_test",
    secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
  };
  const createGoogleDocsOutput: IGoogleDocs.ICreateGoogleDocsOutput =
    await CApi.functional.connector.google_docs.createDocs(
      connection,
      createGoogleDocsInput,
    );
  typia.assert<IGoogleDocs.ICreateGoogleDocsOutput>(createGoogleDocsOutput);

  const docId = createGoogleDocsOutput.id;
  /**
   * Permission Google Docs
   */
  const permissionGoogleDocsInput: IGoogleDocs.IPermissionGoogleDocsInput = {
    secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
    documentId: docId,
    permissions: [
      {
        email: "jake@wrtn.io",
        role: "writer",
        type: "user",
      },
    ],
  };
  const permissionGoogleDocsOutput =
    await CApi.functional.connector.google_docs.permission(
      connection,
      permissionGoogleDocsInput,
    );
  typia.assert(permissionGoogleDocsOutput);

  /**
   * Append text to docs
   */
  const appendTextToDocsInput: IGoogleDocs.IAppendTextGoogleDocsInput = {
    secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
    documentId: docId,
    text: "Hello World",
  };
  const appendTextToDocsOutput =
    await CApi.functional.connector.google_docs.append(
      connection,
      appendTextToDocsInput,
    );
  typia.assert(appendTextToDocsOutput);

  /**
   * Read docs contents
   */
  const readDocsOutput =
    await CApi.functional.connector.google_docs.get.readDocs(
      connection,
      docId,
      {
        secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
      },
    );
  typia.assert<"Hello World\n">(readDocsOutput.data.text);
  typia.assert<IGoogleDocs.IReadGoogleDocsOutput>(readDocsOutput);

  /**
   * Create docs by template
   */
  const createDocByTemplateInput: IGoogleDocs.ICreateDocByTemplateInput = {
    title: "connector_test_2",
    templateId: docId,
    secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
  };
  const createDocByTemplateOutput =
    await CApi.functional.connector.google_docs.template.createDocByTemplate(
      connection,
      createDocByTemplateInput,
    );
  typia.assert<IGoogleDocs.ICreateDocByTemplateOutput>(
    createDocByTemplateOutput,
  );

  /**
   * Read docs list
   */
  const readDocsListOutput =
    await CApi.functional.connector.google_docs.get_list.list(connection, {
      secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
    });
  typia.assert<IGoogleDocs.IListGoogleDocsOutput>(readDocsListOutput);

  /**
   * Delete docs
   */
  const ids = [docId, createDocByTemplateOutput.id];
  for (const id of ids) {
    const res = await CApi.functional.connector.google_docs.deleteById(
      connection,
      id,
      {
        secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
      },
    );
    typia.assert(res);
  }
};

export const test_api_connector_google_docs_create_page = async (
  connection: CApi.IConnection,
) => {
  /**
   * Append text to docs
   */
  const res2 = await CApi.functional.connector.google_docs.append(connection, {
    secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
    documentId: "1M8ONTR4tJKkTqy8NEA5uasLYvwfDJUM9w7vvm7JCiPA",
    text: `
# Markdown to google docs
# Heading1
this is heading1.

## Heading2
this is heading2.

### Heading3
this is heading3.



\`\`\`ts
console.log('TypeScript is wonderful.');
const a = 1;
const b = '2';
const c: number = a + b;
      ^
      'c' is assigned a value but never used. (eslint@typescript-eslint/no-unused-vars)
\`\`\`
this is code.

---
this is hr.


`,
  });

  typia.assert(res2);
};

export const test_api_connector_google_docs_write_by_markdown_format_string =
  async (connection: CApi.IConnection) => {
    /**
     * Append text to docs
     */
    const res = await CApi.functional.connector.google_docs.markdown.write(
      connection,
      {
        secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
        name: "TEST_FILE(YOU_CAN_DELETE_IT)",
        markdown: `# 삼성전자 (Samsung Electronics)

삼성전자는 대한민국을 대표하는 글로벌 전자제품 제조 기업입니다. 이 글에서는 삼성전자의 주요 정보와 성과를 정리하며, 마크다운의 다양한 요소를 활용하겠습니다.

---

## 개요
- **설립**: 1969년
- **본사 위치**: 대한민국 수원시
- **주요 제품**: 스마트폰, TV, 반도체, 가전제품

---

## 주요 제품군

### 1. 스마트폰
- 삼성전자의 스마트폰 브랜드는 **갤럭시(Galaxy)**입니다.
  - 최신 모델: Galaxy S24, Galaxy Z Fold5
  - 주요 경쟁사: Apple, Huawei

### 2. 반도체
- 삼성전자는 **메모리 반도체** 분야에서 세계 1위를 유지하고 있습니다.
  - DRAM
  - NAND Flash

---

## 삼성전자의 성과
> 삼성전자는 기술 혁신과 품질로 글로벌 시장에서 입지를 공고히 하고 있습니다.

### 2023년 재무 실적
- **매출**: 302조 원
- **영업이익**: 36조 원

---

## 삼성전자의 구조

| 부문         | 주요 제품              | 비고            |
|--------------|-----------------------|-----------------|
| CE (소비자가전) | TV, 냉장고, 세탁기    | 디자인 혁신     |
| IM (IT·모바일) | 스마트폰, 태블릿       | 갤럭시 브랜드   |
| DS (디바이스솔루션) | 반도체, 디스플레이 패널 | 세계 1위        |

---

## 삼성전자의 철학
1. **고객 중심**: 고객의 필요와 기대를 우선시합니다.
2. **혁신**: 지속적인 연구개발로 기술을 선도합니다.
3. **사회 공헌**: 지속 가능한 미래를 위한 사회적 책임을 다합니다.

---

## 마크다운 기능 예제

### 코드 블록
아래는 Python으로 간단히 매출 증가율을 계산하는 코드입니다:

\`\`\`python
# 삼성전자 매출 증가율 계산
previous_revenue = 280  # 단위: 조 원
current_revenue = 302  # 단위: 조 원

growth_rate = ((current_revenue - previous_revenue) / previous_revenue) * 100
print(f"삼성전자의 매출 증가율: {growth_rate:.2f}%")
\`\`\`
`,
      },
    );

    console.log(JSON.stringify(res, null, 2));
    typia.assert(res);
  };
