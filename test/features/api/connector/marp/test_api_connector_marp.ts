import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";

export const test_api_connector_marp = async (connection: CApi.IConnection) => {
  const res = await CApi.functional.connector.marp.convert_to_ppt.convertToPpt(
    connection,
    {
      markdown: `---
marp: true
title: Sample Presentation
description: A simple marp presentation example
theme: gaia
paginate: true
backgroundColor: #f0f0f0
class: lead
---
# 첫 번째 슬라이드
이것은 예제 Marp 슬라이드입니다.
---
## 두 번째 슬라이드
- 이 점은 중요합니다.
- 이것도 기억하세요.
---
### 세 번째 슬라이드
> 인용문을 여기에 넣습니다.
`,
    },
  );

  typia.assert(res);
};
