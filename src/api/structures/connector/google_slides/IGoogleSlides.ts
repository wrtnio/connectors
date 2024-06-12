import { Constant } from "@wrtn/decorators";

import { ICommon } from "../common/ISecretValue";

export namespace IGoogleSlides {
  /**
   * @title Google Slide의 Presentation resource.
   */
  export interface Presentation
    extends ICommon.ISecret<
      "google",
      ["https://www.googleapis.com/auth/presentations"]
    > {
    /**
     * @title 프레젠네이션의 ID.
     */
    presentationId: string;

    /**
     * @title 프레젠테이션의 페이지 크기.
     */
    pageSize: Size;

    /**
     * @@title 프레젠테이션의 슬라이드.
     *
     * 슬라이드는 슬라이드 레이아웃에서 속성을 상속합니다.
     */
    slides: Page[];

    /**
     * @title 프레젠테이션의 제목.
     */
    title: string;

    /**
     * @title 프레젠테이션의 슬라이드 마스터.
     *
     * 슬라이드 마스터에는 레이아웃 집합에 대한 모든 일반 페이지 요소와 공통 속성이 포함되어 있습니다. 다음과 같은 세 가지 용도로 사용됩니다.
     *
     * - 마스터의 자리표시자 도형은 해당 마스터를 사용하는 페이지에 있는 모든 자리표시자 도형의 기본 텍스트 스타일 및 도형 속성을 포함합니다.
     * - 마스터 페이지 속성은 레이아웃에 상속되는 일반적인 페이지 속성을 정의합니다
     * - 마스터 슬라이드의 다른 모든 도형은 레이아웃에 관계없이 해당 마스터를 사용하는 모든 슬라이드에 표시됩니다.
     */
    masters: Page[];

    /**
     * @title 콘텐츠를 정렬하고 스타일을 지정하는 템플릿.
     *
     * 프레젠테이션의 레이아웃 레이아웃은 해당 레이아웃에서 상속된 슬라이드에서 콘텐츠를 정렬하고 스타일을 지정하는 방식을 결정하는 템플릿입니다.
     */
    layouts: Page[];

    /**
     * @title 프레젠테이션의 언어
     *
     * IETF BCP 7 언어 태크 형식.
     */
    locale: string;

    /**
     * @title 출력 전용 프레젠테이션 버전의 ID.
     *
     * 마지막 읽기 작업 이후 프레젠테이션 버전이 변경되지 않았음을 어설션하는 업데이트 요청에 사용할 수 있습니다.
     *
     * 사용자가 프레젠테이션에 대한 수정 액세스 권한이 있는 경우에만 채워집니다.
     *
     * 버전 ID는 순차 번호가 아니라 모호한 문자열입니다.
     *
     * 버전 ID의 형식은 시간이 지남에 따라 변경될 수 있으므로 불투명하게 처리해야 합니다.
     *
     * 반환된 버전 ID는 반환된 후 24시간 동안만 유효하며 사용자 간에 공유할 수 없습니다.
     *
     * 통화 간에 버전 ID가 변경되지 않으면 프레젠테이션이 변경되지 않은 것입니다.
     *
     * 반대로, 변경된 ID (동일한 프레젠테이션 및 사용자)는 일반적으로 프레젠테이션이 업데이트되었음을 의미합니다.
     *
     * 그러나 ID 형식 변경과 같은 내부 요인으로 인해 ID가 변경되었을 수도 있습니다.
     */
    revisionId: string;

    /**
     * @title 프레젠테이션의 메모 마스터.
     */
    notesMaster: Page;
  }

  export interface Size {
    width: Dimension;
    height: Dimension;
  }

  export interface Dimension {
    /**
     * @title 규모.
     */
    magnitude: number;

    /**
     * @title 크기 단위.
     */
    unit: Unit;
  }

  /**
   * @title 측정 단위.
   */
  export type Unit =
    | Constant<"UNIT_UNSPECIFIED", { title: "알 수 없는 단위" }>
    | Constant<
        "EMU",
        {
          title: "영국식 단위 (EMU)";
          description: "는 1센티미터의 1/360,000으로 정의되므로 인치당 914,400 EMU 및 포인트당 12,700 EMU가 있습니다.";
        }
      >
    | Constant<"PT", { title: "포인트"; description: "1/72인치입니다." }>;

  export interface Page {}
}
