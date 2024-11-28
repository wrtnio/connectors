import { ICommon } from "../common/ISecretValue";

export namespace IArticles {
  // 예제로 작성한 코드
  export type IExportSecretInput = ICommon.ISecretTuple<
    [
      {
        "x-wrtn-secret-key": "google";
        "x-wrtn-secret-scopes": ["a", "b"];
      },
      {
        "x-wrtn-secret-key": "notion";
        "x-wrtn-secret-scopes": ["c", "d"];
      },
    ]
  >;
}
