import core from "@nestia/core";
import { Body, Controller, Post, Res } from "@nestjs/common";
import { Response } from "express";

import { IRag } from "@wrtn/connector-api/lib/structures/connector/rag/IRag";

import { RagProvider } from "../../../providers/connector/rag/RagProvider";

@Controller("/connector/rag")
export class RagController {
  constructor(private readonly ragService: RagProvider) {}

  /**
   * Requests RAG analysis for the provided files or links.
   *
   * @summary RAG analysis request.
   *
   * @param input Information about the files or links to be analyzed.
   *
   * @tag RAG
   */
  @core.TypedRoute.Post("/analyze")
  async analyze(
    @core.TypedBody() input: IRag.IAnalyzeInput[],
  ): Promise<IRag.IAnalysisOutput> {
    return await this.ragService.analyze(input);
  }

  /**
   * Retrieves the status of the analysis in progress.
   *
   * @summary RAG analysis status retrieval.
   *
   * @param docId The document ID to check the analysis status for.
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
   * Generates the requested output based on RAG analysis.
   *
   * @summary Generate output based on RAG analysis.
   *
   * @param input
   *
   * @tag RAG
   */
  @core.TypedRoute.Post("/generate/:chatId")
  public async generate(
    @core.TypedBody() input: IRag.IGenerateInput,
    @core.TypedParam("chatId") chatId: string,
  ): Promise<IRag.IGenerateOutput> {
    const { answer } = await this.ragService.generate(input, chatId);
    return { answer };
  }
}
