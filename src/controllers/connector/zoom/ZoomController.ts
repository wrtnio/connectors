import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IZoom } from "@wrtn/connector-api/lib/structures/zoom/IZoom";

import { ZoomProvider } from "../../../providers/zoom/ZoomProvider";

@Controller("connector/zoom")
export class ZoomController {
  /**
   * zoom 미팅에 참가자를 추가합니다.
   *
   * @summary zoom 미팅 참가자 추가.
   * @returns 참가자가 추가된 zoom 미팅의 정보.
   * @param meetingId 초대할 미팅의 아이디.
   * @param input 타 사용자를 미팅에 초대하는 조건에 대한 DTO.
   */
  @core.TypedRoute.Post("meetings/:meetingId/registrants")
  async addMeetingRegistrant(
    @core.TypedParam("meetingId") meetingId: number,
    @core.TypedBody() input: IZoom.IAddMeetingRegistrantInput,
  ): Promise<IZoom.IAddMeetingRegistrantOutput> {
    return ZoomProvider.addMeetingRegistrant(meetingId, input);
  }

  /**
   * zoom 미팅을 생성합니다.
   *
   * @summary zoom 미팅 생성.
   * @returns 생성된 zoom 미팅 정보 DTO.
   * @param input 미팅을 생성하고자 하는 유저 정보 및 조건에 대한 DTO.
   * @tag zoom
   */
  @core.TypedRoute.Post("meetings")
  async createMeeting(
    @core.TypedBody() input: IZoom.ICreateMeetingInput,
  ): Promise<IZoom.ICreateMeetingOutput> {
    return ZoomProvider.createMeeting(input);
  }
}
