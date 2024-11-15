import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IRag } from "@wrtn/connector-api/lib/structures/connector/rag/IRag";

import { ApiTags } from "@nestjs/swagger";
import { RouteIcon } from "@wrtnio/decorators";
import { RagProvider } from "../../../providers/connector/rag/RagProvider";

@Controller("/connector/rag")
export class RagController {
  constructor(private readonly ragService: RagProvider) {}

  /**
   * Request RAG analysis for the input file
   *
   * This connector can be used when creating a chatbot that compares multiple research papers.
   *
   * @summary Request RAG analysis
   * @param input Information about the file to be analyzed
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/RAG_full.svg",
  )
  @ApiTags("RAG")
  @core.TypedRoute.Post("/analyze")
  async analyze(
    @core.TypedBody() input: IRag.IAnalyzeInput,
  ): Promise<IRag.IAnalysisOutput> {
    return await this.ragService.analyze(input);
  }

  /**
   * Check the analysis progress status
   *
   * @summary Check RAG analysis status
   * @param docId Document ID for which to check the analysis progress status
   * @internal
   */
  @ApiTags("RAG")
  @core.TypedRoute.Get("/:jobId/status")
  async getStatus(
    @core.TypedParam("jobId") jobId: string,
  ): Promise<IRag.IStatusOutput> {
    return await this.ragService.getStatus(jobId);
  }

  /**
   * Generates requested results based on RAG analysis
   *
   * A connector that can be used to generate answers to user questions through a chatbot that compares multiple research papers.
   *
   * @summary Generate RAG-based results
   * @param input
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/RAG_full.svg",
  )
  @ApiTags("RAG")
  @core.TypedRoute.Post("/generate/:chatId")
  public async generate(
    @core.TypedBody() input: IRag.IGenerateInput,
    @core.TypedParam("chatId") chatId: string,
  ): Promise<IRag.IGenerateOutput> {
    const { answer } = await this.ragService.generate(input, chatId);
    return { answer };
  }
}
