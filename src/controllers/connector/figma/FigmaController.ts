import core, { HumanRoute, TypedBody, TypedParam } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { Prerequisite, RouteIcon, Standalone } from "@wrtnio/decorators";

import { IFigma } from "@wrtn/connector-api/lib/structures/connector/figma/IFigma";

import { FigmaProvider } from "../../../providers/connector/figma/FigmaProvider";
import { retry } from "../../../utils/retry";
import { ApiTags } from "@nestjs/swagger";

@Controller("connector/figma")
export class FigmaController {
  constructor(private readonly figmaProvider: FigmaProvider) {}

  /**
   * Import Figma files
   *
   * @summary Import Figma files
   * @param input Conditional values for importing files
   * @returns List of Figma files
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icons/figma.svg",
  )
  @HumanRoute()
  @ApiTags("Figma")
  @core.TypedRoute.Patch("get-files")
  async readFiles(
    @core.TypedBody() input: IFigma.IReadFileInput,
  ): Promise<IFigma.IReadFileOutput> {
    return retry(() => this.figmaProvider.getFiles(input))();
  }

  /**
   * Write a comment
   *
   * @summary Write a comment within the canvas
   * @param input Condition value for writing a comment
   * @returns Information about the comment just written
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icons/figma.svg",
  )
  @HumanRoute()
  @ApiTags("Figma")
  @core.TypedRoute.Post("comments")
  async addComment(
    @core.TypedBody() input: IFigma.IAddCommentInput,
  ): Promise<IFigma.IAddCommentOutput> {
    return retry(() => this.figmaProvider.addComment(input))();
  }

  /**
   * Get Figma comments
   *
   * @summary Get Figma comments
   * @returns List of Figma comments
   * @param input Condition value to get comments
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icons/figma.svg",
  )
  @HumanRoute()
  @ApiTags("Figma")
  @core.TypedRoute.Patch("get-comments")
  async readComments(
    @core.TypedBody() input: IFigma.IReadCommentInput,
  ): Promise<IFigma.IReadCommentOutput> {
    return retry(() => this.figmaProvider.getComments(input))();
  }

  /**
   * Get all canvases of a specific project
   *
   * Canvases are Figma files managed by a specific team.
   *
   * This connector allows users to see which canvases are managed within their Figma team, along with their canvas names and thumbnail links.
   *
   * @summary Search for canvases within a team
   * @param projectId The ID of the project to search
   * @param input Search conditions for projects
   * @returns All files in the project
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icons/figma.svg",
  )
  @HumanRoute()
  @ApiTags("Figma")
  @core.TypedRoute.Patch("projects/:id/get-canvas")
  async getProjectCanvas(
    @Prerequisite({
      neighbor: () => FigmaController.prototype.getProjects,
      jmesPath: "proejcts[].{value:id, label:name}",
    })
    @TypedParam("id")
    projectId: string,
    @TypedBody()
    input: IFigma.Secret,
  ): Promise<IFigma.IGetProjectFileOutput> {
    return retry(() => this.figmaProvider.getProjectCanvas(projectId, input))();
  }

  /**
   * Retrieve team-level statistics
   *
   * @summary Retrieve team-level Figma statistics
   * @param input Conditions for retrieving team-level statistics
   * @returns Results of team-level statistics retrieval
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icons/figma.svg",
  )
  @HumanRoute()
  @ApiTags("Figma")
  @core.TypedRoute.Patch("get-statistics")
  async getStatistics(
    @TypedBody()
    input: IFigma.IGetProjectStatisticsInput,
  ): Promise<IFigma.IGetStatisticsOutput[]> {
    const team = await this.figmaProvider.getProjects(input);
    return this.figmaProvider.getStatistics(input, team);
  }

  /**
   * Search for projects within a team
   *
   * As an argument, it should receive teamId, which is the team ID, and can be found by looking at the URL path of figma.
   * When accessing the link `https://www.figma.com/files/team`, a number is automatically added after the `team` keyword, which is the team ID.
   * A user can belong to multiple teams, so if you do not want to automate the search for these projects, you need to get a different team ID.
   *
   * @summary Search for projects within a team
   * @param input Project search conditions
   *
   * @returns Project list
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icons/figma.svg",
  )
  @HumanRoute()
  @ApiTags("Figma")
  @core.TypedRoute.Patch("get-projects")
  async getProjects(
    @core.TypedBody() input: IFigma.IGetProjectInput,
  ): Promise<IFigma.IGetProejctOutput> {
    return retry(() => this.figmaProvider.getProjects(input))();
  }
}
