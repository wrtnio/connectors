import core from "@nestia/core";
import { Body, Controller, Post, Res } from "@nestjs/common";
import { Response } from "express";

import { IRag } from "@wrtn/connector-api/lib/structures/connector/rag/IRag";

import { RagProvider } from "../../../providers/connector/rag/RagProvider";
import { Try, createResponseForm } from "../../../utils/createResponseForm";

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
  async analyze(@core.TypedBody() input: IRag.IAnalyzeInput): Promise<Try<IRag.IAnalysisOutput>> {
    const data = await this.ragService.analyze(input);
    return createResponseForm(data);
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
  @core.TypedRoute.Get("/:docId/status")
  async getStatus(@core.TypedParam("docId") docId: string): Promise<Try<IRag.IStatusOutput>> {
    const data = await this.ragService.getStatus(docId);
    return createResponseForm(data);
  }

  /**
   * RAG 분석을 기반으로 스트리밍 채팅을 합니다.
   *
   * @summary RAG 기반 채팅(스트리밍).
   *
   * @param input
   *
   * @tag RAG
   *
   * @internal
   */
  @Post("generate/sse")
  async generate(@Body() input: IRag.IGenerateInput, @Res() res: Response): Promise<Try<any>> {
    res.header("Content-Type", "text/event-stream");
    res.header("Cache-Control", "no-cache");
    res.header("Connection", "keep-alive");
    res.header("Access-Control-Allow-Origin", "*");
    const data = await this.ragService.generateSse(input, res);
    return createResponseForm(data);
  }

  /**
   * RAG 분석을 기반으로 채팅을 합니다.
   *
   * @summary RAG 기반 채팅.
   *
   * @param input
   *
   * @tag RAG
   */
  @Post("generate")
  async generateChat(@Body() input: IRag.IGenerateInput): Promise<Try<IRag.IGenerateOutput>> {
    const data = await this.ragService.generate(input);
    return createResponseForm(data);
  }
}
