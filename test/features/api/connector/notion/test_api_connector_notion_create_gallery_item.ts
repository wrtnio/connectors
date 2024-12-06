import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_notion_create_gallery_item = async (
  connection: CApi.IConnection,
) => {
  const res =
    await CApi.functional.connector.notion.create_gallery_item.createGalleryItem(
      connection,
      [
        {
          databaseId: "152ab4840d33817a8f31de646ec296b3",
          secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
          title: "Gallery Item",
          markdown: `
        # 📢 프로젝트 알림: TodoList 앱 출시!

**안녕하세요, 개발자 여러분!**

우리는 최근 사용자의 생산성을 극대화할 수 있는 **TodoList 앱**을 출시했습니다. 🎉  
간편한 인터페이스와 강력한 기능으로 일정을 체계적으로 관리하세요.

---

### 주요 기능
- **Drag & Drop 지원**: 태스크를 손쉽게 정렬할 수 있어요.
- **다중 뷰 모드**: 달력, 리스트, 보드 등 원하는 방식으로 작업을 확인하세요.
- **알림 기능**: 마감일을 놓치지 않도록 스마트 알림을 제공합니다.

![TodoList 앱 스크린샷](https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg)

---

**지금 다운로드하고, 오늘 할 일을 기록하세요!**  
[다운로드 링크](https://studio-pro.wrtn.ai)  
여러분의 피드백은 언제나 환영입니다. `,
        },
        {
          databaseId: "152ab4840d33817a8f31de646ec296b3",
          secretKey: ConnectorGlobal.env.NOTION_TEST_SECRET,
          title: "Gallery Item 2",
          markdown: `
       # 내 사진 갤러리

환영합니다! 아래는 제가 찍은 멋진 사진들입니다.

![아름다운 일몰](https://serpapi.com/searches/67527ebd3c9575cb36004eec/images/48830a2bc5c5b5663e0df241272a4ca47bf7b38dde8af091f6b953ded7cd88be.jpeg)

더 많은 사진을 보고 싶으시면 [저희 웹사이트](https://studio-pro.wrtn.ai)를 방문해주세요.

또 다른 멋진 사진도 확인해보세요:

![산 풍경](https://serpapi.com/searches/67527ebd3c9575cb36004eec/images/48830a2bc5c5b56650f7a6df6b16015a9956c231bd797b273b64c28cf003fd90.jpeg)

감사합니다!`,
        },
      ],
    );
  typia.assertEquals(res);
};
