import { Constant } from "@wrtn/decorators";
import { tags } from "typia";

import { ICommon } from "../common/ISecretValue";

export namespace IGoogleSlides {
  /**
   * @title Google Slides의 프레젠테이션을 생성하기 위한 요청 DTO.
   */
  export type ICreatePresentationInput = ICommon.ISecret<
    "google",
    ["https://www.googleapis.com/auth/presentations"]
  > &
    Presentation;

  /**
   * @title Google Slides의 Presentation resource.
   */
  export interface Presentation {
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

  export interface Page {
    /**
     * @title 이 페이지의 객체 ID.
     *
     * `Page`와 `PageElement`에서 사용하는 객체 ID는 동일한 네임스페이스를 공유한다.
     */
    objectId: string;

    /**
     * @title 페이지 유형.
     */
    pageType: PageType;

    /**
     * @title 페이지에서 렌더링된 페이지 요소.
     */
    pageElements: PageElement[];
  }

  /**
   * @title 페이지 유형.
   */
  export type PageType =
    | Constant<"SLIDE", { title: "슬라이드 페이지" }>
    | Constant<"MASTER", { title: "마스터 슬라이드 페이지" }>
    | Constant<"LAYOUT", { title: "레이아웃 페이지" }>
    | Constant<"NOTES", { title: "메모 페이지" }>
    | Constant<"NOTES_MASTER", { title: "메모 마스터 페이지" }>;

  /**
   * @title 페이지에서 렌더링된 페이지 요소.
   */
  export type PageElement = {
    /**
     * @title 이 페이지 요소의 개체 ID.
     *
     * `Page`와 `PageElement`에서 사용하는 객체 ID는 동일한 네임스페이스를 공유한다.
     */
    objectId: string;

    /**
     * @ttitle 페이지 요소의 크기.
     */
    size: Size;

    /**
     * @title 페이지 요소의 변환.
     *
     * 페이지 요소의 시각적 모양은 절대 변환에 따라 결정됩니다.
     *
     * 절대 변환을 계산하려면 페이지 요소의 변환을 모든 상위 그룹의 변환과 연결합니다.
     *
     * 페이지 요소가 그룹에 없는 경우 절대 변환은 이 필드의 값과 동일합니다.
     *
     * 새로 생성된 Group의 초기 변환은 항상 ID 변환입니다.
     */
    transform: Transform;

    /**
     * @title 페이지 요소의 제목.
     *
     * 설명과 결합하여 대체 텍스트를 표시한다.
     */
    title: string;

    /**
     * @title 페이지 요소의 설명.
     *
     * 제목과 결합하여 대체 텍스트를 표시한다.
     */
    description: string;
  } & (
    | {
        /**
         * @title 하나의 단위로 결합된 페이지 요소의 모음.
         */
        elementGroup: Group;
      }
    | {
        /**
         * @title 일반 셰이프.
         */
        shape: Shape;
      }
    | {
        /**
         * @title 이미지 페이지 요소.
         */
        image: Image;
      }
    | {
        /**
         * @title 동영상 페이지 요소.
         */
        video: Video;
      }
    | {
        /**
         * @title 라인 페이지 요소.
         */
        line: Line;
      }
    | {
        /**
         * @title 표 페이지 요소.
         */
        table: Table;
      }
    | {
        /**
         * @title 워드아트 페이지 요소.
         */
        wordArt: WordArt;
      }
    | {
        /**
         * @title Google Sheets에서 삽입된 연결된 차트 연결.
         *
         * 해제된 차트는 이미지로 표시됩니다.
         */
        sheetsChart: SheetsChart;
      }
    | {
        /**
         * @title 발표자 스포트라이트.
         */
        speakerSpotlight: SpeakerSpotlight;
      }
  );

  /**
   * @title 항목 그룹.
   */
  export interface Group {
    /**
     * @title 그룹의 요소 모음.
     */
    children: PageElement[] & tags.MaxItems<2>;
  }

  export interface Shape {
    /**
     * @title 도형의 유형.
     */
    shapeType: Shape.Type;

    /**
     * @title 도형의 텍스트 콘텐츠.
     */
    text: TextContent;

    /**
     * @title 도형의 속성.
     */
    shapeProperties: ShapeProperties;

    /**
     * @title 자리표시자는 레이아웃과 마스터의 해당 자리표시자에서 상속되는 페이지 요소.
     *
     * 설정된 경우 도형은 자리표시자 도형이며 상속된 속성은 Placeholder.parent_object_id 필드로 식별된 상위 자리표시자를 확인하여 확인할 수 있습니다.
     */
    placeholder: Placeholder;
  }

  export interface ShapeProperties {}

  export interface TextContent {
    textElement: TextElement[];

    list: {
      string: List;
    };
  }

  export type TextElement = {
    /**
     * @title 이 텍스트 요소의 0부터 시작되는 시작 색인. (유니코드 코드 단위)
     */
    startIndex: number & tags.Type<"int64">;

    /**
     * @title 이 텍스트 요소의 0부터 시작되는 종료 색인. (유니코드 코드 단위 제외)
     */
    endIndex: number & tags.Type<"int64">;
  } & (
    | {
        /**
         * @title 단락 마커.
         *
         * 새 단락의 시작을 나타내는 TextElement 종류입니다.
         */
        paragraphMarker: ParagraphMarker;
      }
    | {}
  );

  export interface ParagraphMarker {
    /**
     * @title 단락의 스타일.
     */
    stype: ParagraphStyle;

    /**
     * @title 이 단락의 글머리 기호.
     *
     * 없는 경우 단락이 목록에 속하지 않는다.
     */
    bullet: Bullet;
  }

  /**
   * @title 단락의 글머리 기호.
   */
  export interface Bullet {
    /**
     * @title 이 단락이 속한 목록의 ID
     */
    list: string;

    /**
     * @title 목록에서 이 단락의 중첩 수준.
     */
    nestingLevel: number & tags.Type<"int64">;

    /**
     * @title 이 단락에 대해 렌더링된 글머리 기호 글리프.
     */
    glyph: string;

    /**
     * @title 이 글머리 기호에 적용되는 단락별 텍스트 스타일.
     */
    bulletStyle: TextStyle;
  }

  /**
   * TextRun에 적용할 수 있는 스타일을 나타냅니다.
   *
   * 이 텍스트가 상위 placeholder가 있는 도형에 포함되어 있으면 이 텍스트 스타일이 상위 요소로부터 상속될 수 있습니다.
   *
   * 상속되는 텍스트 스타일은 목록의 중첩 수준에 따라 다릅니다.
   *
   * - 목록에 없는 단락에서 실행되는 텍스트는 상위 자리표시자 내 목록의 0 중첩 수준에서 단락의 줄바꿈 문자에서 텍스트 스타일을 상속합니다.
   * - 목록에 있는 단락에서 실행되는 텍스트는 상위 자리표시자 내 목록의 해당 중첩 수준에서 단락의 줄바꿈 문자에서 텍스트 스타일을 상속합니다.
   *
   * 상속된 텍스트 스타일은 이 메시지에서 설정되지 않은 필드로 표시됩니다.
   *
   * 상위 자리표시자가 없는 도형에 텍스트가 포함된 경우 이 필드를 설정 해제하면 스타일이 Slides 편집기에서 기본값과 일치하는 값으로 되돌아갑니다.
   */
  export interface TextStyle {
    /**
     * @title 텍스트의 배경색.
     *
     * 이 속성을 설정하면 색상의 opaqueColor 필드가 설정되어 있는지에 따라 색상이 불투명하거나 투명합니다.
     */
    backgroundColor: OptionalColor;

    /**
     * @title 텍스트 자체의 색상.
     *
     * 이 속성을 설정하면 색상의 opaqueColor 필드가 설정되어 있는지에 따라 색상이 불투명하거나 투명합니다.
     */
    foregroundColor: OptionalColor;

    /**
     * @title 텍스트가 굵게 렌더링되는지 여부.
     */
    bold: boolean;

    /**
     * @title 텍스트에 기울임꼴을 적용할지 여부.
     */
    italic: boolean;

    /**
     * @title 텍스트의 글꼴.
     *
     * 글꼴 모음은 Slides의 글꼴 메뉴 또는 Google Fonts의 글꼴일 수 있습니다.
     *
     * 글꼴 이름이 인식되지 ㅇ낳으면 텍스트가 `Arial`에서 렌더링된다.
     *
     * 일부 글꼴은 텍스트의 두께에 영향을 줄 수 있다.
     *
     * 업데이트 요청에서 fonrtFamily 및 bold 값을 모두 지정하면 명시적으로 설정된 bold 값이 사용된다.
     */
    fontFamily: string;

    /**
     * @title 텍스트 글꼴의 크기.
     *
     * 읽을 때 `fontSize`가 포인트로 지정된다.
     */
    fontSize: Dimension;

    /**
     * @title 텍스트의 하이퍼링크 대상.
     * 설정하지 않으면 링크가 표시되지 않습니다.
     *
     * 링크는 상위 텍스트에서 상속되지 않습니다.
     *
     * 업데이트 요청에서 링크를 변경하면 범위의 텍스트 스타일이 일부 변경됩니다.
     *
     * 링크를 설정할 때 텍스트 전경색이 ThemeColorType.HYPERLINK으로 설정되고 텍스트에 밑줄이 표시됩니다.
     *
     * 동일한 요청에서 이러한 필드가 수정되면 링크 기본값 대신 해당 값이 사용됩니다.
     *
     * 기존 링크와 겹치는 텍스트 범위에 링크를 설정하면 새 URL을 가리키도록 기존 링크도 업데이트됩니다.
     *
     * 줄바꿈 문자에는 링크를 설정할 수 없습니다.
     *
     * 따라서 단락 경계를 가로지르는 텍스트 범위(예: "ABC\n123")에 링크를 설정하면 줄바꿈 문자가 자체 텍스트 실행으로 분리됩니다.
     *
     * 이 링크는 줄바꿈 전후의 실행에 별도로 적용됩니다.
     *
     * 링크를 삭제하면 동일한 텍스트에 다른 스타일이 설정되어 있지 않는 한 범위의 텍스트 스타일이 이전 텍스트 (또는 이전 텍스트가 다른 링크인 경우 기본 텍스트 스타일)의 스타일과 일치하도록 업데이트됩니다.
     */
    link: Link;

    /**
     * @title 일반 위치에서의 텍스트 세로 오프셋.
     *
     * SUPERSCRIPT 또는 SUBSCRIPT 기준 오프셋이 있는 텍스트는 더 작은 글꼴 크기로 자동 렌더링되며 fontSize 필드를 기준으로 계산됩니다.
     *
     * fontSize 자체는 이 필드의 변경에 영향을 받지 않습니다.
     */
    baselineOffset: BaselineOffset;

    /**
     * @title 텍스트가 작은 대문자인지 여부.
     */
    smallCaps: boolean;

    /**
     * @title 취소선 표시 여부.
     */
    strikethrough: boolean;

    /**
     * @title 텍스트에 밑줄이 표시되는지 여부.
     */
    underline: boolean;

    /**
     * @title 글꼴 모음 및 텍스트의 렌더링된 두꼐.
     */
    weightedFontFamily: WeightedFontFamily;
  }

  export interface ParagraphStyle {
    lineSpacing: number;

    /**
     * @title 단락의 텍스트 정렬 유형
     */
    alignment: Alignment;

    /**
     *
     */
    indentStart: Dimension;
    indentEnd: Dimension;
    spaceAbove: Dimension;
    spaceBelow: Dimension;
    indentFirstLine: Dimension;
    direction: TextDirection;
    spacingMode: SpacingMode;
  }

  /**
   * @title 단락의 텍스트 정렬 유형
   */
  export type Alignment =
    | Constant<
        "ALIGNMENT_UNSPECIFIED",
        { title: "단락 정렬은 상위 요소로부터 상속됩니다." }
      >
    | Constant<
        "START",
        {
          title: "단락이 줄의 시작 부분에 정렬됩니다. LTR 텍스트의 경우 왼쪽, 그렇지 않은 경우 오른쪽 정렬";
        }
      >
    | Constant<"CENTER", { title: "단락이 중앙에 표시됩니다." }>
    | Constant<
        "END",
        {
          title: "단락이 줄의 끝에 정렬됩니다. LTR 텍스트의 경우 오른쪽 정렬, 그렇지 않은 경우 왼쪽 정렬";
        }
      >
    | Constant<"JUSTIFIED", { title: "단락이 정렬되었습니다." }>;

  /**
   * @title 텍스트 방향.
   *
   * 텍스트 경로가 표시될 수 있다.
   */
  export type TextDirection =
    | Constant<
        "TEXT_DIRECTION_UNSPECIFIED",
        { title: "텍스트 방향은 상위 요소로부터 상속됩니다." }
      >
    | Constant<
        "LEFT_TO_RIGHT",
        { title: "텍스트가 왼쪽에서 오른쪽으로 이동합니다." }
      >
    | Constant<
        "RIGHT_TO_LEFT",
        { title: "텍스트가 오른쪽에서 왼쪽으로 이동합니다." }
      >;

  /**
   * @title 간격 모드.
   *
   * 단락 간격의 여러 가지 모드.
   */
  export type SpacingMode =
    | Constant<
        "SPACING_MODE_UNSPECIFIED",
        { title: "간격 모드는 상위 요소로부터 상속됩니다." }
      >
    | Constant<"NEVER_COLLAPSE", { title: "단락 간격은 항상 렌더링됩니다." }>
    | Constant<
        "COLLAPSE_LISTS",
        { title: "목록 요소 간에 단락 간격을 건너뜁니다." }
      >;

  /**
   * @title 도형의 유형.
   */
  export namespace Shape {
    /**
     * @title 도형 유형
     *
     * 이러한 도형의 대부분은 ECMA-376 표준의 사전 정의된 도형에 해당합니다.
     *
     * 이러한 도형에 관한 자세한 내용은 ECMA-376 4판의 1부 'Office Open XML File Formats - Fundamentals and Markup Language Reference'의 섹션 20.1.10.55에서 'ST_ShapeType' 간단한 유형에 관한 설명을 참고하세요.
     */
    export type Type =
      | Constant<"TYPE_UNSPECIFIED", { title: `사전 정의된 도형 유형.` }>
      | Constant<"TEXT_BOX", { title: `텍스트 상자 도형` }>
      | Constant<
          "RECTANGLE",
          { title: `직사각형 도형 ECMA-376 ST_ShapeType 'rect'에 해당합니다.` }
        >
      | Constant<
          "ROUND_RECTANGLE",
          {
            title: `모서리가 둥근 직사각형 ECMA-376 ST_ShapeType 'roundRect'에 해당합니다.`;
          }
        >
      | Constant<
          "ELLIPSE",
          { title: `타원형. ECMA-376 ST_ShapeType 'ellipse'에 해당합니다.` }
        >
      | Constant<
          "ARC",
          {
            title: `구부러진 원호 모양 ECMA-376 ST_ShapeType 'arc'에 해당합니다.`;
          }
        >
      | Constant<
          "BENT_ARROW",
          {
            title: `휘어진 화살표 도형 ECMA-376 ST_ShapeType 'bentArrow'에 해당합니다.`;
          }
        >
      | Constant<
          "BENT_UP_ARROW",
          {
            title: `위로 휘어진 화살표 모양 ECMA-376 ST_ShapeType 'bentUpArrow'에 해당합니다.`;
          }
        >
      | Constant<
          "BEVEL",
          { title: `입체 테두리. ECMA-376 ST_ShapeType 'bevel'에 해당합니다.` }
        >
      | Constant<
          "BLOCK_ARC",
          {
            title: `블록 원호 모양 ECMA-376 ST_ShapeType 'blockArc'에 해당합니다.`;
          }
        >
      | Constant<
          "BRACE_PAIR",
          {
            title: `중괄호 쌍 모양입니다. ECMA-376 ST_ShapeType 'bracePair'에 해당합니다.`;
          }
        >
      | Constant<
          "BRACKET_PAIR",
          {
            title: `괄호 쌍 모양 ECMA-376 ST_ShapeType 'rackPair'에 해당합니다.`;
          }
        >
      | Constant<
          "CAN",
          {
            title: `도형을 만들 수 있습니다. ECMA-376 ST_ShapeType 'can'에 해당합니다.`;
          }
        >
      | Constant<
          "CHEVRON",
          {
            title: `갈매기형 도형 ECMA-376 ST_ShapeType 'chevron'에 해당합니다.`;
          }
        >
      | Constant<
          "CHORD",
          { title: `코드 모양 ECMA-376 ST_ShapeType 'chord'에 해당합니다.` }
        >
      | Constant<
          "CLOUD",
          { title: `구름 모양 ECMA-376 ST_ShapeType 'cloud'에 해당합니다.` }
        >
      | Constant<
          "CORNER",
          { title: `모서리 모양 ECMA-376 ST_ShapeType 'corner'에 해당합니다.` }
        >
      | Constant<
          "CUBE",
          { title: `정육면체 ECMA-376 ST_ShapeType 'cube'에 해당합니다.` }
        >
      | Constant<
          "CURVED_DOWN_ARROW",
          {
            title: `아래쪽 화살표 모양 ECMA-376 ST_ShapeType 'curvedDown화살표'에 해당합니다.`;
          }
        >
      | Constant<
          "CURVED_LEFT_ARROW",
          {
            title: `왼쪽 구부러진 화살표 모양 ECMA-376 ST_ShapeType 'curvedLeft화살표'에 해당합니다.`;
          }
        >
      | Constant<
          "CURVED_RIGHT_ARROW",
          {
            title: `오른쪽 구부러진 화살표 모양 ECMA-376 ST_ShapeType 'curvedRightArrow'에 해당합니다.`;
          }
        >
      | Constant<
          "CURVED_UP_ARROW",
          {
            title: `위로 구부러진 화살표 모양 ECMA-376 ST_ShapeType 'curvedUpArrow'에 해당합니다.`;
          }
        >
      | Constant<
          "DECAGON",
          { title: `십각형 도형 ECMA-376 ST_ShapeType 'decagon'에 해당합니다.` }
        >
      | Constant<
          "DIAGONAL_STRIPE",
          {
            title: `대각선 줄무늬 ECMA-376 ST_ShapeType 'diagStripe'에 해당합니다.`;
          }
        >
      | Constant<
          "DIAMOND",
          {
            title: `다이아몬드 모양 ECMA-376 ST_ShapeType 'diamond'에 해당합니다.`;
          }
        >
      | Constant<
          "DODECAGON",
          {
            title: `십이형 도형 ECMA-376 ST_ShapeType 'dodecagon'에 해당합니다.`;
          }
        >
      | Constant<
          "DONUT",
          { title: `도넛 모양 ECMA-376 ST_ShapeType 'donut'에 해당합니다.` }
        >
      | Constant<
          "DOUBLE_WAVE",
          {
            title: `이중 물결 모양. ECMA-376 ST_ShapeType 'doubleWave'에 해당합니다.`;
          }
        >
      | Constant<
          "DOWN_ARROW",
          {
            title: `아래쪽 화살표 도형 ECMA-376 ST_ShapeType 'down화살표'에 해당합니다.`;
          }
        >
      | Constant<
          "DOWN_ARROW_CALLOUT",
          {
            title: `콜아웃 아래쪽 화살표 도형 ECMA-376 ST_ShapeType 'down화살표콜아웃'에 해당합니다.`;
          }
        >
      | Constant<
          "FOLDED_CORNER",
          {
            title: `모서리가 접힌 도형 ECMA-376 ST_ShapeType 'foldedCorner'에 해당합니다.`;
          }
        >
      | Constant<
          "FRAME",
          { title: `프레임 모양 ECMA-376 ST_ShapeType 'frame'에 해당합니다.` }
        >
      | Constant<
          "HALF_FRAME",
          {
            title: `절반 프레임 ECMA-376 ST_ShapeType 'halfFrame'에 해당합니다.`;
          }
        >
      | Constant<
          "HEART",
          { title: `하트 모양 ECMA-376 ST_ShapeType 'heart'에 해당합니다.` }
        >
      | Constant<
          "HEPTAGON",
          { title: `7각형 ECMA-376 ST_ShapeType 'heptagon'에 해당합니다.` }
        >
      | Constant<
          "HEXAGON",
          { title: `육각형 모양. ECMA-376 ST_ShapeType '육각형'에 해당합니다.` }
        >
      | Constant<
          "HOME_PLATE",
          {
            title: `홈플레이트 모양 ECMA-376 ST_ShapeType 'homePlate'에 해당합니다.`;
          }
        >
      | Constant<
          "HORIZONTAL_SCROLL",
          {
            title: `가로 스크롤 모양 ECMA-376 ST_ShapeType 'horizontalScroll'에 해당합니다.`;
          }
        >
      | Constant<
          "IRREGULAR_SEAL_1",
          {
            title: `밀봉 1 도형 ECMA-376 ST_ShapeType 'irregularSeal1'에 해당합니다.`;
          }
        >
      | Constant<
          "IRREGULAR_SEAL_2",
          {
            title: `불규칙적인 표시 2 도형 ECMA-376 ST_ShapeType 'irregularSeal2'에 해당합니다.`;
          }
        >
      | Constant<
          "LEFT_ARROW",
          {
            title: `왼쪽 화살표 도형 ECMA-376 ST_ShapeType 'leftArrow'에 해당합니다.`;
          }
        >
      | Constant<
          "LEFT_ARROW_CALLOUT",
          {
            title: `콜아웃 왼쪽 화살표 도형 ECMA-376 ST_ShapeType 'left화살표콜아웃'에 해당합니다.`;
          }
        >
      | Constant<
          "LEFT_BRACE",
          {
            title: `왼쪽 중괄호 도형. ECMA-376 ST_ShapeType 'leftBrace'에 해당합니다.`;
          }
        >
      | Constant<
          "LEFT_BRACKET",
          {
            title: `왼쪽 대괄호 모양 ECMA-376 ST_ShapeType 'leftBracket'에 해당합니다.`;
          }
        >
      | Constant<
          "LEFT_RIGHT_ARROW",
          {
            title: `왼쪽 화살표 모양 ECMA-376 ST_ShapeType 'leftRight화살표'에 해당합니다.`;
          }
        >
      | Constant<
          "LEFT_RIGHT_ARROW_CALLOUT",
          {
            title: `콜아웃 왼쪽 오른쪽 화살표 도형 ECMA-376 ST_ShapeType 'leftRight화살표콜아웃'에 해당합니다.`;
          }
        >
      | Constant<
          "LEFT_RIGHT_UP_ARROW",
          {
            title: `왼쪽/오른쪽 화살표 모양 ECMA-376 ST_ShapeType 'leftRightUp화살표'에 해당합니다.`;
          }
        >
      | Constant<
          "LEFT_UP_ARROW",
          {
            title: `왼쪽 화살표 모양 ECMA-376 ST_ShapeType 'leftUpArrow'에 해당합니다.`;
          }
        >
      | Constant<
          "LIGHTNING_BOLT",
          {
            title: `번개 모양 모양 ECMA-376 ST_ShapeType 'lightningBolt'에 해당합니다.`;
          }
        >
      | Constant<
          "MATH_DIVIDE",
          {
            title: `수학 도형을 나눕니다. ECMA-376 ST_ShapeType 'mathDivide'에 해당합니다.`;
          }
        >
      | Constant<
          "MATH_EQUAL",
          { title: `등호 모양 ECMA-376 ST_ShapeType 'mathEqual'에 해당합니다.` }
        >
      | Constant<
          "MATH_MINUS",
          {
            title: `수학 모양 빼기 ECMA-376 ST_ShapeType 'mathMinus'에 해당합니다.`;
          }
        >
      | Constant<
          "MATH_MULTIPLY",
          {
            title: `수학 곱하기 도형 ECMA-376 ST_ShapeType 'mathMultiply'에 해당합니다.`;
          }
        >
      | Constant<
          "MATH_NOT_EQUAL",
          {
            title: `수학 모양이 같지 않습니다. ECMA-376 ST_ShapeType 'mathNotEqual'에 해당합니다.`;
          }
        >
      | Constant<
          "MATH_PLUS",
          { title: `+ ECMA-376 ST_ShapeType 'mathPlus'에 해당합니다.` }
        >
      | Constant<
          "MOON",
          { title: `달 모양 ECMA-376 ST_ShapeType 'moon'에 해당합니다.` }
        >
      | Constant<
          "NO_SMOKING",
          {
            title: `흡연 형태 없음 ECMA-376 ST_ShapeType 'noSmoking'에 해당합니다.`;
          }
        >
      | Constant<
          "NOTCHED_RIGHT_ARROW",
          {
            title: `톱니 모양의 오른쪽 화살표 모양 ECMA-376 ST_ShapeType 'notchedRightArrow'에 해당합니다.`;
          }
        >
      | Constant<
          "OCTAGON",
          {
            title: `팔각형 모양. ECMA-376 ST_ShapeType 'octagon'에 해당합니다.`;
          }
        >
      | Constant<
          "PARALLELOGRAM",
          {
            title: `평행사각형. ECMA-376 ST_ShapeType 'parallelogram'에 해당합니다.`;
          }
        >
      | Constant<
          "PENTAGON",
          { title: `오각형 ECMA-376 ST_ShapeType 'pentagon'에 해당합니다.` }
        >
      | Constant<
          "PIE",
          {
            title: `원형 모양입니다. ECMA-376 ST_ShapeType 'pie'에 해당합니다.`;
          }
        >
      | Constant<
          "PLAQUE",
          { title: `명판 ECMA-376 ST_ShapeType 'plaque'에 해당합니다.` }
        >
      | Constant<
          "PLUS",
          { title: `+ 도형 ECMA-376 ST_ShapeType 'plus'에 해당합니다.` }
        >
      | Constant<
          "QUAD_ARROW",
          {
            title: `4각형 도형 ECMA-376 ST_ShapeType 'quad화살표'에 해당합니다.`;
          }
        >
      | Constant<
          "QUAD_ARROW_CALLOUT",
          {
            title: `콜아웃의 네 방향 화살표 모양 ECMA-376 ST_ShapeType 'quad화살표콜아웃'에 해당합니다.`;
          }
        >
      | Constant<
          "RIBBON",
          { title: `리본 모양 ECMA-376 ST_ShapeType 'ribbon'에 해당합니다.` }
        >
      | Constant<
          "RIBBON_2",
          { title: `리본 2 도형 ECMA-376 ST_ShapeType 'ribbon2'에 해당합니다.` }
        >
      | Constant<
          "RIGHT_ARROW",
          {
            title: `오른쪽 화살표 도형 ECMA-376 ST_ShapeType 'rightArrow'에 해당합니다.`;
          }
        >
      | Constant<
          "RIGHT_ARROW_CALLOUT",
          {
            title: `콜아웃 오른쪽 화살표 도형 ECMA-376 ST_ShapeType 'right화살표콜아웃'에 해당합니다.`;
          }
        >
      | Constant<
          "RIGHT_BRACE",
          {
            title: `오른쪽 중괄호 모양. ECMA-376 ST_ShapeType 'rightBrace'에 해당합니다.`;
          }
        >
      | Constant<
          "RIGHT_BRACKET",
          {
            title: `오른쪽 대괄호 모양 ECMA-376 ST_ShapeType 'rightBracket'에 해당합니다.`;
          }
        >
      | Constant<
          "ROUND_1_RECTANGLE",
          {
            title: `모서리가 둥근 직사각형 ECMA-376 ST_ShapeType 'round1Rect'에 해당합니다.`;
          }
        >
      | Constant<
          "ROUND_2_DIAGONAL_RECTANGLE",
          {
            title: `대각선으로 모서리가 둥근 두 개의 직사각형 모양 ECMA-376 ST_ShapeType 'round2DiagRect'에 해당합니다.`;
          }
        >
      | Constant<
          "ROUND_2_SAME_RECTANGLE",
          {
            title: `같은 측면의 두 모서리가 둥근 직사각형 모양입니다. ECMA-376 ST_ShapeType 'round2SameRect'에 해당합니다.`;
          }
        >
      | Constant<
          "RIGHT_TRIANGLE",
          {
            title: `직각 삼각형 ECMA-376 ST_ShapeType 'rtTriangle'에 해당합니다.`;
          }
        >
      | Constant<
          "SMILEY_FACE",
          {
            title: `웃는 얼굴 모양 ECMA-376 ST_ShapeType 'smileyFace'에 해당합니다.`;
          }
        >
      | Constant<
          "SNIP_1_RECTANGLE",
          {
            title: `한쪽 모서리가 잘린 직사각형 도형 ECMA-376 ST_ShapeType 'snip1Rect'에 해당합니다.`;
          }
        >
      | Constant<
          "SNIP_2_DIAGONAL_RECTANGLE",
          {
            title: `대각선 절단 모서리가 직사각형 모양입니다. ECMA-376 ST_ShapeType 'snip2DiagRect'에 해당합니다.`;
          }
        >
      | Constant<
          "SNIP_2_SAME_RECTANGLE",
          {
            title: `같은 측면의 한쪽 모서리가 잘린 직사각형 도형 ECMA-376 ST_ShapeType 'snip2SameRect'에 해당합니다.`;
          }
        >
      | Constant<
          "SNIP_ROUND_RECTANGLE",
          {
            title: `한쪽 모서리가 잘리고 한쪽 모서리가 둥근 직사각형입니다. ECMA-376 ST_ShapeType 'snipRoundRect'에 해당합니다.`;
          }
        >
      | Constant<
          "STAR_10",
          {
            title: `10각형 별 모양 ECMA-376 ST_ShapeType 'star10'에 해당합니다.`;
          }
        >
      | Constant<
          "STAR_12",
          {
            title: `12각형 별 모양 ECMA-376 ST_ShapeType 'star12'에 해당합니다.`;
          }
        >
      | Constant<
          "STAR_16",
          {
            title: `16각형 별 모양 ECMA-376 ST_ShapeType 'star16'에 해당합니다.`;
          }
        >
      | Constant<
          "STAR_24",
          {
            title: `24각형 별 모양입니다. ECMA-376 ST_ShapeType 'star24'에 해당합니다.`;
          }
        >
      | Constant<
          "STAR_32",
          {
            title: `32개의 별 모양입니다. ECMA-376 ST_ShapeType 'star32'에 해당합니다.`;
          }
        >
      | Constant<
          "STAR_4",
          {
            title: `4각형 별 모양. ECMA-376 ST_ShapeType 'star4'에 해당합니다.`;
          }
        >
      | Constant<
          "STAR_5",
          {
            title: `5각형 별 모양. ECMA-376 ST_ShapeType 'star5'에 해당합니다.`;
          }
        >
      | Constant<
          "STAR_6",
          { title: `6각형 별 모양 ECMA-376 ST_ShapeType 'star6'에 해당합니다.` }
        >
      | Constant<
          "STAR_7",
          { title: `7각형 도형 ECMA-376 ST_ShapeType 'star7'에 해당합니다.` }
        >
      | Constant<
          "STAR_8",
          {
            title: `8각형 별 모양. ECMA-376 ST_ShapeType 'star8'에 해당합니다.`;
          }
        >
      | Constant<
          "STRIPED_RIGHT_ARROW",
          {
            title: `줄무늬가 있는 오른쪽 화살표 도형 ECMA-376 ST_ShapeType 'stripedRight화살표'에 해당합니다.`;
          }
        >
      | Constant<
          "SUN",
          { title: `태양 모양 ECMA-376 ST_ShapeType 'sun'에 해당합니다.` }
        >
      | Constant<
          "TRAPEZOID",
          {
            title: `사다리꼴 모양 ECMA-376 ST_ShapeType 'trapezoid'에 해당합니다.`;
          }
        >
      | Constant<
          "TRIANGLE",
          {
            title: `삼각형 모양 ECMA-376 ST_ShapeType 'triangle'에 해당합니다.`;
          }
        >
      | Constant<
          "UP_ARROW",
          {
            title: `위쪽 화살표 모양 ECMA-376 ST_ShapeType 'up화살표'에 해당합니다.`;
          }
        >
      | Constant<
          "UP_ARROW_CALLOUT",
          {
            title: `설명선 위쪽 화살표 모양 ECMA-376 ST_ShapeType 'up화살표콜아웃'에 해당합니다.`;
          }
        >
      | Constant<
          "UP_DOWN_ARROW",
          {
            title: `위쪽 화살표 모양 ECMA-376 ST_ShapeType 'upDown화살표'에 해당합니다.`;
          }
        >
      | Constant<
          "UTURN_ARROW",
          {
            title: `U자형 화살표 도형 ECMA-376 ST_ShapeType 'uturn화살표'에 해당합니다.`;
          }
        >
      | Constant<
          "VERTICAL_SCROLL",
          {
            title: `세로 스크롤 도형 ECMA-376 ST_ShapeType 'verticalScroll'에 해당합니다.`;
          }
        >
      | Constant<
          "WAVE",
          { title: `물결 모양. ECMA-376 ST_ShapeType 'wave'에 해당합니다.` }
        >
      | Constant<
          "WEDGE_ELLIPSE_CALLOUT",
          {
            title: `콜아웃 웨지 타원형 도형 ECMA-376 ST_ShapeType 'wedgeEllipse콜아웃'에 해당합니다.`;
          }
        >
      | Constant<
          "WEDGE_RECTANGLE_CALLOUT",
          {
            title: `콜아웃 웨지 직사각형 도형 ECMA-376 ST_ShapeType 'wedgeRect콜아웃'에 해당합니다.`;
          }
        >
      | Constant<
          "WEDGE_ROUND_RECTANGLE_CALLOUT",
          {
            title: `콜아웃 웨지 둥근 직사각형 도형 ECMA-376 ST_ShapeType 'wedgeRoundRect콜아웃'에 해당합니다.`;
          }
        >
      | Constant<
          "FLOW_CHART_ALTERNATE_PROCESS",
          {
            title: `대체 프로세스 흐름 형태 ECMA-376 ST_ShapeType 'flowChartAlternateProcess'에 해당합니다.`;
          }
        >
      | Constant<
          "FLOW_CHART_COLLATE",
          {
            title: `흐름 형태 대조 ECMA-376 ST_ShapeType 'flowChartCollate'에 해당합니다.`;
          }
        >
      | Constant<
          "FLOW_CHART_CONNECTOR",
          {
            title: `커넥터 흐름 모양 ECMA-376 ST_ShapeType 'flowChartConnector'에 해당합니다.`;
          }
        >
      | Constant<
          "FLOW_CHART_DECISION",
          {
            title: `결정 흐름 형태 ECMA-376 ST_ShapeType 'flowChartDecision'에 해당합니다.`;
          }
        >
      | Constant<
          "FLOW_CHART_DELAY",
          {
            title: `지연 흐름 모양 ECMA-376 ST_ShapeType 'flowChartDelay'에 해당합니다.`;
          }
        >
      | Constant<
          "FLOW_CHART_DISPLAY",
          {
            title: `흐름 모양을 표시합니다. ECMA-376 ST_ShapeType 'flowChartDisplay'에 해당합니다.`;
          }
        >
      | Constant<
          "FLOW_CHART_DOCUMENT",
          {
            title: `문서 흐름 도형 ECMA-376 ST_ShapeType 'flowChartDocument'에 해당합니다.`;
          }
        >
      | Constant<
          "FLOW_CHART_EXTRACT",
          {
            title: `흐름 형태를 추출합니다. ECMA-376 ST_ShapeType 'flowChartExtract'에 해당합니다.`;
          }
        >
      | Constant<
          "FLOW_CHART_INPUT_OUTPUT",
          {
            title: `입력 출력 흐름 모양. ECMA-376 ST_ShapeType 'flowChartInputOutput'에 해당합니다.`;
          }
        >
      | Constant<
          "FLOW_CHART_INTERNAL_STORAGE",
          {
            title: `내부 저장소 흐름 형태 ECMA-376 ST_ShapeType 'flowChartInternalStorage'에 해당합니다.`;
          }
        >
      | Constant<
          "FLOW_CHART_MAGNETIC_DISK",
          {
            title: `자기 디스크 흐름 형태 ECMA-376 ST_ShapeType 'flowChartMagneticDisk'에 해당합니다.`;
          }
        >
      | Constant<
          "FLOW_CHART_MAGNETIC_DRUM",
          {
            title: `자기 드럼 흐름 모양. ECMA-376 ST_ShapeType 'flowChartMagneticDrum'에 해당합니다.`;
          }
        >
      | Constant<
          "FLOW_CHART_MAGNETIC_TAPE",
          {
            title: `자기 테이프 흐름 모양 ECMA-376 ST_ShapeType 'flowChartMagneticTape'에 해당합니다.`;
          }
        >
      | Constant<
          "FLOW_CHART_MANUAL_INPUT",
          {
            title: `수동 입력 흐름 형태 ECMA-376 ST_ShapeType 'flowChartManualInput'에 해당합니다.`;
          }
        >
      | Constant<
          "FLOW_CHART_MANUAL_OPERATION",
          {
            title: `수동 작업 흐름 형태 ECMA-376 ST_ShapeType 'flowChartManualOperation'에 해당합니다.`;
          }
        >
      | Constant<
          "FLOW_CHART_MERGE",
          {
            title: `병합 흐름 도형 ECMA-376 ST_ShapeType 'flowChartMerge'에 해당합니다.`;
          }
        >
      | Constant<
          "FLOW_CHART_MULTIDOCUMENT",
          {
            title: `다중 문서 흐름 도형 ECMA-376 ST_ShapeType 'flowChartMultidocument'에 해당합니다.`;
          }
        >
      | Constant<
          "FLOW_CHART_OFFLINE_STORAGE",
          {
            title: `오프라인 스토리지 흐름 형태 ECMA-376 ST_ShapeType 'flowChartOfflineStorage'에 해당합니다.`;
          }
        >
      | Constant<
          "FLOW_CHART_OFFPAGE_CONNECTOR",
          {
            title: `페이지 외부 커넥터 흐름 모양 ECMA-376 ST_ShapeType 'flowChartOffpageConnector'에 해당합니다.`;
          }
        >
      | Constant<
          "FLOW_CHART_ONLINE_STORAGE",
          {
            title: `온라인 스토리지 흐름 형태 ECMA-376 ST_ShapeType 'flowChartOnlineStorage'에 해당합니다.`;
          }
        >
      | Constant<
          "FLOW_CHART_OR",
          {
            title: `유동적인 형태입니다. ECMA-376 ST_ShapeType 'flowChartOr'에 해당합니다.`;
          }
        >
      | Constant<
          "FLOW_CHART_PREDEFINED_PROCESS",
          {
            title: `사전 정의된 프로세스 흐름 모양 ECMA-376 ST_ShapeType 'flowChartPreProcess'에 해당합니다.`;
          }
        >
      | Constant<
          "FLOW_CHART_PREPARATION",
          {
            title: `준비 흐름 모양 ECMA-376 ST_ShapeType 'flowChartPreparation'에 해당합니다.`;
          }
        >
      | Constant<
          "FLOW_CHART_PROCESS",
          {
            title: `프로세스 흐름 형태 ECMA-376 ST_ShapeType 'flowChartProcess'에 해당합니다.`;
          }
        >
      | Constant<
          "FLOW_CHART_PUNCHED_CARD",
          {
            title: `천공 카드 흐름 도형 ECMA-376 ST_ShapeType 'flowChartPunchedCard'에 해당합니다.`;
          }
        >
      | Constant<
          "FLOW_CHART_PUNCHED_TAPE",
          {
            title: `천공 테이프 흐름 모양 ECMA-376 ST_ShapeType 'flowChartPunchedTape'에 해당합니다.`;
          }
        >
      | Constant<
          "FLOW_CHART_SORT",
          {
            title: `흐름 모양 정렬 ECMA-376 ST_ShapeType 'flowChartSort'에 해당합니다.`;
          }
        >
      | Constant<
          "FLOW_CHART_SUMMING_JUNCTION",
          {
            title: `교차로 흐름의 형태 ECMA-376 ST_ShapeType 'flowChartSummingJunction'에 해당합니다.`;
          }
        >
      | Constant<
          "FLOW_CHART_TERMINATOR",
          {
            title: `종결자 흐름 형태입니다. ECMA-376 ST_ShapeType 'flowChartTerminator'에 해당합니다.`;
          }
        >
      | Constant<"ARROW_EAST", { title: `동쪽 화살표 모양` }>
      | Constant<"ARROW_NORTH_EAST", { title: `북동쪽 화살표 모양` }>
      | Constant<"ARROW_NORTH", { title: `북쪽 화살표 모양` }>
      | Constant<"SPEECH", { title: `음성 도형` }>
      | Constant<"STARBURST", { title: `별 버스트 도형` }>
      | Constant<
          "TEARDROP",
          {
            title: `눈물방울 모양 ECMA-376 ST_ShapeType 'teardrop'에 해당합니다.`;
          }
        >
      | Constant<
          "ELLIPSE_RIBBON",
          {
            title: `타원형 리본 모양 ECMA-376 ST_ShapeType 'ellipseRibbon'에 해당합니다.`;
          }
        >
      | Constant<
          "ELLIPSE_RIBBON_2",
          {
            title: `타원형 리본 2 도형 ECMA-376 ST_ShapeType 'ellipseRibbon2'에 해당합니다.`;
          }
        >
      | Constant<
          "CLOUD_CALLOUT",
          {
            title: `콜아웃 구름 모양 ECMA-376 ST_ShapeType 'cloud콜아웃'에 해당합니다.`;
          }
        >
      | Constant<"CUSTOM", { title: `맞춤 도형` }>;
  }

  export interface Image {}

  export interface Video {}

  export interface Line {}

  export interface Table {}

  export interface WordArt {}

  /**
   * @title 페이지 요소의 변환.
   */
  export interface Transform {
    /**
     * @title X 좌표 배율 요소.
     */
    scaleX: number;

    /**
     * @title Y 좌표 배율 요소.
     */
    scaleY: number;

    /**
     * @title X 좌표 기울기 요소.
     */
    shearX: number;

    /**
     * @title Y 좌표 기울기 요소.
     */
    shearY: number;

    /**
     * @title X 좌표 변환 요소.
     */
    translateX: number;

    /**
     * @title Y 좌표 변환 요소.
     */
    translateY: number;

    /**
     * @title 변환 요소의 단위.
     */
    unit: Unit;
  }
}
