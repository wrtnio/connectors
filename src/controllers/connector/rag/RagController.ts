import core from "@nestia/core";
import { Body, Controller, Post, Res } from "@nestjs/common";
import { Response } from "express";

import { IRag } from "@wrtn/connector-api/lib/structures/connector/rag/IRag";

import { RagProvider } from "../../../providers/connector/rag/RagProvider";
import { RouteIcon } from "@wrtnio/decorators";

@Controller("/connector/rag")
export class RagController {
  constructor(private readonly ragService: RagProvider) {}

  /**
   * 입력된 파일에 대해 RAG 분석을 요청합니다.
   *
   * 여러 개의 연구논문을 비교하는 챗봇을 제작할 때 사용될 수 있는 커넥터 입니다.
   *
   * @summary RAG 분석 요청.
   *
   * @param input 분석할 파일 정보.
   *
   * @tag RAG
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/RAG_full.svg",
  )
  @core.TypedRoute.Post("/analyze")
  async analyze(
    @core.TypedBody() input: IRag.IAnalyzeInput[],
  ): Promise<IRag.IAnalysisOutput> {
    return await this.ragService.analyze(input);
  }

  /**
   * 분석 진행 상태를 조회합니다.
   *
   * @summary RAG 분석 상태 조회.
   *
   * @param docId 분석 진행 상태를 조회할 문서 ID.
   *
   * @tag RAG
   *
   * @internal
   */
  @core.TypedRoute.Get("/:jobId/status")
  async getStatus(
    @core.TypedParam("jobId") jobId: string,
  ): Promise<IRag.IStatusOutput> {
    return await this.ragService.getStatus(jobId);
  }

  /**
   * RAG 분석을 기반으로 요청받은 결과물을 생성합니다.
   *
   * 여러 개의 연구논문을 비교하는 챗봇을 통해 유저가 질문한 내용에 대한 답변을 생성할 때 사용될 수 있는 커넥터 입니다.
   *
   * @summary RAG 기반 결과물 생성
   *
   * @param input
   *
   * @tag RAG
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/RAG_full.svg",
  )
  @core.TypedRoute.Post("/generate/:chatId")
  public async generate(
    @core.TypedBody() input: IRag.IGenerateInput,
    @core.TypedParam("chatId") chatId: string,
  ): Promise<IRag.IGenerateOutput> {
    const { answer } = await this.ragService.generate(input, chatId);
    return { answer };
  }
}
