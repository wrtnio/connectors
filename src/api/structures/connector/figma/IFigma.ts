import {
  Comment,
  Component,
  ComponentSet,
  GetCommentsQueryParams,
  GetCommentsResponse,
  PostCommentRequestBody,
  PostCommentResponse,
  Style,
} from "@figma/rest-api-spec";
import { tags } from "typia";

import { ICommon } from "../common/ISecretValue";

export namespace IFigma {
  export type Secret = ICommon.ISecret<
    "figma",
    [
      "files:read",
      "file_variables:read",
      "file_variables:write",
      "file_comments:write",
      "file_dev_resources:read",
      "file_dev_resources:write",
      "library_analytics:read",
      "webhooks:write",
    ]
  >;

  /**
   * 피그마 특정 프레임으로부터 파일을 조회하는 DTO.
   *
   * 한 번에 하나의 프레임으로부터 파일을 읽을 수 있다.
   */
  export interface IReadFileInput extends IFigma.Secret {
    /**
     * 파일의 키를 의미합니다.
     *
     * 여기서의 파일 키는 피그마 프레임을 의미합니다.
     *
     * @title 피그마 각 파일 혹은 컴포넌트가 가지는 고유한 키 값.
     */
    fileKey: string;

    /**
     * 가져올 특정 버전 ID입니다. 이를 생략하면 파일의 현재 버전을 가져옵니다.
     *
     * @title 가져올 특정 버전의 ID.
     */
    version?: string;

    /**
     * 문서에서 관심 있는 노드들의 쉼표로 구분된 목록입니다. 지정된 경우에는 해당하는 노드, 그 자식들 및 루트 노드와 나열된 노드 사이의 모든 부분 집합만 반환됩니다.
     *
     * 참고: 원하는 노드의 조상 체인 외부에 포함된 다른 노드들이 반환된 JSON에 포함될 수 있습니다. 응답에는 또한 노드의 하위 트리에 있는 것들의 종속성도 포함될 수 있습니다. 예를 들어, 노드 하위 트리에 해당 파일의 다른 곳에 위치한 로컬 컴포넌트의 인스턴스가 포함되어 있는 경우 해당 컴포넌트와 해당 조상 체인도 포함됩니다.
     *
     * 역사적인 이유로 최상위 캔버스 노드는 항상 반환되며 `ids` 매개변수에 나열되어 있는지 여부에 관계없이 반환됩니다. 이러한 특이점은 향후 API 버전에서 제거될 수 있습니다.
     *
     * @title 문서에서 관심 있는 노드들의 쉼표로 구분된 목록.
     */
    ids?: string;

    /**
     * 문서 트리를 얼마나 깊이 탐색할지를 나타내는 양의 정수입니다. 예를 들어, 이를 1로 설정하면 페이지만 반환하고, 2로 설정하면 각 페이지의 페이지와 모든 최상위 개체를 반환합니다. 이 매개변수를 설정하지 않으면 모든 노드가 반환됩니다.
     *
     * @title 문서 트리를 얼마나 깊이 탐색할지를 나타내는 양의 정수.
     */
    depth?: number & tags.Type<"int64">;

    /**
     * 벡터 데이터를 내보낼 때 "paths"로 설정합니다.
     *
     * @title 내보낼 벡터 데이터.
     */
    geometry?: string;

    /**
     * 플러그인 ID 및/또는 문자열 "shared"의 쉼표로 구분된 목록입니다. 해당 플러그인이 작성한 문서에 있는 모든 데이터는 결과의 `pluginData` 및 `sharedPluginData` 속성에 포함됩니다.
     *
     * @title 플러그인 ID 및/또는 문자열 "shared"의 쉼표로 구분된 목록.
     */
    plugin_data?: string;

    /**
     * 요청한 파일에 대한 브랜치 메타데이터를 반환합니다. 파일이 브랜치이면 반환된 응답에는 메인 파일의 키도 포함됩니다. 파일에 브랜치가 있으면 해당 메타데이터도 반환됩니다. 기본값: false.
     *
     * @title 요청한 파일에 대한 브랜치 메타데이터를 반환할지 여부를 의미.
     */
    branch_data?: boolean & tags.Default<false>;
  }

  /**
   * 읽어온 피그마 파일의 정보에 해당하는 DTO.
   */
  export interface IReadFileOutput {
    /**
     * 에디터에서 파일의 이름입니다.
     *
     * @title 에디터에서 파일의 이름.
     */
    name: string;

    /**
     * 파일과 관련된 API 요청을 수행하는 사용자의 역할입니다.
     *
     * @title 요청을 수행하는 사용자의 역할.
     */
    role: "owner" | "editor" | "viewer";

    /**
     * 파일이 마지막으로 수정된 UTC ISO 8601 시간입니다.
     *
     * @title 파일이 마지막으로 수정된 시간.
     */
    lastModified: string & tags.Format<"date-time">;

    /**
     * 이 파일과 관련된 에디터의 유형입니다.
     *
     * @title 파일과 관련된 에디터의 유형.
     */
    editorType: "figma" | "figjam";

    /**
     * 파일의 섬네일 이미지에 대한 URL입니다.
     *
     * @title 섬네일 이미지.
     */
    thumbnailUrl?: string;

    /**
     * 파일의 버전 번호입니다. 파일이 수정될 때마다 이 번호가 증가하며 요청 간에 파일이 변경되었는지 확인하는 데 사용될 수 있습니다.
     *
     * @title 파일의 버전 번호.
     */
    version: string;

    /**
     * @todo 재귀 문제로 인해 일단 제거
     */
    // document: DocumentNode;

    /**
     * 컴포넌트 ID와 컴포넌트 메타데이터 간의 매핑입니다.
     *
     * @title 컴포넌트 ID와 컴포넌트 메타데이터 간의 매핑.
     */
    components: { [key: string]: Component };

    /**
     * 컴포넌트 세트 ID와 컴포넌트 세트 메타데이터 간의 매핑입니다.
     *
     * @title 컴포넌트 세트 ID와 컴포넌트 세트 메타데이터 간의 매핑.
     */
    componentSets: { [key: string]: ComponentSet };

    /**
     * 이 파일이 사용하는 파일 스키마의 버전입니다.
     *
     * @title 이 파일이 사용하는 파일 스키마의 버전.
     */
    schemaVersion: number;

    /**
     * 스타일 ID와 스타일 메타데이터 간의 매핑입니다.
     *
     * @title 스타일 ID와 스타일 메타데이터 간의 매핑.
     */
    styles: { [key: string]: Style };

    /**
     * 이 파일의 주 파일 키입니다. 존재하는 경우 이 파일은 컴포넌트 또는 컴포넌트 세트입니다.
     *
     * @title 이 파일의 주 파일 키.
     */
    mainFileKey?: string;

    /**
     * 이 파일의 브랜치 목록입니다.
     */
    branches?: {
      /**
       * 브랜치의 키입니다.
       */
      key: string;

      /**
       * 브랜치의 이름입니다.
       */
      name: string;

      /**
       * 브랜치의 섬네일 이미지에 대한 URL입니다.
       */
      thumbnail_url: string;

      /**
       * 브랜치가 마지막으로 수정된 UTC ISO 8601 시간입니다.
       */
      last_modified: string;
    }[];
  }

  /**
   * 특정 영역에 댓글을 추가하기 위한 DTO.
   *
   * 한 번의 하나의 댓글을 작성할 수 있으며, 좌표 값이나 노드, 또는 부모 댓글(root comment) 이용해 댓글을 작성할 수 있다.
   */
  export interface IAddCommentInput
    extends IFigma.Secret,
      PostCommentRequestBody {
    /**
     * 파일의 키를 의미합니다.
     *
     * @title 피그마 각 파일 혹은 컴포넌트가 가지는 고유한 키 값.
     */
    fileKey: string;
  }
  /*
   * 피그마 특정 프레임으로부터 댓글을 조회하는 DTO.
   *
   * 한 번에 하나의 프레임으로부터 댓글을 읽을 수 있다.
   */
  export interface IReadCommentInput
    extends IFigma.Secret,
      GetCommentsQueryParams {
    /**
     * 파일의 키를 의미합니다.
     *
     * @title 피그마 각 파일 혹은 컴포넌트가 가지는 고유한 키 값
     */
    fileKey: string;
  }

  /**
   * 방금 작성한 댓글의 정보에 해당하는 DTO.
   */
  export type IAddCommentOutput = PostCommentResponse;

  /*
   * 읽어온 피그마 댓글의 정보에 해당하는 DTO.
   */
  export type IReadCommentOutput = GetCommentsResponse;

  /**
   * @title 프로젝트 조회 조건
   */
  export interface IGetProjectInput extends IFigma.Secret {
    /**
     * @title 팀 아이디
     *
     * `https://www.figma.com/files/team` 링크 접속 시 `team` 키워드 뒤에 붙어 있는 문자열을 의미한다.
     *
     * 팀 아이디는 숫자 형식이며, 팀 안에 여러 개의 프로젝트들이 존재할 수 있다.
     */
    teamId: string;
  }

  export interface IGetProjectStatisticsInput
    extends IFigma.Secret,
      Pick<IFigma.IReadCommentInput, "as_md">,
      IFigma.IGetProjectInput {}

  export interface IGetProejctOutput {
    /**
     * @title 팀 이름
     */
    name: string;

    /**
     * @title 프로젝트 목록
     *
     * 팀에 속해있는 프로젝트들의 목록을 의미합니다.
     */
    projects: Array<Project>;
  }

  export interface Project {
    /**
     * @title 프로젝트 아이디
     */
    id: string;

    /**
     * @title 프로젝트 이름
     */
    name: string;
  }

  export interface IGetProjectFileOutput {
    /**
     * @title 프로젝트 이름
     */
    name: Project["name"];

    /**
     * 프로젝트에서 관리하고 있는 캔버스의 목록입니다.
     *
     * @title 캔버스 목록
     */
    files: Canvas[];
  }

  export interface Canvas {
    /**
     * 파일을 고유하게 식별할 수 있는 키입니다.
     * 여기서 말하는 파일은 프로젝트에서 관리하고 있는 캔버스들을 의미합니다.
     * 피그마에서는 캔버스를 포함한, 캔버스의 자식 컴포넌트 요소 모두 다 파일이라고 부르기 때문에 용어의 혼동에 주의해야 합니다.
     *
     * @title 캔버스 키
     */
    key: string;

    /**
     * 파일을 식별할 수 있도록 사용자가 붙여 놓은 이름을 의미합니다.
     * 여기서 말하는 파일은 프로젝트에서 관리하고 있는 캔버스들을 의미합니다.
     * 피그마에서는 캔버스를 포함한, 캔버스의 자식 컴포넌트 요소 모두 다 파일이라고 부르기 때문에 용어의 혼동에 주의해야 합니다.
     *
     * @title 캔버스 이름
     */
    name: string;

    /**
     * 섬네일 이미지로, 이 캔버스의 메인이 되는 화면을 스크린샷처럼 제공합니다.
     * 하지만, 이 섬네일을 링크로 저장해서 사용하려는 경우에는 이 이미지가 일정 시간동안만 제공되는 점에 주의해야 합니다.
     *
     * @title 섬네일
     */
    thumbnail_url: string &
      tags.Format<"uri"> &
      tags.ContentMediaType<"image/*">;

    /**
     * 해당 캔버스의 마지막 수정 시간을 의미한다.
     * 이를 기준으로 가장 최근에 변경점이 있거나 소통이 오가는 등 유지관리되는 캔버스를 구별할 수도 있을 것이다.
     * 다만, 이 값은 댓글이 추가되었다던가 캔버스에 변경점이 있는 게 아니면 알 수 없다.
     *
     * @title 마지막 수정 시간
     */
    last_modified: string & tags.Format<"date-time">;
  }

  export interface CanvasStatistics extends Canvas {
    /**
     * @title 캔버스 내 댓글 목록
     */
    comments: Comment[];

    /**
     * @title 캔버스 내 댓글에 대한 통계
     */
    statistics: {
      /**
       * @title 토론에 참여한 사람 명단
       */
      users: string[];

      /**
       * @title 각 사람 별 댓글 수
       */
      counts: Record<string, number>;
    };
  }

  export interface IGetStatisticsOutput extends Pick<Project, "id" | "name"> {
    /**
     * @title 프로젝트 내 캔버스 별 통계
     */
    canvasList: CanvasStatistics[];
  }
}
