import core from "@nestia/core";
import { Body, Controller, Post, Res } from "@nestjs/common";
import { Response } from "express";

import { IRag } from "@wrtn/connector-api/lib/structures/connector/rag/IRag";

import { RagProvider } from "../../../providers/connector/rag/RagProvider";

@Controller("/connector/rag")
export class RagController {
  constructor(private readonly ragService: RagProvider) {}

  /**
   * 입력된 파일에 대해 RAG 분석을 요청합니다.
   *
   * @summary RAG 분석 요청.
   *
   * @param input 분석할 파일 정보.
   *
   * @tag RAG
   */
  @core.TypedRoute.Post("/analyze")
  async analyze(
    @core.TypedBody() input: IRag.IAnalyzeInput,
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
   * RAG 분석을 기반으로 채팅을 합니다.
   *
   * @summary RAG 기반 채팅
   *
   * @param input
   *
   * @tag RAG
   *
   * @internal
   */
  @Post("generate/:chatId")
  async generate(
    @Body() input: IRag.IGenerateInput,
    @Res() res: Response,
    @core.TypedParam("chatId") chatId: string,
  ) {
    res.header("Content-Type", "text/event-stream");
    res.header("Cache-Control", "no-cache");
    res.header("Connection", "keep-alive");
    res.header("Access-Control-Allow-Origin", "*");
    return await this.ragService.generateSse(input, res, chatId);
  }

  // /**
  //  * RAG 분석을 기반으로 채팅을 합니다.
  //  *
  //  * @summary RAG 기반 채팅.
  //  *
  //  * @param input
  //  *
  //  * @tag RAG
  //  */
  // @Post("generate")
  // async generateChat(
  //   @Body() input: IRag.IGenerateInput,
  // ): Promise<IRag.IGenerateOutput> {
  //   return await this.ragService.generate(input);
  // }
}
