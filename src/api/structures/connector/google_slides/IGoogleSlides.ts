import { tags } from "typia";

import { NTpule } from "@wrtn/connector-api/lib/utils/NTuple";

import { MyPartial } from "../../../../utils/types/MyPartial";
import { ICommon } from "../common/ISecretValue";

type OneOf<T extends object, K extends keyof T = keyof T> = K extends any
  ? Record<K, T[K]>
  : never;

export namespace IGoogleSlides {
  export type ISimplePresentationIdOutput = Pick<
    Presentation,
    "presentationId" | "pageSize" | "title"
  >;

  /**
   * @title 슬라이드를 pptx로 내보내는 조건
   */
  export type IExportPresentationInput = ICommon.ISecret<
    "google",
    ["https://www.googleapis.com/auth/drive"]
  >;

  export interface IExportHanshowOutput {
    /**
     * @title 파일 다운로드 링크
     */
    hanshow: string & tags.Format<"uri">;
  }

  export interface IExportPresentationOutput {
    /**
     * @title 파일 다운로드 링크
     */
    powerPoint: string & tags.Format<"uri">;
  }

  /**
   * @title 슬라이드를 붙이기 위한 요청 DTO.
   */
  export interface AppendSlideInput
    extends ICommon.ISecret<
      "google",
      ["https://www.googleapis.com/auth/presentations"]
    > {
    /**
     * @title 한 번에 생성하고자 하는 템플릿의 목록.
     */
    templates: IGoogleSlides.Template[];
  }

  /**
   * @title 유저의 유즈케이스에 맞게 입력 폼을 제한하기 위한 목적의 템플릿.
   *
   * 이미지의 위치를 기준으로 타입의 이름을 결정했다.
   */
  export type Template =
    | Template.Vertical
    | Template.Square
    | Template.Landscape
    | Template.Entire
    | Template.QuarterDivision;
  // | Template.SixthDivision
  // | Template.Exhibition
  // | Template.Corner
  // | Template.CornerHalf;

  export namespace Template {
    /**
     * @title 세로형
     */
    export type Vertical = {
      /**
       * @title 템플릿의 타입.
       */
      type: "Vertical";

      /**
       * @title 슬라이드의 내용물
       */
      contents: {
        /**
         * @title 이미지의 URL.
         */
        url: string & tags.Format<"uri">;

        /**
         * @title 이미지에 대응되는 텍스트.
         */
        text: InsertText;
      };
    };

    /**
     * @title 정방형
     */
    export type Square = {
      /**
       * @title 템플릿의 타입.
       */
      type: "Square";

      /**
       * @title 슬라이드의 내용물
       */
      contents: {
        /**
         * @title 이미지의 URL.
         */
        url: string & tags.Format<"uri">;

        /**
         * @title 이미지에 대응되는 텍스트.
         */
        text: InsertText;
      };
    };

    /**
     * @title 가로형
     */
    export type Landscape = {
      /**
       * @title 템플릿의 타입.
       */
      type: "Landscape";

      /**
       * @title 슬라이드의 내용물
       */
      contents: {
        /**
         * @title 이미지의 URL.
         */
        url: string & tags.Format<"uri">;

        /**
         * @title 이미지에 대응되는 텍스트.
         */
        text: InsertText;
      };
    };

    /**
     * @title 전체보기 가로형(16:9)
     */
    export type Entire = {
      /**
       * @title 템플릿의 타입.
       */
      type: "Entire";

      /**
       * @title 슬라이드의 내용물
       */
      contents: {
        /**
         * @title 이미지의 URL.
         */
        url: string & tags.Format<"uri">;

        /**
         * @title 이미지에 대응되는 텍스트.
         */
        text: InsertText;
      };
    };

    /**
     * @title 4분할 정방형 (컷 만화형)
     */
    export type QuarterDivision = {
      /**
       * @title 템플릿의 타입.
       */
      type: "QuarterDivision";

      /**
       * @title 슬라이드의 내용물
       */
      contents: NTpule<
        4,
        {
          /**
           * @title 이미지의 URL.
           */
          url: string & tags.Format<"uri">;

          /**
           * @title 이미지에 대응되는 텍스트.
           */
          text: InsertText;
        }
      >;
    };

    /**
     * @title 6분할 정방형 (컷 만화형)
     */
    export type SixthDivision = {
      /**
       * @title 템플릿의 타입.
       */
      type: "SixthDivision";

      /**
       * @title 슬라이드의 내용물
       */
      contents: NTpule<
        6,
        {
          /**
           * @title 이미지의 URL.
           */
          url: string & tags.Format<"uri">;

          /**
           * @title 이미지에 대응되는 텍스트.
           */
          text: InsertText;
        }
      >;
    };

    /**
     * @title 세로형 1분할(6:8)
     */
    export type Exhibition = {
      /**
       * @title 템플릿의 타입.
       */
      type: "Exhibition";

      /**
       * @title 슬라이드의 내용물
       */
      contents: {
        /**
         * @title 이미지의 URL.
         */
        url: string & tags.Format<"uri">;

        /**
         * @title 이미지에 대응되는 텍스트 중 제목 부분.
         */
        header: InsertText;

        /**
         * @title 이미지에 대응되는 텍스트 중 본문 부분.
         */
        body: InsertText;
      };
    };

    /**
     * @title 가로형 1분할
     * 
     * 타이틀(너비 100% : 높이 20%)
     * 본문 (너비 60% : 높이 80%)
     * 이미지 (너비 40% : 높이 80%)

     */
    export type Corner = {
      /**
       * @title 템플릿의 타입.
       */
      type: "Corner";

      /**
       * @title 슬라이드의 내용물
       */
      contents: {
        /**
         * @title 이미지의 URL.
         */
        url: string & tags.Format<"uri">;

        /**
         * @title 이미지에 대응되는 텍스트 중 제목 부분.
         */
        header: InsertText;

        /**
         * @title 이미지에 대응되는 텍스트 중 본문 부분.
         */
        body: InsertText;
      };
    };

    /**
     * @title 가로형 2분할
     * 
     * 타이틀(너비 100% : 높이 20%)
     * 본문 (너비 70% : 높이 80%)
     * 이미지 (너비 30% : 높이 40%)

     */
    export type CornerHalf = {
      /**
       * @title 템플릿의 타입.
       */
      type: "CornerHalf";

      /**
       * @title 슬라이드의 내용물
       */
      contents: {
        /**
         * @title 이미지의 URL.
         */
        url: NTpule<2, string & tags.Format<"uri">>;

        /**
         * @title 이미지에 대응되는 텍스트 중 제목 부분.
         */
        header: InsertText;

        /**
         * @title 이미지에 대응되는 텍스트 중 본문 부분.
         */
        body: InsertText;
      };
    };
  }

  /**
   * @title 수정할 프레젠테이션의 조건 DTO.
   */
  export interface IUpdatePresentationInput
    extends ICommon.ISecret<
      "google",
      ["https://www.googleapis.com/auth/presentations"]
    > {
    /**
     * @title 수정할 프레젠테이션의 ID.
     */
    requests: BatchUpdateInput[];
  }

  export type BatchUpdateInput =
    | {
        /**
         * @title 새로 생성할 슬라이드의 정보.
         */
        createSlide: CreateSlideRequest;
      }
    | {
        createImage: CreateImageRequest;
      }
    | {
        insertText: InsertText;
      }
    | {
        createShape: CreateShape;
      }
    | {
        replaceAllText: ReplaceAllText;
      }
    | {
        updateTextStyle: UpdateTextStyle;
      }
    | {
        updateShapeProperties: UpdateShapeProperties;
      };

  export interface UpdateShapeProperties {
    /**
     * The fields that should be updated. At least one field must be specified. The root `shapeProperties` is implied and should not be specified. A single `"*"` can be used as short-hand for listing every field. For example to update the shape background solid fill color, set `fields` to `"shapeBackgroundFill.solidFill.color"`. To reset a property to its default value, include its field name in the field mask but leave the field itself unset.
     */
    fields: string;
    /**
     * The object ID of the shape the updates are applied to.
     */
    objectId: string;
    /**
     * The shape properties to update.
     */
    shapeProperties: ShapeProperties;
  }

  export interface UpdateTextStyle {
    /**
     * The fields that should be updated. At least one field must be specified. The root `style` is implied and should not be specified. A single `"*"` can be used as short-hand for listing every field. For example, to update the text style to bold, set `fields` to `"bold"`. To reset a property to its default value, include its field name in the field mask but leave the field itself unset.
     */
    fields?: (string | null) & tags.Default<"*">;

    /**
     * The object ID of the shape or table with the text to be styled.
     */
    objectId: string;

    /**
     * The style(s) to set on the text. If the value for a particular style matches that of the parent, that style will be set to inherit. Certain text style changes may cause other changes meant to mirror the behavior of the Slides editor. See the documentation of TextStyle for more information.
     */
    style: TextStyle;
  }

  export interface ReplaceAllText {
    /**
     * If non-empty, limits the matches to page elements only on the given pages. Returns a 400 bad request error if given the page object ID of a notes master, or if a page with that object ID doesn't exist in the presentation.
     */
    pageObjectIds?: string[] | null;
    /**
     * The text that will replace the matched text.
     */
    replaceText?: string | null;
  }

  export interface CreateShape {
    /**
     * The element properties for the shape.
     */
    elementProperties?: PageElementProperties;

    /**
     * A user-supplied object ID. If you specify an ID, it must be unique among all pages and page elements in the presentation. The ID must start with an alphanumeric character or an underscore (matches regex `[a-zA-Z0-9_]`); remaining characters may include those as well as a hyphen or colon (matches regex `[a-zA-Z0-9_-:]`). The length of the ID must not be less than 5 or greater than 50. If empty, a unique identifier will be generated.
     */
    objectId?: string | null;

    /**
     * The shape type.
     */
    shapeType?: Shape.Type;
  }

  export interface InsertText {
    /**
     * @title 추가할 텍스트
     */
    text?: string | null;

    /**
     * @title 아이디
     */
    objectId?: string | null;
  }

  export interface CreateImageRequest {
    /**
     * The element properties for the image. When the aspect ratio of the provided size does not match the image aspect ratio, the image is scaled and centered with respect to the size in order to maintain the aspect ratio. The provided transform is applied after this operation. The PageElementProperties.size property is optional. If you don't specify the size, the default size of the image is used. The PageElementProperties.transform property is optional. If you don't specify a transform, the image will be placed at the top-left corner of the page.
     */
    elementProperties?: PageElementProperties;

    /**
     * A user-supplied object ID. If you specify an ID, it must be unique among all pages and page elements in the presentation. The ID must start with an alphanumeric character or an underscore (matches regex `[a-zA-Z0-9_]`); remaining characters may include those as well as a hyphen or colon (matches regex `[a-zA-Z0-9_-:]`). The length of the ID must not be less than 5 or greater than 50. If you don't specify an ID, a unique one is generated.
     */
    objectId?: string | null;

    /**
     * The image URL. The image is fetched once at insertion time and a copy is stored for display inside the presentation. Images must be less than 50 MB in size, can't exceed 25 megapixels, and must be in one of PNG, JPEG, or GIF formats. The provided URL must be publicly accessible and up to 2 KB in length. The URL is saved with the image, and exposed through the Image.source_url field.
     */
    url?: (string & tags.Format<"uri">) | null;
  }

  /**
   * Common properties for a page element. Note: When you initially create a PageElement, the API may modify the values of both `size` and `transform`, but the visual size will be unchanged.
   */
  export interface PageElementProperties {
    /**
     * The object ID of the page where the element is located.
     */
    pageObjectId?: string | null;

    /**
     * The size of the element.
     */
    size?: Size;

    /**
     * The transform for the element.
     */
    transform?: Transform;
  }

  export interface CreateSlideRequest {
    /**
     * The optional zero-based index indicating where to insert the slides. If you don't specify an index, the slide is created at the end.
     */
    insertionIndex?: number | null;

    /**
     * A user-supplied object ID. If you specify an ID, it must be unique among all pages and page elements in the presentation. The ID must start with an alphanumeric character or an underscore (matches regex `[a-zA-Z0-9_]`)
     *  remaining characters may include those as well as a hyphen or colon (matches regex `[a-zA-Z0-9_-:]`). The ID length must be between 5 and 50 characters, inclusive. If you don't specify an ID, a unique one is generated.
     */
    objectId?: string | null;

    /**
     * An optional list of object ID mappings from the placeholder(s) on the layout to the placeholders that are created on the slide from the specified layout. Can only be used when `slide_layout_reference` is specified.
     */
    placeholderIdMappings?: LayoutPlaceholderIdMapping[];

    /**
     * Layout reference of the slide to be inserted, based on the *current master*, which is one of the following: - The master of the previous slide index. - The master of the first slide, if the insertion_index is zero. - The first master in the presentation, if there are no slides. If the LayoutReference is not found in the current master, a 400 bad request error is returned. If you don't specify a layout reference, the slide uses the predefined `BLANK` layout.
     */
    slideLayoutReference?: LayoutReference;
  }

  export interface LayoutReference {
    /**
     * Layout ID: the object ID of one of the layouts in the presentation.
     */
    layoutId?: string | null;

    /**
     * Predefined layout.
     */
    predefinedLayout?: string | null;
  }

  /**
   * The user-specified ID mapping for a placeholder that will be created on a slide from a specified layout.
   */
  export interface LayoutPlaceholderIdMapping {
    /**
     * The placeholder on a layout that will be applied to a slide. Only type and index are needed. For example, a predefined `TITLE_AND_BODY` layout may usually have a TITLE placeholder with index 0 and a BODY placeholder with index 0.
     */
    layoutPlaceholder?: Placeholder;
    /**
     * The object ID of the placeholder on a layout that will be applied to a slide.
     */
    layoutPlaceholderObjectId?: string | null;
    /**
     * A user-supplied object ID for the placeholder identified above that to be created onto a slide. If you specify an ID, it must be unique among all pages and page elements in the presentation. The ID must start with an alphanumeric character or an underscore (matches regex `[a-zA-Z0-9_]`); remaining characters may include those as well as a hyphen or colon (matches regex `[a-zA-Z0-9_-:]`). The length of the ID must not be less than 5 or greater than 50. If you don't specify an ID, a unique one is generated.
     */
    objectId?: string | null;
  }

  /**
   * @title 프레젠테이션 검색을 위한 조건 DTO.
   */
  export interface IGetPresentationInput
    extends ICommon.ISecret<
      "google",
      ["https://www.googleapis.com/auth/presentations"]
    > {
    /**
     * @title 검색의 대상이 되는 프레젠테이션 ID.
     */
    presentationId: string;
  }

  /**
   * @title Google Slides의 프레젠테이션을 생성하기 위한 요청 DTO.
   */
  export type ICreatePresentationInput = ICommon.ISecret<
    "google",
    ["https://www.googleapis.com/auth/presentations"]
  > &
    Pick<Presentation, "title">;

  /**
   * @title Google Slides의 Presentation resource.
   */
  export interface Presentation {
    /**
     * @title 프레젠네이션의 ID.
     */
    presentationId?: string | null;

    /**
     * @title 프레젠테이션의 페이지 크기.
     */
    pageSize?: Size;

    /**
     * @@title 프레젠테이션의 슬라이드.
     *
     * 슬라이드는 슬라이드 레이아웃에서 속성을 상속합니다.
     */
    slides?: Page[];

    /**
     * @title 프레젠테이션의 제목.
     */
    title?: string | null;

    /**
     * @title 프레젠테이션의 슬라이드 마스터.
     *
     * 슬라이드 마스터에는 레이아웃 집합에 대한 모든 일반 페이지 요소와 공통 속성이 포함되어 있습니다. 다음과 같은 세 가지 용도로 사용됩니다.
     *
     * - 마스터의 자리표시자 도형은 해당 마스터를 사용하는 페이지에 있는 모든 자리표시자 도형의 기본 텍스트 스타일 및 도형 속성을 포함합니다.
     * - 마스터 페이지 속성은 레이아웃에 상속되는 일반적인 페이지 속성을 정의합니다
     * - 마스터 슬라이드의 다른 모든 도형은 레이아웃에 관계없이 해당 마스터를 사용하는 모든 슬라이드에 표시됩니다.
     */
    masters?: Page[];

    /**
     * @title 콘텐츠를 정렬하고 스타일을 지정하는 템플릿.
     *
     * 프레젠테이션의 레이아웃 레이아웃은 해당 레이아웃에서 상속된 슬라이드에서 콘텐츠를 정렬하고 스타일을 지정하는 방식을 결정하는 템플릿입니다.
     */
    layouts?: Page[];

    /**
     * @title 프레젠테이션의 언어
     *
     * IETF BCP 47 언어 태크 형식.
     */
    locale?:
      | tags.Constant<"eu", { title: "미국 영어" }>
      | tags.Constant<"ko", { title: "한국어" }>
      | null;

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
    revisionId?: string | null;

    /**
     * @title 프레젠테이션의 메모 마스터.
     */
    notesMaster?: Page;
  }

  export interface Size {
    /**
     * @title 객체의 너비.
     */
    width?: Dimension;

    /**
     * @title 객체의 높이.
     */
    height?: Dimension;
  }

  export interface Dimension {
    /**
     * @title 규모.
     */
    magnitude?: number | null;

    /**
     * @title 크기 단위.
     */
    unit?: Unit | null;
  }

  /**
   * @title 측정 단위.
   */
  export type Unit =
    | tags.Constant<"UNIT_UNSPECIFIED", { title: "알 수 없는 단위" }>
    | tags.Constant<
        "EMU",
        {
          title: "영국식 단위 (EMU)";
          description: "는 1센티미터의 1/360,000으로 정의되므로 인치당 914,400 EMU 및 포인트당 12,700 EMU가 있습니다.";
        }
      >
    | tags.Constant<"PT", { title: "포인트"; description: "1/72인치입니다." }>;

  export type Page =
    | SlidePage
    | LayoutPage
    | NotesPage
    | MasterPage
    | NoteMasterPage;

  export interface SlidePage extends PageBase {
    pageType?: "SLIDE";

    /**
     * @title 특정 속성을 슬라이드한다.
     */
    slideProperties: SlideProperties;
  }

  export interface LayoutPage extends PageBase {
    pageType?: "LAYOUT";

    /**
     * @title 레이아웃 속성.
     */
    layoutProperties: LayoutProperties;
  }

  export interface NotesPage extends PageBase {
    pageType?: "NOTES";

    /**
     * @title 메모 속성.
     */
    notesProperties: NotesProperties;
  }

  export interface MasterPage extends PageBase {
    pageType?: "MASTER";
    /**
     * @title 특정 속성을 마스터한다.
     */
    masterProperties: MasterProperties;
  }
  export interface NoteMasterPage extends PageBase {
    pageType: "NOTES_MASTER";
  }

  export type PageBase = {
    /**
     * @title 이 페이지의 객체 ID.
     *
     * `Page`와 `PageElement`에서 사용하는 객체 ID는 동일한 네임스페이스를 공유한다.
     */
    objectId?: string | null;

    /**
     * @title 페이지 유형.
     */
    pageType?: PageType | null;

    /**
     * @title 페이지에서 렌더링된 페이지 요소.
     */
    pageElements?: PageElement[];

    /**
     * @title 페이지의 속성.
     */
    pageProperties?: PageProperties;
  };

  export interface MasterProperties {
    /**
     * @title 사람이 읽을 수 있는 마스터 이름입니다.
     */
    displayName?: string | null;
  }

  /**
   * @title pageType NOTES가 있는 페이지에만 관련된 Page의 속성입니다.
   */
  export interface NotesProperties {
    /**
     * @title 해당 슬라이드에 대한 발표자 노트를 포함하는 이 메모 페이지에 있는 도형의 개체 ID입니다.
     */
    speakerNotesObjectId?: string | null;
  }

  export interface LayoutProperties {
    /**
     * @title 이 레이아웃의 기반이 되는 마스터의 객체 ID입니다.
     */
    masterObjectId?: string | null;

    /**
     * @title 레이아웃의 이름입니다.
     */
    name?: string | null;

    /**
     * @title 사람이 읽을 수 있는 레이아웃의 이름.
     */
    displayName?: string | null;
  }

  export interface SlideProperties {
    /**
     * @title 이 슬라이드의 기반이 되는 레이아웃의 객체 ID입니다.
     */
    readonly layoutObjectId?: string | null;

    /**
     * 이 슬라이드의 기반이 되는 마스터 객체 ID입니다.
     */
    readonly masterObjectId?: string | null;

    /**
     * @title 이 슬라이드와 연결된 메모 페이지입니다.
     *
     * 발표자 노트가 포함된 슬라이드를 인쇄하거나 내보낼 때 노트 페이지의 시각적 모양을 정의합니다.
     *
     * 메모 페이지는 notes master에서 속성을 상속받습니다.
     *
     * 노트 페이지에 있는 BODY 유형의 자리표시자 도형에는 이 슬라이드의 발표자 노트가 포함되어 있습니다.
     *
     * 이 도형의 ID는 speakerNotesObjectId 필드로 식별됩니다.
     *
     * @todo 재귀 문제로 인해 일단 제거
     */
    // readonly notesPage?: Page;

    /**
     * @title 프레젠테이션 모드에서 슬라이드를 건너뛸지 여부.
     */
    isSkipped?: (boolean & tags.Default<false>) | null;
  }

  export interface PageProperties {
    /**
     * 페이지의 배경 채우기입니다.
     *
     * 설정하지 않으면 배경 채우기가 상위 페이지(있는 경우)에서 상속됩니다.
     *
     * 페이지에 상위 요소가 없으면 배경 채우기는 Slides 편집기의 상응하는 채우기로 기본 설정됩니다.
     */
    pageBackgroundFill?: PageBackgroundFill;

    /**
     * @title 페이지의 색 구성표.
     */
    colorScheme?: ColorScheme;
  }

  /**
   * @title 페이지의 사전 정의된 색상 팔레트입니다.
   */
  export interface ColorScheme {
    /**
     * @title ThemeColorType 및 해당하는 구체적인 색상 쌍.
     */
    colors?: ThemeColorPair[];
  }

  export interface ThemeColorPair {
    /**
     * @title 테마 색상 유형입니다.
     */
    type?: ThemeColorType | null;

    /**
     * @title 위의 테마 색상 유형에 해당하는 구체적인 색상입니다.
     */
    color?: RgbColor;
  }

  /**
   * @title 테마 색상 유형
   *
   * PageProperties에는 이러한 테마 색상 유형을 구체적인 색상으로 매핑하는 ColorScheme를 포함합니다.
   */
  export type ThemeColorType =
    | tags.Constant<
        "THEME_COLOR_TYPE_UNSPECIFIED",
        { title: "지정되지 않은 테마 색상 이 값은 사용해서는 안 됩니다." }
      >
    | tags.Constant<"DARK1", { title: "첫 번째 어두운 색상을 나타냅니다." }>
    | tags.Constant<"LIGHT1", { title: "첫 번째 밝은 색상을 나타냅니다." }>
    | tags.Constant<"DARK2", { title: "두 번째 어두운 색상을 나타냅니다." }>
    | tags.Constant<"LIGHT2", { title: "두 번째 밝은 색상을 나타냅니다." }>
    | tags.Constant<"ACCENT1", { title: "첫 번째 강조 색상을 나타냅니다." }>
    | tags.Constant<"ACCENT2", { title: "두 번째 강조 색상을 나타냅니다." }>
    | tags.Constant<"ACCENT3", { title: "세 번째 강조 색상을 나타냅니다." }>
    | tags.Constant<"ACCENT4", { title: "네 번째 강조 색상을 나타냅니다." }>
    | tags.Constant<"ACCENT5", { title: "다섯 번째 강조 색상을 나타냅니다." }>
    | tags.Constant<"ACCENT6", { title: "6번째 강조 색상을 나타냅니다." }>
    | tags.Constant<
        "HYPERLINK",
        { title: "하이퍼링크에 사용할 색상을 나타냅니다." }
      >
    | tags.Constant<
        "FOLLOWED_HYPERLINK",
        { title: "방문한 하이퍼링크에 사용할 색상을 나타냅니다." }
      >
    | tags.Constant<"TEXT1", { title: "첫 번째 텍스트 색상을 나타냅니다." }>
    | tags.Constant<"BACKGROUND1", { title: "첫 번째 배경 색상을 나타냅니다." }>
    | tags.Constant<"TEXT2", { title: "두 번째 텍스트 색상을 나타냅니다." }>
    | tags.Constant<
        "BACKGROUND2",
        { title: "두 번째 배경 색상을 나타냅니다." }
      >;

  export type PageBackgroundFill = {
    /**
     * @title 배경 채우기 속성 상태입니다.
     */
    propertyState?: PropertyState | null;
  } & MyPartial<FillOption>;

  type FillOption = OneOf<{
    /**
     * @title 단색 채우기.
     */
    solidFill?: SolidFill;

    /**
     * @title 늘린 사진 채우기.
     */
    stretchedPictureFill?: StretchedPictureFill;
  }>;

  /**
   * @title 늘린 사진 채우기.
   *
   * 늘린 그림을 채웁니다.
   *
   * 페이지 또는 페이지 요소가 지정된 사진으로 완전히 채워집니다.
   *
   * 사진이 컨테이너에 맞게 늘어납니다.
   */
  export interface StretchedPictureFill {
    /**
     * @title 기본 수명으로 30분인 사진의 URL입니다.
     *
     * 이 URL에는 요청자 계정으로 태그가 지정됩니다.
     *
     * URL이 있는 모든 사람은 원래 요청자로서 사진에 실질적으로 액세스합니다.
     *
     * 프레젠테이션의 공유 설정이 변경되면 사진에 액세스하지 못하게 될 수 있습니다.
     *
     * 삽입 시 사진을 한 번 가져오고 프레젠테이션에 표시하기 위해 사본을 저장합니다.
     *
     * 사진은 50MB 미만이어야 하고, 25메가픽셀을 초과할 수 없으며, PNG, JPEG 또는 GIF 형식이어야 합니다.
     *
     * 제공된 URL의 최대 길이는 2KB입니다.
     */
    contentUrl?: (string & tags.Format<"uri">) | null;

    /**
     * @title 사진 채우기의 원래 크기.
     */
    readonly size?: Size;
  }

  /**
   * @title 페이지 유형.
   */
  export type PageType =
    | tags.Constant<"SLIDE", { title: "슬라이드 페이지" }>
    | tags.Constant<"MASTER", { title: "마스터 슬라이드 페이지" }>
    | tags.Constant<"LAYOUT", { title: "레이아웃 페이지" }>
    | tags.Constant<"NOTES", { title: "메모 페이지" }>
    | tags.Constant<"NOTES_MASTER", { title: "메모 마스터 페이지" }>;

  /**
   * @title 페이지에서 렌더링된 페이지 요소.
   */
  export type PageElementBase = {
    /**
     * @title 이 페이지 요소의 개체 ID.
     *
     * `Page`와 `PageElement`에서 사용하는 객체 ID는 동일한 네임스페이스를 공유한다.
     */
    objectId?: string | null;

    /**
     * @ttitle 페이지 요소의 크기.
     */
    size?: Size;

    /**?
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
    transform?: Transform;

    /**
     * @title 페이지 요소의 제목.
     *
     * 설명과 결합하여 대체 텍스트를 표시한다.
     */
    title?: string;

    /**
     * @title 페이지 요소의 설명.
     *
     * 제목과 결합하여 대체 텍스트를 표시한다.
     */
    description?: string;
  };

  export type PageElement =
    | ShapePageElement
    | ImagePageElement
    | LinePageElement;

  export interface ShapePageElement extends PageElementBase {
    /**
     * @title 일반 셰이프.
     */
    shape: Shape;
  }

  export interface ImagePageElement extends PageElementBase {
    /**
     * @title 이미지 페이지 요소.
     */
    image: Image;
  }

  export interface LinePageElement extends PageElementBase {
    /**
     * @title 라인 페이지 요소.
     */
    line: Line;
  }

  export interface Shape {
    /**
     * @title 도형의 유형.
     */
    shapeType?: Shape.Type;

    /**
     * @title 도형의 텍스트 콘텐츠.
     */
    text?: TextContent;

    /**
     * @title 도형의 속성.
     */
    shapeProperties?: ShapeProperties;

    /**
     * @title 자리표시자는 레이아웃과 마스터의 해당 자리표시자에서 상속되는 페이지 요소.
     *
     * 설정된 경우 도형은 자리표시자 도형이며 상속된 속성은 Placeholder.parent_object_id 필드로 식별된 상위 자리표시자를 확인하여 확인할 수 있습니다.
     */
    placeholder?: Placeholder;
  }

  export interface Placeholder {
    /**
     * @title 자리표시자의 유형.
     */
    type:
      | tags.Constant<
          "NONE",
          { title: "기본값은 자리표시자가 아니라는 의미입니다." }
        >
      | tags.Constant<"BODY", { title: "본문 텍스트." }>
      | tags.Constant<"CHART", { title: "차트 또는 그래프" }>
      | tags.Constant<"CLIP_ART", { title: "클립 아트 이미지" }>
      | tags.Constant<
          "CENTERED_TITLE",
          { title: "제목이 가운데에 표시됩니다." }
        >
      | tags.Constant<"DIAGRAM", { title: "다이어그램" }>
      | tags.Constant<"DATE_AND_TIME", { title: "날짜 및 시간" }>
      | tags.Constant<"FOOTER", { title: "바닥글 텍스트" }>
      | tags.Constant<"HEADER", { title: "헤더 텍스트" }>
      | tags.Constant<"MEDIA", { title: "멀티미디어" }>
      | tags.Constant<"OBJECT", { title: "모든 콘텐츠 유형" }>
      | tags.Constant<"PICTURE", { title: "사진." }>
      | tags.Constant<"SLIDE_NUMBER", { title: "슬라이드의 번호입니다." }>
      | tags.Constant<"SUBTITLE", { title: "부제" }>
      | tags.Constant<"TABLE", { title: "표를 클릭합니다." }>
      | tags.Constant<"TITLE", { title: "슬라이드 제목" }>
      | tags.Constant<"SLIDE_IMAGE", { title: "슬라이드 이미지입니다." }>;

    /**
     * @title 자리표시자의 색인.
     *
     * 동일한 페이지에 동일한 자리표시자 유형이 있는 경우 색인 값이 서로 다르다.
     */
    index?: number & tags.Type<"int64">;

    /**
     * @title 이 도형의 상위 자리표시자의 객체 ID.
     *
     * 설정하지 않으면 상위 자리표시자 도형이 존재하지 않으므로 도형은 다른 도형의 속성을 상속하지 않는다.
     */
    parentObjectId?: string;
  }

  /**
   * @title 도형 속성.
   *
   * 도형이 placeholder 필드에 의해 결정된 자리표시자 도형인 경우 이러한 속성은 상위 자리표시자 도형에서 상속될 수 있습니다.
   *
   * 속성의 렌더링된 값을 결정하는 것은 상응하는 propertyState 필드 값에 따라 다릅니다.
   *
   * 도형의 텍스트 자동 맞춤 설정은 텍스트가 도형에 적용되는 방식에 영향을 줄 수 있는 요청에 의해 자동으로 비활성화됩니다.
   */
  export interface ShapeProperties {
    /**
     * @title 도형의 배경 채우기.
     *
     * 도형의 배경 채우기 설정하지 않으면 상위 자리표시자가 배경 채우기를 상속받습니다.
     *
     * 도형에 상위 요소가 없는 경우 기본 배경 채우기는 도형 유형에 따라 달라지며 Slides 편집기에서 만든 새 도형의 기본값과 일치합니다.
     */
    shapeBackgroundFill?: ShapeBackgroundFill;

    /**
     * @title 도형의 윤곽선.
     *
     * 설정되지 않으면 개요가 상위 자리표시자에 상속됩니다.
     *
     * 도형에 상위 요소가 없으면 기본 윤곽선은 도형 유형에 따라 달라지며 Slides 편집기에서 만든 새 도형의 기본값과 일치합니다.
     */
    outline?: Outline;

    /**
     * @title 도형의 그림자 속성.
     *
     * 설정하지 않으면 상위 자리표시자에 그림자가 상속됩니다.
     *
     * 도형에 상위 항목이 없는 경우 기본 그림자는 Slides 편집기에서 만든 새 도형의 기본값과 일치합니다.
     */
    readonly shadow?: Shadow;

    /**
     * @title 도형의 하이퍼링크 대상입니다.
     *
     * 설정하지 않으면 링크가 표시되지 않습니다.
     *
     * 링크는 상위 자리표시자로부터 상속되지 않습니다.
     */
    link?: Link;

    /**
     * @title 도형 내 콘텐츠의 정렬
     *
     * unspecified인 경우 정렬은 상위 자리표시자가 있으면 상속됩니다.
     *
     * 도형에 상위 항목이 없는 경우 기본 정렬은 Slides 편집기에서 만든 새 도형의 정렬과 일치합니다.
     */
    contentAlignment?: ContentAlignment | null;

    /**
     * @title 도형의 자동 맞춤 속성입니다.
     *
     * 이 속성은 텍스트를 허용하는 도형에만 설정됩니다.
     */
    autofit?: AutoFit;
  }

  /**
   * @title `Shape`의 자동 맞춤 속성.
   */
  export interface AutoFit {
    /**
     * 도형의 자동 맞춤 유형입니다.
     *
     * 자동 맞춤 유형이 AUTOFIT_TYPE_UNSPECIFIED이면 상위 자리표시자에 자동 맞춤 유형이 상속됩니다.
     *
     * 경계 텍스트 상자 안의 텍스트 맞추기에 영향을 줄 수 있는 요청이 있는 경우 이 필드는 NONE로 자동 설정됩니다.
     *
     * 이 경우 fontScale는 fontSize에 적용되고 lineSpacingReduction는 lineSpacing에 적용됩니다.
     *
     * 두 속성 모두 기본값으로 재설정됩니다.
     */
    autofitType?: AutofitType | null;

    /**
     * @title 도형에 적용된 글꼴 배율.
     */
    readonly fontScale?: number | null;

    /**
     * @title 도형에 적용되는 선 간격 감소.
     */
    readonly lineSpacingReduction?: number | null;
  }

  /**
   * @title 자동 맞춤 유형.
   */
  export type AutofitType =
    | tags.Constant<
        "AUTOFIT_TYPE_UNSPECIFIED",
        { title: "자동 맞춤 유형이 지정되지 않았습니다." }
      >
    | tags.Constant<"NONE", { title: "자동 맞춤 안함" }>
    | tags.Constant<
        "TEXT_AUTOFIT",
        { title: "오버플로우 시 텍스트를 도형에 맞게 축소합니다." }
      >
    | tags.Constant<
        "SHAPE_AUTOFIT",
        { title: "텍스트에 맞게 도형의 크기를 조정합니다." }
      >;

  /**
   * @title 콘텐츠 정렬 유형.
   *
   * 콘텐츠 정렬 유형
   *
   * 'Office Open XML File Format - Fundamentals and Markup Language Reference' 섹션 20.1.10.59의 ECMA-376 4th Edition 파트 1에서 'ST_TextAnchoringType' 단순 유형 값의 하위 집합에서 파생되었습니다.
   */
  export type ContentAlignment =
    | tags.Constant<
        "CONTENT_ALIGNMENT_UNSPECIFIED",
        {
          title: `지정되지 않은 콘텐츠 정렬 콘텐츠 정렬이 상위 요소(있는 경우)에서 상속됩니다.`;
        }
      >
    | tags.Constant<
        "CONTENT_ALIGNMENT_UNSUPPORTED",
        { title: `지원되지 않는 콘텐츠 정렬입니다.` }
      >
    | tags.Constant<
        "TOP",
        {
          title: `콘텐츠 홀더 상단에 콘텐츠를 정렬하는 정렬입니다.`;
          description: `ECMA-376 ST_TextAnchoringType 't'에 해당합니다.`;
        }
      >
    | tags.Constant<
        "MIDDLE",
        {
          title: `콘텐츠를 콘텐츠 홀더의 중앙에 정렬한 것입니다.`;
          description: `ECMA-376 ST_TextAnchoringType 'ctr'에 해당합니다.`;
        }
      >
    | tags.Constant<
        "BOTTOM",
        {
          title: `콘텐츠를 콘텐츠 홀더 하단에 정렬한 정렬입니다.`;
          description: `ECMA-376 ST_TextAnchoringType 'b'에 해당합니다.`;
        }
      >;

  /**
   * @title 하이퍼 텍스트 링크.
   */
  export type Link = OneOf<{
    /**
     * 설정된 경우 이 URL이 외부 웹 페이지의 링크임을 나타낸다.
     */
    url?: (string & tags.Format<"uri">) | null;

    /**
     * 이 값이 설정된 경우 이 프레젠테이션에서 슬라이드의 위치에 따라 링크로 연결됩니다.
     */
    relativeLink?: RelativeSlideLink | null;

    /**
     * 설정된 경우 이 ID를 가진 프레젠테이션의 특정 페이지에 대한 링크임을 나타냅니다.
     *
     * 이 ID를 가진 페이지가 존재하지 않을 수 있습니다.
     */
    pageObjectId?: string | null;

    /**
     * 설정된 경우 프레젠테이션에서 이 0부터 시작하는 색인의 슬라이드 링크임을 나타냅니다.
     *
     * 이 인덱스에 슬라이드가 없을 수 있습니다.
     */
    slideIndex?: (number & tags.Type<"int64">) | null;
  }>;

  /**
   * @title 상대 링크의 종류.
   */
  export type RelativeSlideLink =
    | tags.Constant<
        "RELATIVE_SLIDE_LINK_UNSPECIFIED",
        { title: "지정되지 않은 상대 슬라이드 링크" }
      >
    | tags.Constant<"NEXT_SLIDE", { title: "다음 슬라이드 링크" }>
    | tags.Constant<"PREVIOUS_SLIDE", { title: "이전 슬라이드 링크" }>
    | tags.Constant<
        "FIRST_SLIDE",
        { title: "프레젠테이션의 첫 번째 슬라이드 링크입니다." }
      >
    | tags.Constant<
        "LAST_SLIDE",
        { title: "프레젠테이션의 마지막 슬라이드 링크입니다." }
      >;

  /**
   * @title 그림자.
   */
  export interface Shadow {
    readonly type?:
      | tags.Constant<
          "SHADOW_TYPE_UNSPECIFIED",
          { title: "지정되지 않은 그림자 유형" }
        >
      | tags.Constant<"OUTER", { title: "외부 그림자" }>
      | null;

    /**
     * 정렬 위치를 기준으로 그림자의 변환, 배율 및 왜곡을 인코딩하는 변환입니다.
     */
    transform?: AffineTransform;

    /**
     * 그림자의 변환 지점, 배율 및 왜곡 방향을 설정하는 그림자의 정렬 지점입니다.
     */
    readonly alignment?: RectanglePosition | null;

    /**
     * @title 그림자 블러의 반경.
     *
     * 반경이 클수록 그림자가 더 확산됩니다.
     */
    blurRadius?: Dimension;

    /**
     * @title 그림자 색상 값.
     */
    color?: OpaqueColor;

    /**
     * @title 그림자 색상의 알파.
     */
    alpha?: (number & tags.Minimum<0> & tags.Maximum<1>) | null;

    /**
     * @title 도형이 도형과 함께 회전되어야 하는지 여부.
     */
    readonly rotateWithShape?: boolean | null;

    /**
     * @title 그림자 속성 상태
     *
     * 페이지 요소에 그림자를 업데이트하면 같은 요청에 다른 값이 지정되지 않는 한 이 필드가 RENDERED에 암시적으로 업데이트됩니다.
     *
     * 페이지 요소에 그림자가 없도록 하려면 이 필드를 NOT_RENDERED로 설정합니다.
     *
     * 이 경우 동일한 요청에 설정된 다른 그림자 필드는 모두 무시됩니다.
     */
    propertyState?: PropertyState | null;
  }

  export type RectanglePosition =
    | tags.Constant<
        "RECTANGLE_POSITION_UNSPECIFIED",
        { title: "지정되지 않았습니다." }
      >
    | tags.Constant<"TOP_LEFT", { title: "왼쪽 상단" }>
    | tags.Constant<"TOP_CENTER", { title: "상단 중앙" }>
    | tags.Constant<"TOP_RIGHT", { title: "오른쪽 상단" }>
    | tags.Constant<"LEFT_CENTER", { title: "왼쪽 가운데입니다." }>
    | tags.Constant<"CENTER", { title: "중앙" }>
    | tags.Constant<"RIGHT_CENTER", { title: "오른쪽 가운데" }>
    | tags.Constant<"BOTTOM_LEFT", { title: "왼쪽 하단" }>
    | tags.Constant<"BOTTOM_CENTER", { title: "하단 중앙" }>
    | tags.Constant<"BOTTOM_RIGHT", { title: "오른쪽 하단" }>;

  export type AffineTransform = Transform;

  export interface Outline {
    /**
     * @title 윤곽선 속성 상태입니다.
     */
    propertyState?: PropertyState | null;

    /**
     * @title 윤곽선 채우기.
     */
    outlineFill?: OutlineFill;

    /**
     * @title 윤곽선의 두께.
     */
    weight?: Dimension;

    /**
     * @title 윤곽선의 대시 스타일.
     */
    dashStyle?: DashStyle | null;
  }

  /**
   * @title 윤곽선 채우기.
   */
  export interface OutlineFill {
    /**
     * @title 단색 채우기.
     */
    solidFill?: SolidFill;
  }

  /**
   * @title 단색 채우기.
   *
   * 단색 채우기 페이지 또는 페이지 요소가 지정된 색상 값으로 완전히 채워집니다.
   *
   * 설정되지 않은 필드의 값은 상위 자리표시자가 있는 경우 해당 값을 상속받을 수 있습니다.
   */
  export interface SolidFill {
    /**
     * @title 단색의 색상 값.
     */
    color?: OpaqueColor;

    /**
     * @title 픽셀에 적용해야 하는 color의 비율 값.
     *
     * 최종 픽셀 색상은 등식으로 정의된다.
     *
     * `픽셀 색상 = (alpha * color) + (1.0 - alpha) * (배경 색상)`
     *
     * 즉 1.0 값은 단색에 해당하는 반면 0.0 값은 완전히 투명한 색상에 해당한다.
     */
    alpha?: (number & tags.Minimum<0> & tags.Maximum<1>) | null;
  }

  /**
   * @title 테마가 있는 단색 값.
   */
  export type OpaqueColor = RgbColorMap | ThemeColorMap;

  export interface ThemeColorMap {
    /**
     * @title 테마 색상 유형.
     */
    themeColor?: ThemeColor;
  }

  export interface RgbColorMap {
    /**
     * @title RGB 색상 유형.
     */
    rgbColor?: RgbColor;
  }

  type ThemeColor =
    | tags.Constant<
        "THEME_COLOR_TYPE_UNSPECIFIED",
        { title: "지정되지 않은 테마 색상 이 값은 사용해서는 안 됩니다." }
      >
    | tags.Constant<"DARK1", { title: "첫 번째 어두운 색상을 나타냅니다." }>
    | tags.Constant<"LIGHT1", { title: "첫 번째 밝은 색상을 나타냅니다." }>
    | tags.Constant<"DARK2", { title: "두 번째 어두운 색상을 나타냅니다." }>
    | tags.Constant<"LIGHT2", { title: "두 번째 밝은 색상을 나타냅니다." }>
    | tags.Constant<"ACCENT1", { title: "첫 번째 강조 색상을 나타냅니다." }>
    | tags.Constant<"ACCENT2", { title: "두 번째 강조 색상을 나타냅니다." }>
    | tags.Constant<"ACCENT3", { title: "세 번째 강조 색상을 나타냅니다." }>
    | tags.Constant<"ACCENT4", { title: "네 번째 강조 색상을 나타냅니다." }>
    | tags.Constant<"ACCENT5", { title: "다섯 번째 강조 색상을 나타냅니다." }>
    | tags.Constant<"ACCENT6", { title: "6번째 강조 색상을 나타냅니다." }>
    | tags.Constant<
        "HYPERLINK",
        { title: "하이퍼링크에 사용할 색상을 나타냅니다." }
      >
    | tags.Constant<
        "FOLLOWED_HYPERLINK",
        { title: "방문한 하이퍼링크에 사용할 색상을 나타냅니다." }
      >
    | tags.Constant<"TEXT1", { title: "첫 번째 텍스트 색상을 나타냅니다." }>
    | tags.Constant<"BACKGROUND1", { title: "첫 번째 배경 색상을 나타냅니다." }>
    | tags.Constant<"TEXT2", { title: "두 번째 텍스트 색상을 나타냅니다." }>
    | tags.Constant<
        "BACKGROUND2",
        { title: "두 번째 배경 색상을 나타냅니다." }
      >;

  export interface RgbColor {
    /**
     * @title 색상의 빨간색 구성 요소.
     */
    red?: (number & tags.Minimum<0> & tags.Maximum<1>) | null;

    /**
     * @title 색상의 초록색 구성 요소.
     */
    green?: (number & tags.Minimum<0> & tags.Maximum<1>) | null;

    /**
     * @title 색상의 파란색 구성 요소.
     */
    blue?: (number & tags.Minimum<0> & tags.Maximum<1>) | null;
  }

  /**
   * @title 도형 배경 채우기.
   */
  export interface ShapeBackgroundFill {
    /**
     * @title 속성의 가능한 상태.
     */
    propertyState?: PropertyState | null;

    /**
     * @title 단색 채우기.
     */
    solidFill?: SolidFill;
  }

  export type PropertyState = (
    | tags.Constant<
        "RENDERED",
        {
          title: "RENDERED";
          description: `속성의 상태가 RENDERED인 경우 페이지에서 렌더링될 때 요소에 상응하는 속성이 포함됩니다. 요소가 placeholder 필드에 의해 결정된 자리표시자 도형이고 자리표시자 도형에서 상속되는 경우 해당하는 필드는 설정되지 않을 수 있습니다. 즉, 속성 값이 상위 자리표시자에서 상속됩니다. 요소가 상속되지 않는 경우 필드에는 렌더링된 값이 포함됩니다. 기본값입니다.`;
        }
      >
    | tags.Constant<
        "NOT_RENDERED",
        {
          title: "NOT_RENDERED";
          description: `속성 상태가 NOT_RENDERED인 경우 페이지에서 렌더링될 때 요소에 상응하는 속성이 없는 것입니다. 하지만 하위 도형에 상속될 수 있도록 이 필드는 계속 설정될 수 있습니다. 렌더링된 요소에서 속성을 삭제하려면 propertyState를 NOT_RENDERED로 설정합니다.`;
        }
      >
    | tags.Constant<
        "INHERIT",
        {
          title: "INHERIT";
          description: `속성의 상태가 INHERIT인 경우 속성 상태는 상위 도형의 propertyState 필드에 있는 값을 사용합니다. 상속되지 않는 요소에는 INHERIT 속성 상태가 없습니다.`;
        }
      >
  ) &
    tags.Default<"RENDERED">;

  export interface TextContent {
    /**
     * @title 스타일 지정 정보를 포함하여 구성요소로 분류된 텍스트 콘텐츠입니다.
     */
    readonly textElements?: TextElement[];

    /**
     * @title 텍스트에 포함된 글머리 기호 목록.
     *
     * 목록 ID로 키가 지정된다.
     */
    lists?: {
      [Key: string]: List;
    } | null;
  }

  /**
   * @title 목록과 연결된 단락에 속한 글머리기호의 디자인을 설명하는 타입.
   *
   * 목록의 일부인 단락에는 해당 목록의 ID에 대한 암시적 참조가 있습니다.
   */
  export interface List {
    /**
     * @title 목록의 ID.
     */
    listId?: string | null;

    /**
     * @title 관련 수준의 글머리 기호 속성에 대한 중첩 수준의 맵
     *
     * 목록의 중첩 수준은 최대 9개이므로 사용할 수 있는 키는 0부터 8까지이다.
     *
     * 지정된 중첩 수준에서 목록 글머리 기호의 디자인을 설명하는 속성이 포함되어 있습니다.
     */
    nestingLevel?:
      | {
          [Key in 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8]: {
            bulletStyle: TextStyle;
          };
        }
      | null;
  }

  export type TextElement = {
    /**
     * @title 이 텍스트 요소의 0부터 시작되는 시작 색인. (유니코드 코드 단위)
     */
    startIndex?: (number & tags.Type<"int64">) | null;

    /**
     * @title 이 텍스트 요소의 0부터 시작되는 종료 색인. (유니코드 코드 단위 제외)
     */
    endIndex?: (number & tags.Type<"int64">) | null;
  } & OneOf<{
    /**
     * @title 단락 마커.
     *
     * 새 단락의 시작을 나타내는 TextElement 종류입니다.
     */
    paragraphMarker?: ParagraphMarker;

    /**
     * @title 런의 모든 문자가 동일한 TextStyle인 텍스트 런을 나타내는 TextElement입니다.
     *
     * TextRun의 startIndex 및 endIndex는 항상 단일 paragraphMarker TextElement의 색인 범위에 완전히 포함됩니다.
     *
     * 즉, TextRun은 여러 단락으로 확장되지 않습니다.
     */
    textRun?: TextRun;

    /**
     * @title 시간이 지남에 따라 변할 수 있는 콘텐츠로 동적으로 대체되는 텍스트의 한 지점을 나타내는 TextElement입니다.
     */
    autoText?: AutoText;
  }>;

  export interface AutoText {
    /**
     * @title 이 자동 텍스트의 유형.
     */
    type:
      | tags.Constant<
          "TYPE_UNSPECIFIED",
          { title: "지정되지 않은 자동 텍스트 유형" }
        >
      | tags.Constant<
          "SLIDE_NUMBER",
          { title: "현재 슬라이드 번호를 나타내는 자동 텍스트." }
        >;

    /**
     * @title 이 자동 텍스트의 렌더링된 콘텐츠. (있는 경우)
     */
    content: string;

    /**
     * @title 이 자동 텍스트에 적용되는 스타일.
     */
    style?: TextStyle;
  }

  /**
   * @title 텍스트 실행.
   *
   * 모든 스타일이 동일한 RON을 나타내는 TextElement의 종류.
   */
  export interface TextRun {
    /**
     * @title 이 실행의 텍스트.
     */
    content?: string | null;

    /**
     * @title 이 실행에 적용된 스타일 지정.
     */
    style?: TextStyle;
  }

  export interface AutoText {
    /**
     * @title 이 자동 텍스트의 유형.
     */
    type:
      | tags.Constant<
          "TYPE_UNSPECIFIED",
          { title: "지정되지 않은 자동 텍스트 유형" }
        >
      | tags.Constant<
          "SLIDE_NUMBER",
          { title: "현재 슬라이드 번호를 나타내는 자동 텍스트." }
        >;

    /**
     * @title 이 자동 텍스트의 렌더링된 콘텐츠. (있는 경우)
     */
    content: string;

    /**
     * @title 이 자동 텍스트에 적용되는 스타일.
     */
    style?: TextStyle;
  }

  export interface ParagraphMarker {
    /**
     * @title 단락의 스타일.
     */
    style?: ParagraphStyle;

    /**
     * @title 이 단락의 글머리 기호.
     *
     * 없는 경우 단락이 목록에 속하지 않는다.
     */
    bullet?: Bullet;
  }

  /**
   * @title 단락의 글머리 기호.
   */
  export interface Bullet {
    /**
     * @title 이 단락이 속한 목록의 ID
     */
    listId: string;

    /**
     * @title 목록에서 이 단락의 중첩 수준.
     */
    nestingLevel?: number & tags.Type<"int64">;

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
    backgroundColor?: OptionalColor;

    /**
     * @title 텍스트 자체의 색상.
     *
     * 이 속성을 설정하면 색상의 opaqueColor 필드가 설정되어 있는지에 따라 색상이 불투명하거나 투명합니다.
     */
    foregroundColor?: OptionalColor;

    /**
     * @title 텍스트가 굵게 렌더링되는지 여부.
     */
    bold?: boolean | null;

    /**
     * @title 텍스트에 기울임꼴을 적용할지 여부.
     */
    italic?: boolean | null;

    /**
     * @title 텍스트의 글꼴.
     *
     * 글꼴 모음은 Slides의 글꼴 메뉴 또는 Google Fonts의 글꼴일 수 있습니다.
     *
     * 글꼴 이름이 인식되지 않으면 텍스트가 `Arial`에서 렌더링된다.
     *
     * 일부 글꼴은 텍스트의 두께에 영향을 줄 수 있다.
     *
     * 업데이트 요청에서 fonrtFamily 및 bold 값을 모두 지정하면 명시적으로 설정된 bold 값이 사용된다.
     */
    fontFamily?: string | null;

    /**
     * @title 텍스트 글꼴의 크기.
     *
     * 읽을 때 `fontSize`가 포인트로 지정된다.
     */
    fontSize?: Dimension;

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
    link?: Link;

    /**
     * @title 일반 위치에서의 텍스트 세로 오프셋.
     *
     * SUPERSCRIPT 또는 SUBSCRIPT 기준 오프셋이 있는 텍스트는 더 작은 글꼴 크기로 자동 렌더링되며 fontSize 필드를 기준으로 계산됩니다.
     *
     * fontSize 자체는 이 필드의 변경에 영향을 받지 않습니다.
     */
    baselineOffset?: BaselineOffset | null;

    /**
     * @title 텍스트가 작은 대문자인지 여부.
     */
    smallCaps?: boolean | null;

    /**
     * @title 취소선 표시 여부.
     */
    strikethrough?: boolean | null;

    /**
     * @title 텍스트에 밑줄이 표시되는지 여부.
     */
    underline?: boolean | null;

    /**
     * @title 글꼴 모음 및 텍스트의 렌더링된 두꼐.
     */
    weightedFontFamily?: WeightedFontFamily;
  }

  /**
   * @title 기준선 오프셋.
   *
   * 텍스트가 정상적인 위치에서 세로로 오프셋되는 방식.
   */
  export type BaselineOffset =
    | tags.Constant<
        "BASELINE_OFFSET_UNSPECIFIED",
        { title: "텍스트의 기준선 오프셋은 상위 요소로부터 상속됩니다." }
      >
    | tags.Constant<"NONE", { title: "텍스트가 세로로 오프셋되지 않습니다." }>
    | tags.Constant<
        "SUPERSCRIPT",
        { title: "텍스트가 수직 위쪽의 오프셋 (위 첨자)입니다." }
      >
    | tags.Constant<
        "SUBSCRIPT",
        { title: "텍스트가 수직 아래쪽 (아래 첨자)으로 오프셋됩니다." }
      >;

  /**
   * @title 가중치가 적용된 글꼴 모음.
   */
  export interface WeightedFontFamily {
    /**
     * @title 텍스트의 글꼴입니다.
     *
     * 글꼴 모음은 Slides의 글꼴 메뉴 또는 Google Fonts의 글꼴일 수 있습니다.
     *
     * 글꼴 이름이 인식되지 않으면 텍스트가 Arial에서 렌더링됩니다.
     */
    fontFamily?: string | null;

    /**
     * @title 텍스트의 렌더링된 두께입니다.
     */
    weight:
      | (number &
          tags.Type<"int64"> &
          tags.Minimum<100> &
          tags.Maximum<900> &
          tags.MultipleOf<100>)
      | null;
  }

  /**
   * @title 선택 색상.
   *
   * 완전히 불투명하거나 완전히 투명할 수 있는 색상.
   */
  export interface OptionalColor {
    /**
     * 설정된 경우 불투명 색상으로 사용됩니다.
     *
     * 설정하지 않으면 투명한 색상을 나타냅니다.
     */
    opaqueColor?: OpaqueColor;
  }

  /**
   * @title 전체 단락에 적용되는 스타일.
   *
   * 이 텍스트가 상위 placeholder를 포함하는 도형에 포함되어 있으면 이 단락 스타일이 상위 요소로부터 상속될 수 있습니다.
   *
   * 상속되는 단락 스타일은 목록의 중첩 수준에 따라 다릅니다.
   *
   * - 목록에 없는 단락은 상위 자리표시자 내에서 목록의 0 중첩 수준에 있는 단락에서 단락 스타일을 상속합니다.
   * - 목록의 단락은 상위 자리표시자 내 목록의 해당 중첩 수준에 있는 단락에서 단락 스타일을 상속합니다.
   *
   * 상속된 단락 스타일은 이 메시지에서 설정되지 않은 필드로 표시됩니다.
   *
   */
  export interface ParagraphStyle {
    lineSpacing?: number | null;

    /**
     * @title 단락의 텍스트 정렬 유형
     */
    alignment?: Alignment | null;

    /**
     * @title 현재 텍스트 방향을 기준으로 텍스트의 시작 부분에 해당하는 단락 단락의 들여쓰기 간격.
     */
    indentStart?: Dimension;

    /**
     * @title 현재 텍스트 방향을 기준으로 텍스트의 끝 부분에 해당하는 단락 단락의 들여쓰기 간격.
     */
    indentEnd?: Dimension;

    /**
     * @title 단락 위의 추가 공백입니다.
     *
     * 설정하지 않으면 값이 상위 요소로부터 상속됩니다.
     */
    spaceAbove?: Dimension;

    /**
     * @title 단락 아래에 여분의 공간이 표시됩니다.
     *
     * 설정하지 않으면 값이 상위 요소로부터 상속됩니다.
     */
    spaceBelow?: Dimension;

    /**
     * @title 단락 첫 번째 줄의 시작 부분을 들여씁니다.
     *
     * 설정하지 않으면 값이 상위 요소로부터 상속됩니다.
     */
    indentFirstLine?: Dimension;

    /**
     * @title 이 단락의 텍스트 방향입니다.
     */
    direction?: (TextDirection & tags.Default<"LEFT_TO_RIGHT">) | null;

    /**
     * @title 단락의 간격 모드.
     */
    spacingMode?: SpacingMode | null;
  }

  /**
   * @title 단락의 텍스트 정렬 유형
   */
  export type Alignment =
    | tags.Constant<
        "ALIGNMENT_UNSPECIFIED",
        { title: "단락 정렬은 상위 요소로부터 상속됩니다." }
      >
    | tags.Constant<
        "START",
        {
          title: "단락이 줄의 시작 부분에 정렬됩니다. LTR 텍스트의 경우 왼쪽, 그렇지 않은 경우 오른쪽 정렬";
        }
      >
    | tags.Constant<"CENTER", { title: "단락이 중앙에 표시됩니다." }>
    | tags.Constant<
        "END",
        {
          title: "단락이 줄의 끝에 정렬됩니다. LTR 텍스트의 경우 오른쪽 정렬, 그렇지 않은 경우 왼쪽 정렬";
        }
      >
    | tags.Constant<"JUSTIFIED", { title: "단락이 정렬되었습니다." }>;

  /**
   * @title 텍스트 방향.
   *
   * 텍스트 경로가 표시될 수 있다.
   */
  export type TextDirection =
    | tags.Constant<
        "TEXT_DIRECTION_UNSPECIFIED",
        { title: "텍스트 방향은 상위 요소로부터 상속됩니다." }
      >
    | tags.Constant<
        "LEFT_TO_RIGHT",
        { title: "텍스트가 왼쪽에서 오른쪽으로 이동합니다." }
      >
    | tags.Constant<
        "RIGHT_TO_LEFT",
        { title: "텍스트가 오른쪽에서 왼쪽으로 이동합니다." }
      >;

  /**
   * @title 간격 모드.
   *
   * 단락 간격의 여러 가지 모드.
   */
  export type SpacingMode =
    | tags.Constant<
        "SPACING_MODE_UNSPECIFIED",
        { title: "간격 모드는 상위 요소로부터 상속됩니다." }
      >
    | tags.Constant<
        "NEVER_COLLAPSE",
        { title: "단락 간격은 항상 렌더링됩니다." }
      >
    | tags.Constant<
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
      | tags.Constant<"TYPE_UNSPECIFIED", { title: `사전 정의된 도형 유형.` }>
      | tags.Constant<"TEXT_BOX", { title: `텍스트 상자 도형` }>
      | tags.Constant<
          "RECTANGLE",
          { title: `직사각형 도형 ECMA-376 ST_ShapeType 'rect'에 해당합니다.` }
        >
      | tags.Constant<
          "ROUND_RECTANGLE",
          {
            title: `모서리가 둥근 직사각형 ECMA-376 ST_ShapeType 'roundRect'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "ELLIPSE",
          { title: `타원형. ECMA-376 ST_ShapeType 'ellipse'에 해당합니다.` }
        >
      | tags.Constant<
          "ARC",
          {
            title: `구부러진 원호 모양 ECMA-376 ST_ShapeType 'arc'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "BENT_ARROW",
          {
            title: `휘어진 화살표 도형 ECMA-376 ST_ShapeType 'bentArrow'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "BENT_UP_ARROW",
          {
            title: `위로 휘어진 화살표 모양 ECMA-376 ST_ShapeType 'bentUpArrow'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "BEVEL",
          { title: `입체 테두리. ECMA-376 ST_ShapeType 'bevel'에 해당합니다.` }
        >
      | tags.Constant<
          "BLOCK_ARC",
          {
            title: `블록 원호 모양 ECMA-376 ST_ShapeType 'blockArc'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "BRACE_PAIR",
          {
            title: `중괄호 쌍 모양입니다. ECMA-376 ST_ShapeType 'bracePair'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "BRACKET_PAIR",
          {
            title: `괄호 쌍 모양 ECMA-376 ST_ShapeType 'rackPair'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "CAN",
          {
            title: `도형을 만들 수 있습니다. ECMA-376 ST_ShapeType 'can'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "CHEVRON",
          {
            title: `갈매기형 도형 ECMA-376 ST_ShapeType 'chevron'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "CHORD",
          { title: `코드 모양 ECMA-376 ST_ShapeType 'chord'에 해당합니다.` }
        >
      | tags.Constant<
          "CLOUD",
          { title: `구름 모양 ECMA-376 ST_ShapeType 'cloud'에 해당합니다.` }
        >
      | tags.Constant<
          "CORNER",
          { title: `모서리 모양 ECMA-376 ST_ShapeType 'corner'에 해당합니다.` }
        >
      | tags.Constant<
          "CUBE",
          { title: `정육면체 ECMA-376 ST_ShapeType 'cube'에 해당합니다.` }
        >
      | tags.Constant<
          "CURVED_DOWN_ARROW",
          {
            title: `아래쪽 화살표 모양 ECMA-376 ST_ShapeType 'curvedDown화살표'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "CURVED_LEFT_ARROW",
          {
            title: `왼쪽 구부러진 화살표 모양 ECMA-376 ST_ShapeType 'curvedLeft화살표'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "CURVED_RIGHT_ARROW",
          {
            title: `오른쪽 구부러진 화살표 모양 ECMA-376 ST_ShapeType 'curvedRightArrow'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "CURVED_UP_ARROW",
          {
            title: `위로 구부러진 화살표 모양 ECMA-376 ST_ShapeType 'curvedUpArrow'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "DECAGON",
          { title: `십각형 도형 ECMA-376 ST_ShapeType 'decagon'에 해당합니다.` }
        >
      | tags.Constant<
          "DIAGONAL_STRIPE",
          {
            title: `대각선 줄무늬 ECMA-376 ST_ShapeType 'diagStripe'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "DIAMOND",
          {
            title: `다이아몬드 모양 ECMA-376 ST_ShapeType 'diamond'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "DODECAGON",
          {
            title: `십이형 도형 ECMA-376 ST_ShapeType 'dodecagon'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "DONUT",
          { title: `도넛 모양 ECMA-376 ST_ShapeType 'donut'에 해당합니다.` }
        >
      | tags.Constant<
          "DOUBLE_WAVE",
          {
            title: `이중 물결 모양. ECMA-376 ST_ShapeType 'doubleWave'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "DOWN_ARROW",
          {
            title: `아래쪽 화살표 도형 ECMA-376 ST_ShapeType 'down화살표'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "DOWN_ARROW_CALLOUT",
          {
            title: `콜아웃 아래쪽 화살표 도형 ECMA-376 ST_ShapeType 'down화살표콜아웃'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "FOLDED_CORNER",
          {
            title: `모서리가 접힌 도형 ECMA-376 ST_ShapeType 'foldedCorner'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "FRAME",
          { title: `프레임 모양 ECMA-376 ST_ShapeType 'frame'에 해당합니다.` }
        >
      | tags.Constant<
          "HALF_FRAME",
          {
            title: `절반 프레임 ECMA-376 ST_ShapeType 'halfFrame'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "HEART",
          { title: `하트 모양 ECMA-376 ST_ShapeType 'heart'에 해당합니다.` }
        >
      | tags.Constant<
          "HEPTAGON",
          { title: `7각형 ECMA-376 ST_ShapeType 'heptagon'에 해당합니다.` }
        >
      | tags.Constant<
          "HEXAGON",
          { title: `육각형 모양. ECMA-376 ST_ShapeType '육각형'에 해당합니다.` }
        >
      | tags.Constant<
          "HOME_PLATE",
          {
            title: `홈플레이트 모양 ECMA-376 ST_ShapeType 'homePlate'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "HORIZONTAL_SCROLL",
          {
            title: `가로 스크롤 모양 ECMA-376 ST_ShapeType 'horizontalScroll'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "IRREGULAR_SEAL_1",
          {
            title: `밀봉 1 도형 ECMA-376 ST_ShapeType 'irregularSeal1'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "IRREGULAR_SEAL_2",
          {
            title: `불규칙적인 표시 2 도형 ECMA-376 ST_ShapeType 'irregularSeal2'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "LEFT_ARROW",
          {
            title: `왼쪽 화살표 도형 ECMA-376 ST_ShapeType 'leftArrow'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "LEFT_ARROW_CALLOUT",
          {
            title: `콜아웃 왼쪽 화살표 도형 ECMA-376 ST_ShapeType 'left화살표콜아웃'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "LEFT_BRACE",
          {
            title: `왼쪽 중괄호 도형. ECMA-376 ST_ShapeType 'leftBrace'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "LEFT_BRACKET",
          {
            title: `왼쪽 대괄호 모양 ECMA-376 ST_ShapeType 'leftBracket'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "LEFT_RIGHT_ARROW",
          {
            title: `왼쪽 화살표 모양 ECMA-376 ST_ShapeType 'leftRight화살표'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "LEFT_RIGHT_ARROW_CALLOUT",
          {
            title: `콜아웃 왼쪽 오른쪽 화살표 도형 ECMA-376 ST_ShapeType 'leftRight화살표콜아웃'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "LEFT_RIGHT_UP_ARROW",
          {
            title: `왼쪽/오른쪽 화살표 모양 ECMA-376 ST_ShapeType 'leftRightUp화살표'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "LEFT_UP_ARROW",
          {
            title: `왼쪽 화살표 모양 ECMA-376 ST_ShapeType 'leftUpArrow'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "LIGHTNING_BOLT",
          {
            title: `번개 모양 모양 ECMA-376 ST_ShapeType 'lightningBolt'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "MATH_DIVIDE",
          {
            title: `수학 도형을 나눕니다. ECMA-376 ST_ShapeType 'mathDivide'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "MATH_EQUAL",
          { title: `등호 모양 ECMA-376 ST_ShapeType 'mathEqual'에 해당합니다.` }
        >
      | tags.Constant<
          "MATH_MINUS",
          {
            title: `수학 모양 빼기 ECMA-376 ST_ShapeType 'mathMinus'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "MATH_MULTIPLY",
          {
            title: `수학 곱하기 도형 ECMA-376 ST_ShapeType 'mathMultiply'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "MATH_NOT_EQUAL",
          {
            title: `수학 모양이 같지 않습니다. ECMA-376 ST_ShapeType 'mathNotEqual'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "MATH_PLUS",
          { title: `+ ECMA-376 ST_ShapeType 'mathPlus'에 해당합니다.` }
        >
      | tags.Constant<
          "MOON",
          { title: `달 모양 ECMA-376 ST_ShapeType 'moon'에 해당합니다.` }
        >
      | tags.Constant<
          "NO_SMOKING",
          {
            title: `흡연 형태 없음 ECMA-376 ST_ShapeType 'noSmoking'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "NOTCHED_RIGHT_ARROW",
          {
            title: `톱니 모양의 오른쪽 화살표 모양 ECMA-376 ST_ShapeType 'notchedRightArrow'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "OCTAGON",
          {
            title: `팔각형 모양. ECMA-376 ST_ShapeType 'octagon'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "PARALLELOGRAM",
          {
            title: `평행사각형. ECMA-376 ST_ShapeType 'parallelogram'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "PENTAGON",
          { title: `오각형 ECMA-376 ST_ShapeType 'pentagon'에 해당합니다.` }
        >
      | tags.Constant<
          "PIE",
          {
            title: `원형 모양입니다. ECMA-376 ST_ShapeType 'pie'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "PLAQUE",
          { title: `명판 ECMA-376 ST_ShapeType 'plaque'에 해당합니다.` }
        >
      | tags.Constant<
          "PLUS",
          { title: `+ 도형 ECMA-376 ST_ShapeType 'plus'에 해당합니다.` }
        >
      | tags.Constant<
          "QUAD_ARROW",
          {
            title: `4각형 도형 ECMA-376 ST_ShapeType 'quad화살표'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "QUAD_ARROW_CALLOUT",
          {
            title: `콜아웃의 네 방향 화살표 모양 ECMA-376 ST_ShapeType 'quad화살표콜아웃'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "RIBBON",
          { title: `리본 모양 ECMA-376 ST_ShapeType 'ribbon'에 해당합니다.` }
        >
      | tags.Constant<
          "RIBBON_2",
          { title: `리본 2 도형 ECMA-376 ST_ShapeType 'ribbon2'에 해당합니다.` }
        >
      | tags.Constant<
          "RIGHT_ARROW",
          {
            title: `오른쪽 화살표 도형 ECMA-376 ST_ShapeType 'rightArrow'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "RIGHT_ARROW_CALLOUT",
          {
            title: `콜아웃 오른쪽 화살표 도형 ECMA-376 ST_ShapeType 'right화살표콜아웃'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "RIGHT_BRACE",
          {
            title: `오른쪽 중괄호 모양. ECMA-376 ST_ShapeType 'rightBrace'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "RIGHT_BRACKET",
          {
            title: `오른쪽 대괄호 모양 ECMA-376 ST_ShapeType 'rightBracket'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "ROUND_1_RECTANGLE",
          {
            title: `모서리가 둥근 직사각형 ECMA-376 ST_ShapeType 'round1Rect'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "ROUND_2_DIAGONAL_RECTANGLE",
          {
            title: `대각선으로 모서리가 둥근 두 개의 직사각형 모양 ECMA-376 ST_ShapeType 'round2DiagRect'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "ROUND_2_SAME_RECTANGLE",
          {
            title: `같은 측면의 두 모서리가 둥근 직사각형 모양입니다. ECMA-376 ST_ShapeType 'round2SameRect'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "RIGHT_TRIANGLE",
          {
            title: `직각 삼각형 ECMA-376 ST_ShapeType 'rtTriangle'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "SMILEY_FACE",
          {
            title: `웃는 얼굴 모양 ECMA-376 ST_ShapeType 'smileyFace'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "SNIP_1_RECTANGLE",
          {
            title: `한쪽 모서리가 잘린 직사각형 도형 ECMA-376 ST_ShapeType 'snip1Rect'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "SNIP_2_DIAGONAL_RECTANGLE",
          {
            title: `대각선 절단 모서리가 직사각형 모양입니다. ECMA-376 ST_ShapeType 'snip2DiagRect'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "SNIP_2_SAME_RECTANGLE",
          {
            title: `같은 측면의 한쪽 모서리가 잘린 직사각형 도형 ECMA-376 ST_ShapeType 'snip2SameRect'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "SNIP_ROUND_RECTANGLE",
          {
            title: `한쪽 모서리가 잘리고 한쪽 모서리가 둥근 직사각형입니다. ECMA-376 ST_ShapeType 'snipRoundRect'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "STAR_10",
          {
            title: `10각형 별 모양 ECMA-376 ST_ShapeType 'star10'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "STAR_12",
          {
            title: `12각형 별 모양 ECMA-376 ST_ShapeType 'star12'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "STAR_16",
          {
            title: `16각형 별 모양 ECMA-376 ST_ShapeType 'star16'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "STAR_24",
          {
            title: `24각형 별 모양입니다. ECMA-376 ST_ShapeType 'star24'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "STAR_32",
          {
            title: `32개의 별 모양입니다. ECMA-376 ST_ShapeType 'star32'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "STAR_4",
          {
            title: `4각형 별 모양. ECMA-376 ST_ShapeType 'star4'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "STAR_5",
          {
            title: `5각형 별 모양. ECMA-376 ST_ShapeType 'star5'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "STAR_6",
          { title: `6각형 별 모양 ECMA-376 ST_ShapeType 'star6'에 해당합니다.` }
        >
      | tags.Constant<
          "STAR_7",
          { title: `7각형 도형 ECMA-376 ST_ShapeType 'star7'에 해당합니다.` }
        >
      | tags.Constant<
          "STAR_8",
          {
            title: `8각형 별 모양. ECMA-376 ST_ShapeType 'star8'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "STRIPED_RIGHT_ARROW",
          {
            title: `줄무늬가 있는 오른쪽 화살표 도형 ECMA-376 ST_ShapeType 'stripedRight화살표'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "SUN",
          { title: `태양 모양 ECMA-376 ST_ShapeType 'sun'에 해당합니다.` }
        >
      | tags.Constant<
          "TRAPEZOID",
          {
            title: `사다리꼴 모양 ECMA-376 ST_ShapeType 'trapezoid'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "TRIANGLE",
          {
            title: `삼각형 모양 ECMA-376 ST_ShapeType 'triangle'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "UP_ARROW",
          {
            title: `위쪽 화살표 모양 ECMA-376 ST_ShapeType 'up화살표'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "UP_ARROW_CALLOUT",
          {
            title: `설명선 위쪽 화살표 모양 ECMA-376 ST_ShapeType 'up화살표콜아웃'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "UP_DOWN_ARROW",
          {
            title: `위쪽 화살표 모양 ECMA-376 ST_ShapeType 'upDown화살표'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "UTURN_ARROW",
          {
            title: `U자형 화살표 도형 ECMA-376 ST_ShapeType 'uturn화살표'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "VERTICAL_SCROLL",
          {
            title: `세로 스크롤 도형 ECMA-376 ST_ShapeType 'verticalScroll'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "WAVE",
          { title: `물결 모양. ECMA-376 ST_ShapeType 'wave'에 해당합니다.` }
        >
      | tags.Constant<
          "WEDGE_ELLIPSE_CALLOUT",
          {
            title: `콜아웃 웨지 타원형 도형 ECMA-376 ST_ShapeType 'wedgeEllipse콜아웃'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "WEDGE_RECTANGLE_CALLOUT",
          {
            title: `콜아웃 웨지 직사각형 도형 ECMA-376 ST_ShapeType 'wedgeRect콜아웃'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "WEDGE_ROUND_RECTANGLE_CALLOUT",
          {
            title: `콜아웃 웨지 둥근 직사각형 도형 ECMA-376 ST_ShapeType 'wedgeRoundRect콜아웃'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "FLOW_CHART_ALTERNATE_PROCESS",
          {
            title: `대체 프로세스 흐름 형태 ECMA-376 ST_ShapeType 'flowChartAlternateProcess'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "FLOW_CHART_COLLATE",
          {
            title: `흐름 형태 대조 ECMA-376 ST_ShapeType 'flowChartCollate'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "FLOW_CHART_CONNECTOR",
          {
            title: `커넥터 흐름 모양 ECMA-376 ST_ShapeType 'flowChartConnector'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "FLOW_CHART_DECISION",
          {
            title: `결정 흐름 형태 ECMA-376 ST_ShapeType 'flowChartDecision'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "FLOW_CHART_DELAY",
          {
            title: `지연 흐름 모양 ECMA-376 ST_ShapeType 'flowChartDelay'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "FLOW_CHART_DISPLAY",
          {
            title: `흐름 모양을 표시합니다. ECMA-376 ST_ShapeType 'flowChartDisplay'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "FLOW_CHART_DOCUMENT",
          {
            title: `문서 흐름 도형 ECMA-376 ST_ShapeType 'flowChartDocument'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "FLOW_CHART_EXTRACT",
          {
            title: `흐름 형태를 추출합니다. ECMA-376 ST_ShapeType 'flowChartExtract'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "FLOW_CHART_INPUT_OUTPUT",
          {
            title: `입력 출력 흐름 모양. ECMA-376 ST_ShapeType 'flowChartInputOutput'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "FLOW_CHART_INTERNAL_STORAGE",
          {
            title: `내부 저장소 흐름 형태 ECMA-376 ST_ShapeType 'flowChartInternalStorage'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "FLOW_CHART_MAGNETIC_DISK",
          {
            title: `자기 디스크 흐름 형태 ECMA-376 ST_ShapeType 'flowChartMagneticDisk'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "FLOW_CHART_MAGNETIC_DRUM",
          {
            title: `자기 드럼 흐름 모양. ECMA-376 ST_ShapeType 'flowChartMagneticDrum'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "FLOW_CHART_MAGNETIC_TAPE",
          {
            title: `자기 테이프 흐름 모양 ECMA-376 ST_ShapeType 'flowChartMagneticTape'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "FLOW_CHART_MANUAL_INPUT",
          {
            title: `수동 입력 흐름 형태 ECMA-376 ST_ShapeType 'flowChartManualInput'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "FLOW_CHART_MANUAL_OPERATION",
          {
            title: `수동 작업 흐름 형태 ECMA-376 ST_ShapeType 'flowChartManualOperation'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "FLOW_CHART_MERGE",
          {
            title: `병합 흐름 도형 ECMA-376 ST_ShapeType 'flowChartMerge'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "FLOW_CHART_MULTIDOCUMENT",
          {
            title: `다중 문서 흐름 도형 ECMA-376 ST_ShapeType 'flowChartMultidocument'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "FLOW_CHART_OFFLINE_STORAGE",
          {
            title: `오프라인 스토리지 흐름 형태 ECMA-376 ST_ShapeType 'flowChartOfflineStorage'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "FLOW_CHART_OFFPAGE_CONNECTOR",
          {
            title: `페이지 외부 커넥터 흐름 모양 ECMA-376 ST_ShapeType 'flowChartOffpageConnector'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "FLOW_CHART_ONLINE_STORAGE",
          {
            title: `온라인 스토리지 흐름 형태 ECMA-376 ST_ShapeType 'flowChartOnlineStorage'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "FLOW_CHART_OR",
          {
            title: `유동적인 형태입니다. ECMA-376 ST_ShapeType 'flowChartOr'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "FLOW_CHART_PREDEFINED_PROCESS",
          {
            title: `사전 정의된 프로세스 흐름 모양 ECMA-376 ST_ShapeType 'flowChartPreProcess'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "FLOW_CHART_PREPARATION",
          {
            title: `준비 흐름 모양 ECMA-376 ST_ShapeType 'flowChartPreparation'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "FLOW_CHART_PROCESS",
          {
            title: `프로세스 흐름 형태 ECMA-376 ST_ShapeType 'flowChartProcess'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "FLOW_CHART_PUNCHED_CARD",
          {
            title: `천공 카드 흐름 도형 ECMA-376 ST_ShapeType 'flowChartPunchedCard'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "FLOW_CHART_PUNCHED_TAPE",
          {
            title: `천공 테이프 흐름 모양 ECMA-376 ST_ShapeType 'flowChartPunchedTape'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "FLOW_CHART_SORT",
          {
            title: `흐름 모양 정렬 ECMA-376 ST_ShapeType 'flowChartSort'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "FLOW_CHART_SUMMING_JUNCTION",
          {
            title: `교차로 흐름의 형태 ECMA-376 ST_ShapeType 'flowChartSummingJunction'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "FLOW_CHART_TERMINATOR",
          {
            title: `종결자 흐름 형태입니다. ECMA-376 ST_ShapeType 'flowChartTerminator'에 해당합니다.`;
          }
        >
      | tags.Constant<"ARROW_EAST", { title: `동쪽 화살표 모양` }>
      | tags.Constant<"ARROW_NORTH_EAST", { title: `북동쪽 화살표 모양` }>
      | tags.Constant<"ARROW_NORTH", { title: `북쪽 화살표 모양` }>
      | tags.Constant<"SPEECH", { title: `음성 도형` }>
      | tags.Constant<"STARBURST", { title: `별 버스트 도형` }>
      | tags.Constant<
          "TEARDROP",
          {
            title: `눈물방울 모양 ECMA-376 ST_ShapeType 'teardrop'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "ELLIPSE_RIBBON",
          {
            title: `타원형 리본 모양 ECMA-376 ST_ShapeType 'ellipseRibbon'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "ELLIPSE_RIBBON_2",
          {
            title: `타원형 리본 2 도형 ECMA-376 ST_ShapeType 'ellipseRibbon2'에 해당합니다.`;
          }
        >
      | tags.Constant<
          "CLOUD_CALLOUT",
          {
            title: `콜아웃 구름 모양 ECMA-376 ST_ShapeType 'cloud콜아웃'에 해당합니다.`;
          }
        >
      | tags.Constant<"CUSTOM", { title: `맞춤 도형` }>;
  }

  /**
   * @title 이미지.
   *
   * 이미지를 나타내는 `PageElement` 종류.
   */
  export interface Image {
    /**
     * @title 기본 수명이 30분인 이미지의 URL.
     *
     * 이 URL에는 요청자의 계정으로 태그가 지정됩니다.
     *
     * URL이 있는 사람은 누구나 원래 요청자로서 이미지에 효과적으로 액세스합니다.
     *
     * 프레젠테이션의 공유 설정이 변경되면 이미지에 액세스할 수 없게 됩니다.
     */
    contentUrl?: string | null;

    /**
     * @title 이미지의 속성.
     */
    imageProperties: ImageProperties;

    /**
     * @title 소스 URL은 이미지를 삽입하는 데 사용되는 URL입니다.
     *
     * 소스 URL은 비워 둘 수 있습니다.
     */
    sourceUrl?: string | null;

    /**
     * @title 레이아웃과 마스터의 해당 자리표시자에서 상속되는 페이지 요소.
     *
     * 설정된 경우 이미지는 자리표시자 이미지입니다.
     *
     * 상속된 모든 속성은 Placeholder.parent_object_id 필드로 식별된 상위 자리표시자를 확인하여 확인할 수 있습니다.
     */
    placeholder?: Placeholder;
  }

  /**
   * @title 이미지의 속성.
   */
  export interface ImageProperties {
    /**
     * @title 이미지의 자르기 속성입니다.
     *
     * 설정하지 않으면 이미지가 잘리지 않습니다.
     */
    readonly cropProperties?: CropProperties;

    /**
     * @title 이미지의 투명도 효과입니다.
     *
     * 여기서 0은 효과 없음, 1은 완전히 투명함을 의미합니다.
     */
    readonly transparency?: (number & tags.Minimum<0> & tags.Maximum<1>) | null;

    /**
     * @title 이미지의 밝기 효과입니다.
     *
     * 0은 효과가 없음을 의미합니다.
     */
    readonly brightness?: (number & tags.Minimum<-1> & tags.Maximum<1>) | null;

    /**
     * @title 이미지의 대비 효과.
     */
    readonly contrast?: (number & tags.Minimum<-1> & tags.Maximum<1>) | null;

    /**
     * @title 이미지의 윤곽선.
     *
     * 설정하지 않으면 이미지에 윤곽선이 없다.
     */
    readonly recolor?: Recolor;

    /**
     * @title 이미지의 윤곽선.
     *
     * 설정하지 않으면 이미지에 그림자가 없다.
     */
    readonly outline?: Outline;

    /**
     * @title 이미지의 그림자입니다.
     */
    readonly shadow?: Shadow;

    /**
     * @title 이미지의 하이퍼 링크 대상.
     *
     * 설정하지 않으면 링크가 표시되지 않는다.
     */
    link?: Link;
  }

  export interface CropProperties {
    /**
     * 오프셋은 객체의 원래 너비를 기준으로 원본 경계 직사각형의 왼쪽 가장자리에 있는 자르기 사각형의 왼쪽 가장자리를 지정합니다.
     */
    leftOffset?: number | null;

    /**
     * 오프셋은 객체의 원래 너비를 기준으로 원본 경계 직사각형의 오른쪽 가장자리 왼쪽에 있는 자르기 사각형의 오른쪽 가장자리를 지정합니다.
     */
    rightOffset?: number | null;

    /**
     * 오프셋은 객체의 원래 높이를 기준으로 원래 경계 직사각형의 상단 가장자리 아래에 있는 자르기 사각형의 상단 가장자리를 지정합니다.
     */
    topOffset?: number | null;

    /**
     * 오프셋은 객체의 원래 높이를 기준으로 원래의 경계 직사각형 하단 가장자리 위에 위치한 자르기 사각형의 하단 가장자리를 지정합니다.
     */
    bottomOffset?: number | null;

    /**
     * 중앙을 기준으로 자르기 창의 회전 각도(라디안)입니다. 회전 각도는 오프셋 후에 적용됩니다.
     */
    angle?: number | null;
  }

  /**
   * @title 색상 재지정.
   *
   * 이미지에 적용된 색상 재지정 효과.
   */
  export interface Recolor {
    /**
     * @title 재색상 효과
     *
     * 색상 중지 목록인 그라데이션으로 표현된다.
     */
    recolorStops?: ColorStop[];

    /**
     * @title 색상 변경 효과의 이름.
     */
    readonly name?: Name | null;
  }

  /**
   * @title 색상 효과 이름.
   */
  export type Name =
    | tags.Constant<
        "NONE",
        { title: "색상 재지정 효과가 없습니다. 기본값입니다." }
      >
    | tags.Constant<
        "LIGHT1",
        {
          title: "페이지의 색 구성표에서 사용 가능한 첫 번째 색상을 사용하여 이미지를 밝게 하는 재색상 효과입니다.";
        }
      >
    | tags.Constant<
        "LIGHT2",
        {
          title: "페이지에서 사용할 수 있는 두 번째 색상을 색 구성표를 사용하여 밝게 하는 재지정 색상 효과입니다.";
        }
      >
    | tags.Constant<
        "LIGHT3",
        {
          title: "페이지에서 사용할 수 있는 세 번째 색상을 색 구성표를 사용하여 밝게 하는 재지정 색상 효과입니다.";
        }
      >
    | tags.Constant<
        "LIGHT4",
        {
          title: "페이지의 색 구성표에서 사용 가능한 색상을 사용하여 이미지를 밝게 하는 재색상 효과입니다.";
        }
      >
    | tags.Constant<
        "LIGHT5",
        {
          title: "페이지에서 사용할 수 있는 5번째 색상을 해당하는 색 구성표로 밝게 만드는 재색상 효과입니다.";
        }
      >
    | tags.Constant<
        "LIGHT6",
        {
          title: "페이지의 색 구성표에서 사용 가능한 여섯 번째 색상을 사용하여 이미지를 밝게 하는 재색상 효과입니다.";
        }
      >
    | tags.Constant<
        "LIGHT7",
        {
          title: "페이지의 색 구성표에서 사용 가능한 일곱 번째 색상을 사용하여 이미지를 밝게 하는 재색상 효과입니다.";
        }
      >
    | tags.Constant<
        "LIGHT8",
        {
          title: "페이지에서 8번째 사용 가능한 색상을 사용해 이미지를 밝게 하는 재색상 효과입니다.";
        }
      >
    | tags.Constant<
        "LIGHT9",
        {
          title: "페이지의 9번째 사용 가능한 색상을 사용하여 이미지의 밝기를 높일 수 있는 재색상 효과입니다.";
        }
      >
    | tags.Constant<
        "LIGHT10",
        {
          title: "페이지의 색 구성표에서 사용 가능한 10의 색상을 사용하여 이미지를 밝게 하는 재색상 효과입니다.";
        }
      >
    | tags.Constant<
        "DARK1",
        {
          title: "페이지의 색 구성표에서 사용 가능한 첫 번째 색상을 사용하여 이미지를 어둡게 하는 재지정 색상 효과입니다.";
        }
      >
    | tags.Constant<
        "DARK2",
        {
          title: "페이지의 두 번째 색상 색상을 사용하여 이미지를 어둡게 하는 재색상 효과입니다.";
        }
      >
    | tags.Constant<
        "DARK3",
        {
          title: "페이지에서 사용할 수 있는 세 번째 색상을 색 구성표를 사용하여 어둡게 하는 재색상 효과입니다.";
        }
      >
    | tags.Constant<
        "DARK4",
        {
          title: "페이지의 네 번째 색 구성표에서 사용 가능한 색상을 사용하여 이미지를 어둡게 하는 재색상 효과입니다.";
        }
      >
    | tags.Constant<
        "DARK5",
        {
          title: "페이지의 5번째 사용 가능한 색상을 사용하여 이미지를 어둡게 하는 재색상 효과입니다.";
        }
      >
    | tags.Constant<
        "DARK6",
        {
          title: "페이지에서 사용할 수 있는 6번째 색 구성표 색상을 사용해 이미지를 어둡게 하는 색 재조정 효과입니다.";
        }
      >
    | tags.Constant<
        "DARK7",
        {
          title: "페이지의 색 구성표에서 사용 가능한 7번째 색상을 사용하여 이미지를 어둡게 하는 재색상 효과입니다.";
        }
      >
    | tags.Constant<
        "DARK8",
        {
          title: "페이지의 색 구성표에서 사용 가능한 8번째 색상을 사용하여 이미지를 어둡게 하는 재색상 효과입니다.";
        }
      >
    | tags.Constant<
        "DARK9",
        {
          title: "페이지의 9번째 사용 가능한 색상을 사용하여 이미지를 어둡게 하는 재색상 효과입니다.";
        }
      >
    | tags.Constant<
        "DARK10",
        {
          title: "색 구성표에서 사용 가능한 10의 색상을 사용하여 이미지를 어둡게 하는 재색상 효과입니다.";
        }
      >
    | tags.Constant<
        "GRAYSCALE",
        { title: "이미지 색상을 그레이 스케일로 변경하는 재색상 색상 효과." }
      >
    | tags.Constant<
        "NEGATIVE",
        { title: "이미지를 음영 그레이 스케일로 다시 칠하는 색상 재지정 효과." }
      >
    | tags.Constant<
        "SEPIA",
        {
          title: "세피아 색상을 사용하여 이미지 색상을 변경하는 재색상 효과입니다.";
        }
      >
    | tags.Constant<
        "CUSTOM",
        { title: "맞춤 색상 효과. 구체적인 경사는 recolorStops를 참고하세요." }
      >;

  export interface ColorStop {
    /**
     * @title 그라데이션 색상의 색상.
     */
    color?: OpaqueColor;

    /**
     * @title 그래디언트 밴드에서 이 색상의 알파 값입니다.
     *
     * 기본값은 1.0이며 완전 불투명입니다.
     */
    alpha?:
      | (number &
          tags.Type<"int32"> &
          tags.Maximum<1> &
          tags.Minimum<0> &
          tags.Default<0>)
      | null;

    /**
     * 백분율로 측정된 그래디언트 밴드 내 색상 중지 지점의 상대 위치입니다. 이 값은 [0.0, 1.0] 간격으로 입력해야 합니다.
     */
    position?: number | null;
  }

  // export interface Video {}

  /**
   * @title 커넥터가 아닌 선, 직선 커넥터, 구부러진 커넥터, 구부러진 커넥터 등을 나타내는 PageElement 종류입니다.
   */
  export interface Line {
    /**
     * @title 선의 속성입니다.
     */
    lineProperties?: LineProperties;

    /**
     * @title 선의 유형.
     */
    lineType?: LineType | null;

    /**
     * @title 선의 카테고리.
     */
    lineCategory?: LineCategory | null;
  }

  export type LineCategory =
    | tags.Constant<
        `LINE_CATEGORY_UNSPECIFIED`,
        { title: `지정되지 않은 선 카테고리입니다.` }
      >
    | tags.Constant<`STRAIGHT`, { title: `직선 커넥터(직선 커넥터 1 포함)` }>
    | tags.Constant<
        `BENT`,
        { title: `구부러진 커넥터(2-5 구부러진 커넥터 포함)` }
      >
    | tags.Constant<
        `CURVED`,
        { title: `곡선 커넥터 2~5를 포함한 곡선 커넥터` }
      >;

  export type LineType =
    | tags.Constant<
        `TYPE_UNSPECIFIED`,
        { title: `지정되지 않은 선 유형입니다.` }
      >
    | tags.Constant<
        `STRAIGHT_CONNECTOR_1`,
        {
          title: `직선 커넥터 1 양식 ECMA-376 ST_ShapeType 'straightConnector1'에 해당합니다.`;
        }
      >
    | tags.Constant<
        `BENT_CONNECTOR_2`,
        {
          title: `커넥터 2 양식 구부러짐 ECMA-376 ST_ShapeType 'bentConnector2'에 해당합니다.`;
        }
      >
    | tags.Constant<
        `BENT_CONNECTOR_3`,
        {
          title: `커넥터 3이 구부러짐 ECMA-376 ST_ShapeType 'bentConnector3'에 해당합니다.`;
        }
      >
    | tags.Constant<
        `BENT_CONNECTOR_4`,
        {
          title: `커넥터 4 양식 구부러짐 ECMA-376 ST_ShapeType 'bentConnector4'에 해당합니다.`;
        }
      >
    | tags.Constant<
        `BENT_CONNECTOR_5`,
        {
          title: `커넥터 5 양식 굽힘 ECMA-376 ST_ShapeType 'bentConnector5'에 해당합니다.`;
        }
      >
    | tags.Constant<
        `CURVED_CONNECTOR_2`,
        {
          title: `곡선 커넥터 2 양식 ECMA-376 ST_ShapeType 'curvedConnector2'에 해당합니다.`;
        }
      >
    | tags.Constant<
        `CURVED_CONNECTOR_3`,
        {
          title: `구부러진 커넥터 3 양식 ECMA-376 ST_ShapeType 'curvedConnector3'에 해당합니다.`;
        }
      >
    | tags.Constant<
        `CURVED_CONNECTOR_4`,
        {
          title: `구부러진 커넥터 4 양식 ECMA-376 ST_ShapeType 'curvedConnector4'에 해당합니다.`;
        }
      >
    | tags.Constant<
        `CURVED_CONNECTOR_5`,
        {
          title: `구부러진 커넥터 5 양식 ECMA-376 ST_ShapeType 'curvedConnector5'에 해당합니다.`;
        }
      >
    | tags.Constant<
        `STRAIGHT_LINE`,
        {
          title: `직선 ECMA-376 ST_ShapeType 'line'에 해당합니다. 이 선 유형은 커넥터가 아닙니다.`;
        }
      >;

  export interface LineProperties {
    /**
     * @title 선의 채우기
     */
    lineFill?: LineFill;

    /**
     * @title 선의 두께
     */
    weight?: Dimension;

    /**
     * @title 선의 파선 스타일
     */
    dashStyle?: DashStyle | null;

    /**
     * @title 선의 시작 부분에 있는 화살표 스타일
     */
    startArrow?: ArrowStyle | null;

    /**
     * @title 선의 끝에 있는 화살표 스타일
     */
    endArrow?: ArrowStyle | null;

    /**
     * @title 선의 하이퍼 링크 대상.
     */
    link?: Link;

    /**
     * @title 줄의 시작 부분에 있는 연결.
     *
     * 커넥터 타입에만 존재.
     */
    startConnection?: LineConnection;

    /**
     * @title 줄의 끝 부분에 있는 연결.
     *
     * 커넥터 타입에만 존재.
     */
    endConnection?: LineConnection;
  }

  export interface LineConnection {
    /**
     * @title 연결된 페이지 요소의 객체 ID입니다.
     */
    connectedObjectId?: string | null;

    /**
     * @title 연결된 페이지 요소에 있는 연결 사이트의 색인입니다.
     */
    connectionSiteIndex?: (number & tags.Type<"int64">) | null;
  }

  export type ArrowStyle =
    | tags.Constant<
        `ARROW_STYLE_UNSPECIFIED`,
        { title: `지정되지 않은 화살표 스타일` }
      >
    | tags.Constant<`NONE`, { title: `화살표가 없습니다.` }>
    | tags.Constant<
        `STEALTH_ARROW`,
        {
          title: `뒤로 노치가 있는 화살표 ECMA-376 ST_LineEndType 값 'stealth'에 해당합니다.`;
        }
      >
    | tags.Constant<
        `FILL_ARROW`,
        {
          title: `채워진 화살표 ECMA-376 ST_LineEndType 값 'triangle'에 해당합니다.`;
        }
      >
    | tags.Constant<
        `FILL_CIRCLE`,
        { title: `채워진 원 ECMA-376 ST_LineEndType 값 'oval'에 해당합니다.` }
      >
    | tags.Constant<`FILL_SQUARE`, { title: `채워진 정사각형입니다.` }>
    | tags.Constant<
        `FILL_DIAMOND`,
        {
          title: `다이아몬드가 채워졌습니다. ECMA-376 ST_LineEndType 값 'diamond'에 해당합니다.`;
        }
      >
    | tags.Constant<`OPEN_ARROW`, { title: `흰색 화살표` }>
    | tags.Constant<`OPEN_CIRCLE`, { title: `흰색 원` }>
    | tags.Constant<`OPEN_SQUARE`, { title: `흰색 정사각형` }>
    | tags.Constant<`OPEN_DIAMOND`, { title: `흰색 다이아몬드입니다.` }>;

  export type DashStyle =
    | tags.Constant<
        "DASH_STYLE_UNSPECIFIED",
        { title: `지정되지 않은 대시 스타일` }
      >
    | tags.Constant<
        "SOLID",
        {
          title: `실선 ECMA-376 ST_PresetLineDashVal 값 'solid'에 해당합니다. 기본 대시 스타일입니다.`;
        }
      >
    | tags.Constant<
        "DOT",
        { title: `점선 ECMA-376 ST_PresetLineDashVal 값 'dot'에 해당합니다.` }
      >
    | tags.Constant<
        "DASH",
        {
          title: `파선입니다. ECMA-376 ST_PresetLineDashVal 값 'dash'에 해당합니다.`;
        }
      >
    | tags.Constant<
        "DASH_DOT",
        {
          title: `교점 및 대시를 사용합니다. ECMA-376 ST_PresetLineDashVal 값 'dashDot'에 해당합니다.`;
        }
      >
    | tags.Constant<
        "LONG_DASH",
        {
          title: `큰 대시가 있는 선 ECMA-376 ST_PresetLineDashVal 값 'lgDash'에 해당합니다.`;
        }
      >
    | tags.Constant<
        "LONG_DASH_DOT",
        {
          title: `큰 대시와 점을 번갈아 사용합니다. ECMA-376 ST_PresetLineDashVal 값 'lgDashDot'에 해당합니다.`;
        }
      >;

  export interface LineFill {
    /**
     * @title 단색 채우기.
     *
     * 기본 선 채우기는 Slides 편집기에서 만든 새 줄의 기본값과 일치합니다.
     */
    solidFill?: SolidFill;
  }

  // export interface Table {}

  // export interface WordArt {}

  /**
   * @title 페이지 요소의 변환.
   */
  export interface Transform {
    /**
     * @title X 좌표 배율 요소.
     */
    scaleX?: number | null;

    /**
     * @title Y 좌표 배율 요소.
     */
    scaleY?: number | null;

    /**
     * @title X 좌표 기울기 요소.
     */
    shearX?: number | null;

    /**
     * @title Y 좌표 기울기 요소.
     */
    shearY?: number | null;

    /**
     * @title X 좌표 변환 요소.
     */
    translateX?: number | null;

    /**
     * @title Y 좌표 변환 요소.
     */
    translateY?: number | null;

    /**
     * @title 변환 요소의 단위.
     */
    unit?: Unit | null;
  }
}
