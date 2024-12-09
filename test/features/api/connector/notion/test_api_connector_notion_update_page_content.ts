import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_notion_update_page_content = async (
  connection: CApi.IConnection,
) => {
  const markdownExamples: string[] = [
    `# 프로젝트 개요

이 프로젝트는 **Notion API**를 활용하여 페이지의 내용을 자동으로 업데이트하는 것을 목표로 합니다. 주요 기능으로는 Markdown을 Notion 블록으로 변환하고, 기존 블록을 아카이브하며, 새로운 콘텐츠를 추가하는 기능이 포함됩니다.

## 주요 기능

- 페이지 생성 및 업데이트
- 블록 아카이브
- Markdown 변환 지원
`,

    `# 작업 목록

## 해야 할 일

- [x] Notion 통합 설정
- [ ] TypeScript 프로젝트 초기화
- [ ] Axios 설치 및 설정
- [ ] Markdown 변환 함수 구현
- [ ] 테스트 및 배포

## 참고 자료

1. [Notion API 공식 문서](https://developers.notion.com/)
2. [Axios GitHub](https://github.com/axios/axios)
3. [TypeScript 공식 사이트](https://www.typescriptlang.org/)
`,

    `# 프로젝트 로고

![프로젝트 로고](https://via.placeholder.com/150)

프로젝트에 대한 자세한 정보는 [여기](https://www.notion.so/)를 방문하세요.
`,

    `# 코드 예제

아래는 TypeScript로 작성된 간단한 함수입니다:

\`\`\`typescript
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));
\`\`\`

인라인 코드는 \`const axios = require('axios');\` 와 같이 작성할 수 있습니다.
`,

    `# Typia의 기본 개념과 특징

## 1. TypeScript와의 관계

Typia는 TypeScript의 타입 시스템을 확장하여 런타임에서 타입 검사를 수행할 수 있도록 돕습니다. 이를 통해 개발자는 컴파일 타임에 검증할 수 없는 부분을 런타임에 검증할 수 있습니다.

## 2. 실제 사용 사례

Typia는 다양한 프로젝트에서 타입 안전성을 강화하는 데 사용됩니다. 예를 들어, 대규모 애플리케이션에서 데이터의 일관성을 유지하고, API 통신 시 데이터의 유효성을 검증하는 데 활용됩니다.

## 3. 성능과 장단점

Typia는 빠른 성능을 자랑하며, 자동 타입 추론 기능을 통해 개발자의 생산성을 높입니다. 그러나 런타임 타입 검사를 추가함으로써 약간의 성능 오버헤드가 발생할 수 있습니다. 이러한 장단점을 고려하여 프로젝트에 적합한 방식으로 Typia를 활용할 수 있습니다.
`,
  ];
  const randomIndex = Math.floor(Math.random() * markdownExamples.length);

  const res =
    await CApi.functional.connector.notion.update_page_content.updatePageContent(
      connection,
      {
        blockId: "157ab4840d3380248e42cc9179831179",
        secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
        markdown: markdownExamples[randomIndex],
      },
    );
  typia.assertEquals(res);
};
