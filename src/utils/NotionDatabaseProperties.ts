import { INotion } from "@wrtn/connector-api/lib/structures/connector/notion/INotion";

export namespace NotionDatabaseProperties {
  export function createTitleProperty(name: string): INotion.IDatabaseProperty {
    return {
      name,
      type: "title",
      title: {},
    };
  }

  export function createRichTextProperty(
    name: string,
  ): INotion.IDatabaseProperty {
    return {
      name,
      type: "rich_text",
      rich_text: {},
    };
  }

  export function createSelectProperty(
    name: string,
    options: { name: string; color: string }[],
  ): INotion.IDatabaseProperty {
    return {
      name,
      type: "select",
      select: { options },
    };
  }

  export function createMultiSelectProperty(
    name: string,
    options: { name: string; color: string }[],
  ): INotion.IDatabaseProperty {
    return {
      name,
      type: "multi_select",
      multi_select: { options },
    };
  }

  /**
   * 숫자 프로퍼티 생성
   */
  export function createNumberProperty(
    name: string,
    format?: string,
  ): INotion.IDatabaseProperty {
    return {
      name,
      type: "number",
      number: {
        format: format || "number", // 기본 형식은 'number'
      },
    };
  }

  /**
   * 날짜 프로퍼티 생성
   */
  export function createDateProperty(
    name: string,
    dateOptions?: {
      start?: string;
      end?: string;
      time_zone?: string;
    },
  ): INotion.IDatabaseProperty {
    return {
      name,
      type: "date",
      date: {
        start: dateOptions?.start,
        end: dateOptions?.end,
        time_zone: dateOptions?.time_zone,
      },
    };
  }

  /**
   * 사람 프로퍼티 생성
   */
  export function createPeopleProperty(
    name: string,
  ): INotion.IDatabaseProperty {
    return {
      name,
      type: "people",
      people: {},
    };
  }

  /**
   * 파일 프로퍼티 생성
   */
  export function createFilesProperty(name: string): INotion.IDatabaseProperty {
    return {
      name,
      type: "files",
      files: {},
    };
  }

  /**
   * 체크박스 프로퍼티 생성
   */
  export function createCheckboxProperty(
    name: string,
  ): INotion.IDatabaseProperty {
    return {
      name,
      type: "checkbox",
      checkbox: {},
    };
  }

  /**
   * URL 프로퍼티 생성
   */
  export function createUrlProperty(name: string): INotion.IDatabaseProperty {
    return {
      name,
      type: "url",
      url: {},
    };
  }

  /**
   * 이메일 프로퍼티 생성
   */
  export function createEmailProperty(name: string): INotion.IDatabaseProperty {
    return {
      name,
      type: "email",
      email: {},
    };
  }

  /**
   * 전화번호 프로퍼티 생성
   */
  export function createPhoneNumberProperty(
    name: string,
  ): INotion.IDatabaseProperty {
    return {
      name,
      type: "phone_number",
      phone_number: {},
    };
  }

  /**
   * 관계(Relation) 프로퍼티 생성
   * @param name 프로퍼티 이름
   * @param databaseId 관계를 맺을 다른 데이터베이스의 ID
   */
  export function createRelationProperty(
    name: string,
    databaseId: string,
  ): INotion.IDatabaseProperty {
    return {
      name,
      type: "relation",
      relation: {
        database_id: databaseId,
      },
    };
  }

  /**
   * 롤업(Rollup) 프로퍼티 생성
   * @param name 프로퍼티 이름
   * @param relationPropertyName 관계 프로퍼티 이름
   * @param rollupFunction 롤업 함수 (예: 'count', 'sum', 등)
   */
  export function createRollupProperty(
    name: string,
    relationPropertyName: string,
    rollupFunction: string,
  ): INotion.IDatabaseProperty {
    return {
      name,
      type: "rollup",
      rollup: {
        relation_property: relationPropertyName,
        function: rollupFunction,
        // optional: 'rollup_property_name' 등 추가 설정 가능
      },
    };
  }

  /**
   * 포뮬러(Formula) 프로퍼티 생성
   * @param name 프로퍼티 이름
   * @param expression 포뮬러 표현식 (예: "prop('Name') + ' - ' + prop('Status')")
   */
  export function createFormulaProperty(
    name: string,
    expression: string,
  ): INotion.IDatabaseProperty {
    return {
      name,
      type: "formula",
      formula: {
        expression,
      },
    };
  }
}
