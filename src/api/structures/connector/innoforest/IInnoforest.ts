import { tags } from "typia";

export namespace IInnoforest {
  export interface ICommonResponse {
    /**
     * @title 조회된 갯수 카운트
     */
    dataCount: number & tags.Type<"uint64">;

    /**
     * @title 성공여부
     */
    success: boolean;

    /**
     * @title 에러발생시 에러메시지전달 (에러시에만 전달)
     */
    error: string;

    /**
     * @title 요청성공시 성공메시지전달 (성공시에만 전달)
     */
    successMsg: string;
  }

  export interface GetcorpInput {}

  export interface GetcorpfinanceInput {}

  export interface GetcorpinvestInput {}

  export interface GetcorpcommonInput {}

  export interface FindproductInput {}

  export interface FindtrafficInput {}

  export interface FindsalesInput {}

  export interface FindsalesrebuyInput {}

  export interface FindsalesavgbuyInput {}

  export interface FindsalespersonInput {}

  export interface FindsaleshouseholdInput {}

  export interface FindsalesincomeInput {}

  export interface FindinvestInput {}

  export interface FindpatentInput {}

  export interface FindpatentwordInput {}

  export interface FindfinanceInput {}

  export interface FindemployeeInput {}

  export interface FindpressInput {}
}
