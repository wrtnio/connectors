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
    error?: string;

    /**
     * @title 요청성공시 성공메시지전달 (성공시에만 전달)
     */
    successMsg?: string;
  }

  export interface IGetcorpOutput extends IInnoforest.ICommonResponse {
    /**
     * @title data
     */
    data: any;
  }

  export interface IGetcorpInput {
    /**
     * @title corpUniqNum
     */
    corpUniqNum: string;
  }

  export interface IGetcorpfinanceOutput extends IInnoforest.ICommonResponse {
    /**
     * @title data
     */
    data: any;
  }

  export interface IGetcorpfinanceInput {
    /**
     * @title corpUniqNum
     */
    corpUniqNum: string;
  }

  export interface IGetcorpinvestOutput extends IInnoforest.ICommonResponse {
    /**
     * @title data
     */
    data: any;
  }

  export interface IGetcorpinvestInput {
    /**
     * @title corpUniqNum
     */
    corpUniqNum: string;
  }

  export interface IGetcorpcommonOutput extends IInnoforest.ICommonResponse {
    /**
     * @title data
     */
    data: any;
  }

  export interface IGetcorpcommonInput {
    /**
     * @title corpUniqNum
     */
    corpUniqNum: string;
  }

  export interface IFindproductOutput extends IInnoforest.ICommonResponse {
    /**
     * @title data
     */
    data: any;
  }

  export interface IFindproductInput {
    /**
     * @title corpUniqNum
     */
    corpUniqNum: string;
  }

  export interface IFindtrafficOutput extends IInnoforest.ICommonResponse {
    /**
     * @title data
     */
    data: any;
  }

  export interface IFindtrafficInput {
    /**
     * @title corpUniqNum
     */
    corpUniqNum: string;
  }

  export interface IFindsalesOutput extends IInnoforest.ICommonResponse {
    /**
     * @title data
     */
    data: any;
  }

  export interface IFindsalesInput {
    /**
     * @title corpUniqNum
     */
    corpUniqNum: string;
  }

  export interface IFindsalesrebuyOutput extends IInnoforest.ICommonResponse {
    /**
     * @title data
     */
    data: any;
  }

  export interface IFindsalesrebuyInput {
    /**
     * @title corpUniqNum
     */
    corpUniqNum: string;
  }

  export interface IFindsalesavgbuyOutput extends IInnoforest.ICommonResponse {
    /**
     * @title data
     */
    data: any;
  }

  export interface IFindsalesavgbuyInput {
    /**
     * @title corpUniqNum
     */
    corpUniqNum: string;
  }

  export interface IFindsalespersonOutput extends IInnoforest.ICommonResponse {
    /**
     * @title data
     */
    data: any;
  }

  export interface IFindsalespersonInput {
    /**
     * @title corpUniqNum
     */
    corpUniqNum: string;
  }

  export interface IFindsaleshouseholdOutput
    extends IInnoforest.ICommonResponse {
    /**
     * @title data
     */
    data: any;
  }

  export interface IFindsaleshouseholdInput {
    /**
     * @title corpUniqNum
     */
    corpUniqNum: string;
  }

  export interface IFindsalesincomeOutput extends IInnoforest.ICommonResponse {
    /**
     * @title data
     */
    data: any;
  }

  export interface IFindsalesincomeInput {
    /**
     * @title corpUniqNum
     */
    corpUniqNum: string;
  }

  export interface IFindinvestOutput extends IInnoforest.ICommonResponse {
    /**
     * @title data
     */
    data: any;
  }

  export interface IFindinvestInput {
    /**
     * @title corpUniqNum
     */
    corpUniqNum: string;
  }

  export interface IFindpatentOutput extends IInnoforest.ICommonResponse {
    /**
     * @title data
     */
    data: any;
  }

  export interface IFindpatentInput {
    /**
     * @title corpUniqNum
     */
    corpUniqNum: string;
  }

  export interface IFindpatentwordOutput extends IInnoforest.ICommonResponse {
    /**
     * @title data
     */
    data: any;
  }

  export interface IFindpatentwordInput {
    /**
     * @title corpUniqNum
     */
    corpUniqNum: string;
  }

  export interface IFindfinanceOutput extends IInnoforest.ICommonResponse {
    /**
     * @title data
     */
    data: any;
  }

  export interface IFindfinanceInput {
    /**
     * @title corpUniqNum
     */
    corpUniqNum: string;
  }

  export interface IFindemployeeOutput extends IInnoforest.ICommonResponse {
    /**
     * @title data
     */
    data: any;
  }

  export interface IFindemployeeInput {
    /**
     * @title corpUniqNum
     */
    corpUniqNum: string;
  }

  export interface IFindpressOutput extends IInnoforest.ICommonResponse {
    /**
     * @title data
     */
    data: any;
  }

  export interface IFindpressInput {
    /**
     * @title corpUniqNum
     */
    corpUniqNum: string;
  }
}
