import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { IZoom } from "@wrtn/connector-api/lib/structures/zoom/IZoom";

import { ApiTags } from "@nestjs/swagger";
import { ZoomProvider } from "../../../providers/connector/zoom/ZoomProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/zoom")
export class ZoomController {
  /**
   * Create a zoom meeting
   *
   * @summary Create a zoom meeting
   * @returns DTO of the created zoom meeting information.
   * @param input DTO of the user information and conditions for creating a meeting
   * @internal
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Zoom_full.svg",
  )
  @ApiTags("Zoom")
  @core.TypedRoute.Post("meetings")
  async createMeeting(
    @core.TypedBody() input: IZoom.ICreateMeetingInput,
  ): Promise<IZoom.ICreateMeetingOutput> {
    return retry(ZoomProvider.createMeeting)(input);
  }
}
