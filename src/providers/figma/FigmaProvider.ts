import { Injectable } from "@nestjs/common";
import axios from "axios";

import { IFigma } from "@wrtn/connector-api/lib/structures/connector/figma/IFigma";
import { ConnectorGlobal } from "../../ConnectorGlobal";

@Injectable()
export class FigmaProvider {
  async getFiles(
    input: IFigma.IReadFileInput,
  ): Promise<IFigma.IReadFileOutput> {
    try {
      const { secretKey, fileKey, ...getFileQueryParams } = input;
      const accessToken = await this.refresh(secretKey);

      const queryParams = Object.entries(getFileQueryParams)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");

      const res = await axios.get(
        `https://api.figma.com/v1/files/${fileKey}?${queryParams}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return res.data;
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  async addComment(input: IFigma.IAddCommentInput) {
    try {
      const { secretKey, fileKey, ...requestBody } = input;
      const accessToken = await this.refresh(secretKey);

      const res = await axios.post(
        `https://api.figma.com/v1/files/${fileKey}/comments`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return res.data;
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  async getComments(
    input: IFigma.IReadCommentInput,
  ): Promise<IFigma.IReadCommentOutput> {
    try {
      const { fileKey, secretKey, ...getCommentQueryParam } = input;
      const accessToken = await this.refresh(secretKey);

      const queryParams = Object.entries(getCommentQueryParam)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");

      const res = await axios.get(
        `https://api.figma.com/v1/files/${fileKey}/comments?${queryParams}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return res.data;
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  async getProjectCanvas(
    projectId: string,
    input: IFigma.Secret,
  ): Promise<IFigma.IGetProjectFileOutput> {
    try {
      const url = `https://api.figma.com/v1/projects/${projectId}/files`;
      const accessToken = await this.refresh(input.secretKey);

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return res.data;
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  async getStatistics(
    input: IFigma.IGetProjectStatisticsInput,
    team: IFigma.IGetProejctOutput,
  ): Promise<IFigma.IGetStatisticsOutput[]> {
    try {
      return await Promise.all(
        team.projects.map(async (project) => {
          const projectDetail = await this.getProjectCanvas(project.id, input);

          const canvasList = await Promise.all(
            projectDetail.files.map(async (canvas) => {
              const canvasDetail = await this.getComments({
                secretKey: input.secretKey,
                fileKey: canvas.key,
                as_md: input.as_md,
              });

              const comments = canvasDetail.comments;
              const users = comments.map((el) => el.user.handle);

              const statistics = {
                users: Array.from(new Set(users)),
                counts: users.reduce<Record<string, number>>((acc, cur) => {
                  if (!acc[cur]) {
                    acc[cur] = 1;
                  } else {
                    acc[cur] += 1;
                  }

                  return acc;
                }, {}),
              };
              return { ...canvas, comments, statistics };
            }),
          );

          return { ...project, canvasList };
        }),
      );
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  async getProjects(
    input: IFigma.IGetProjectInput,
  ): Promise<IFigma.IGetProejctOutput> {
    const url = `https://api.figma.com/v1/teams/${input.teamId}/projects?branch_data=true`;
    const accessToken = await this.refresh(input.secretKey);

    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.data;
  }

  private async refresh(refreshToken: string): Promise<string> {
    const url = `https://www.figma.com/api/oauth/refresh`;
    const res = await axios.post(
      url,
      {
        client_id: ConnectorGlobal.env.FIGMA_CLIENT_ID,
        client_secret: ConnectorGlobal.env.FIGMA_CLIENT_SECRET,
        refresh_token: refreshToken,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    return res.data.access_token;
  }
}
