import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { Prerequisite, RouteIcon, Standalone } from "@wrtn/decorators";

import { IGoogleDrive } from "@wrtn/connector-api/lib/structures/connector/google_drive/IGoogleDrive";

import { GoogleDriveProvider } from "../../../providers/connector/google_drive/GoogleDriveProvider";

@Controller("connector/google-drive")
export class GoogleDriveController {
  constructor(private readonly googleDriveProvider: GoogleDriveProvider) {}

  /**
   * 구글 드라이브에 있는 폴더 목록을 가져옵니다.
   *
   * @summary 구글 드라이브 폴더 목록 가져오기.
   *
   * @param headers 구글 드라이브에 접근하기 위한 정보.
   *
   * @returns 구글 드라이브 폴더 목록.
   *
   * @tag Google-Drive
   * @tag 구글 드라이브
   * @tag 드라이브
   * @tag 저장
   * @tag 파일 저장
   * @tag 클라우드 저장
   * @tag 파일 공유
   * @tag 파일 동기화
   * @tag 파일 업데이트
   * @tag 파일 다운로드
   * @tag 파일 생성
   * @tag 파일명 수정
   * @tag 파일 삭제
   * @tag 파일 관리
   * @tag 폴더 추가
   * @tag 폴더명 수정
   * @tag 폴더 삭제
   * @tag 폴더 관리
   * @tag 문서 작성
   * @tag 문서 공유
   * @tag 사진 저장
   * @tag 사진 공유
   * @tag 동영상 저장
   * @tag 동영상 공유
   * @tag 파일 검색
   * @tag 협업
   * @tag 문서 협업
   * @tag 파일 권한 설정
   * @tag 파일 암호화
   * @tag 문서 편집
   * @tag 파일 이동
   * @tag 구글 문서
   * @tag 구글 스위트
   * @tag 구글 시트
   * @tag 구글 닥스
   * @tag 구글 슬라이드
   * @tag 자료 공유
   * @tag 자료
   * @tag 구글 폼
   * @tag 설문 응답
   * @tag 파일 링크 생성
   * @tag 팀 드라이브
   * @tag Google Drive
   * @tag Drive
   * @tag Save
   * @tag Save File
   * @tag Save to Cloud
   * @tag Share File
   * @tag Sync File
   * @tag Update File
   * @tag Download File
   * @tag Create File
   * @tag Rename File
   * @tag Delete File
   * @tag Manage File
   * @tag Add Folder
   * @tag Rename Folder
   * @tag Delete Folder
   * @tag Manage Folder
   * @tag Create Document
   * @tag Share Document
   * @tag Save Photo
   * @tag Share Photo
   * @tag Save Video
   * @tag Share Video
   * @tag Search File
   * @tag Collaborate
   * @tag Collaborate on Document
   * @tag Set File Permissions
   * @tag Encrypt File
   * @tag Edit Document
   * @tag Move File
   * @tag Google Docs
   * @tag Google Suite
   * @tag Google Sheets
   * @tag Google Docs
   * @tag Google Slides
   * @tag Share Resources
   * @tag Resources
   * @tag Google Forms
   * @tag Survey Responses
   * @tag Create File Link
   * @tag Team Drive
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google_drive.svg",
  )
  @core.TypedRoute.Post("get/folders")
  async folderList(
    @core.TypedBody()
    input: IGoogleDrive.ISecret,
  ): Promise<IGoogleDrive.IFolderListGoogleDriveOutput> {
    return await this.googleDriveProvider.folderList(input);
  }

  /**
   * 구글 드라이브에 있는 파일 목록을 가져옵니다.
   *
   * @summary 구글 드라이브 파일 목록 가져오기.
   *
   * @param query 파일 목록을 가져오기 위한 정보.
   *
   * @returns 구글 드라이브 파일 목록.
   *
   * @tag Google-Drive
   * @tag 구글 드라이브
   * @tag 드라이브
   * @tag 저장
   * @tag 파일 저장
   * @tag 클라우드 저장
   * @tag 파일 공유
   * @tag 파일 동기화
   * @tag 파일 업데이트
   * @tag 파일 다운로드
   * @tag 파일 생성
   * @tag 파일명 수정
   * @tag 파일 삭제
   * @tag 파일 관리
   * @tag 폴더 추가
   * @tag 폴더명 수정
   * @tag 폴더 삭제
   * @tag 폴더 관리
   * @tag 문서 작성
   * @tag 문서 공유
   * @tag 사진 저장
   * @tag 사진 공유
   * @tag 동영상 저장
   * @tag 동영상 공유
   * @tag 파일 검색
   * @tag 협업
   * @tag 문서 협업
   * @tag 파일 권한 설정
   * @tag 파일 암호화
   * @tag 문서 편집
   * @tag 파일 이동
   * @tag 구글 문서
   * @tag 구글 스위트
   * @tag 구글 시트
   * @tag 구글 닥스
   * @tag 구글 슬라이드
   * @tag 자료 공유
   * @tag 자료
   * @tag 구글 폼
   * @tag 설문 응답
   * @tag 파일 링크 생성
   * @tag 팀 드라이브
   * @tag Google Drive
   * @tag Drive
   * @tag Save
   * @tag Save File
   * @tag Save to Cloud
   * @tag Share File
   * @tag Sync File
   * @tag Update File
   * @tag Download File
   * @tag Create File
   * @tag Rename File
   * @tag Delete File
   * @tag Manage File
   * @tag Add Folder
   * @tag Rename Folder
   * @tag Delete Folder
   * @tag Manage Folder
   * @tag Create Document
   * @tag Share Document
   * @tag Save Photo
   * @tag Share Photo
   * @tag Save Video
   * @tag Share Video
   * @tag Search File
   * @tag Collaborate
   * @tag Collaborate on Document
   * @tag Set File Permissions
   * @tag Encrypt File
   * @tag Edit Document
   * @tag Move File
   * @tag Google Docs
   * @tag Google Suite
   * @tag Google Sheets
   * @tag Google Docs
   * @tag Google Slides
   * @tag Share Resources
   * @tag Resources
   * @tag Google Forms
   * @tag Survey Responses
   * @tag Create File Link
   * @tag Team Drive
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google_drive.svg",
  )
  @core.TypedRoute.Post("get/files")
  async fileList(
    @core.TypedBody() input: IGoogleDrive.IFileListGoogleDriveInput,
  ): Promise<IGoogleDrive.IFileListGoogleDriveOutput> {
    return await this.googleDriveProvider.fileList(input);
  }

  /**
   * 구글 드라이브에 새로운 폴더를 생성합니다.
   *
   * @summary 구글 드라이브 폴더 생성.
   *
   * @param headers
   * @param input 생성할 폴더 이름.
   *
   * @returns 생성된 폴더 고유 ID.
   *
   * @tag Google-Drive
   * @tag 구글 드라이브
   * @tag 드라이브
   * @tag 저장
   * @tag 파일 저장
   * @tag 클라우드 저장
   * @tag 파일 공유
   * @tag 파일 동기화
   * @tag 파일 업데이트
   * @tag 파일 다운로드
   * @tag 파일 생성
   * @tag 파일명 수정
   * @tag 파일 삭제
   * @tag 파일 관리
   * @tag 폴더 추가
   * @tag 폴더명 수정
   * @tag 폴더 삭제
   * @tag 폴더 관리
   * @tag 문서 작성
   * @tag 문서 공유
   * @tag 사진 저장
   * @tag 사진 공유
   * @tag 동영상 저장
   * @tag 동영상 공유
   * @tag 파일 검색
   * @tag 협업
   * @tag 문서 협업
   * @tag 파일 권한 설정
   * @tag 파일 암호화
   * @tag 문서 편집
   * @tag 파일 이동
   * @tag 구글 문서
   * @tag 구글 스위트
   * @tag 구글 시트
   * @tag 구글 닥스
   * @tag 구글 슬라이드
   * @tag 자료 공유
   * @tag 자료
   * @tag 구글 폼
   * @tag 설문 응답
   * @tag 파일 링크 생성
   * @tag 팀 드라이브
   * @tag Google Drive
   * @tag Drive
   * @tag Save
   * @tag Save File
   * @tag Save to Cloud
   * @tag Share File
   * @tag Sync File
   * @tag Update File
   * @tag Download File
   * @tag Create File
   * @tag Rename File
   * @tag Delete File
   * @tag Manage File
   * @tag Add Folder
   * @tag Rename Folder
   * @tag Delete Folder
   * @tag Manage Folder
   * @tag Create Document
   * @tag Share Document
   * @tag Save Photo
   * @tag Share Photo
   * @tag Save Video
   * @tag Share Video
   * @tag Search File
   * @tag Collaborate
   * @tag Collaborate on Document
   * @tag Set File Permissions
   * @tag Encrypt File
   * @tag Edit Document
   * @tag Move File
   * @tag Google Docs
   * @tag Google Suite
   * @tag Google Sheets
   * @tag Google Docs
   * @tag Google Slides
   * @tag Share Resources
   * @tag Resources
   * @tag Google Forms
   * @tag Survey Responses
   * @tag Create File Link
   * @tag Team Drive
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google_drive.svg",
  )
  @core.TypedRoute.Post("/folder")
  async createFolder(
    @core.TypedBody() input: IGoogleDrive.ICreateFolderGoogleDriveInput,
  ): Promise<IGoogleDrive.ICreateFolderGoogleDriveOutput> {
    return await this.googleDriveProvider.createFolder(input);
  }

  /**
   * 구글 드라이브에 새로운 파일을 생성합니다.
   *
   * @summary 구글 드라이브 파일 생성.
   *
   * @param input 생성할 파일명과 파일을 생성할 폴더 고유 ID.
   *
   * @returns 생성된 파일 고유 ID.
   *
   * @tag Google-Drive
   * @tag 구글 드라이브
   * @tag 드라이브
   * @tag 저장
   * @tag 파일 저장
   * @tag 클라우드 저장
   * @tag 파일 공유
   * @tag 파일 동기화
   * @tag 파일 업데이트
   * @tag 파일 다운로드
   * @tag 파일 생성
   * @tag 파일명 수정
   * @tag 파일 삭제
   * @tag 파일 관리
   * @tag 폴더 추가
   * @tag 폴더명 수정
   * @tag 폴더 삭제
   * @tag 폴더 관리
   * @tag 문서 작성
   * @tag 문서 공유
   * @tag 사진 저장
   * @tag 사진 공유
   * @tag 동영상 저장
   * @tag 동영상 공유
   * @tag 파일 검색
   * @tag 협업
   * @tag 문서 협업
   * @tag 파일 권한 설정
   * @tag 파일 암호화
   * @tag 문서 편집
   * @tag 파일 이동
   * @tag 구글 문서
   * @tag 구글 스위트
   * @tag 구글 시트
   * @tag 구글 닥스
   * @tag 구글 슬라이드
   * @tag 자료 공유
   * @tag 자료
   * @tag 구글 폼
   * @tag 설문 응답
   * @tag 파일 링크 생성
   * @tag 팀 드라이브
   * @tag Google Drive
   * @tag Drive
   * @tag Save
   * @tag Save File
   * @tag Save to Cloud
   * @tag Share File
   * @tag Sync File
   * @tag Update File
   * @tag Download File
   * @tag Create File
   * @tag Rename File
   * @tag Delete File
   * @tag Manage File
   * @tag Add Folder
   * @tag Rename Folder
   * @tag Delete Folder
   * @tag Manage Folder
   * @tag Create Document
   * @tag Share Document
   * @tag Save Photo
   * @tag Share Photo
   * @tag Save Video
   * @tag Share Video
   * @tag Search File
   * @tag Collaborate
   * @tag Collaborate on Document
   * @tag Set File Permissions
   * @tag Encrypt File
   * @tag Edit Document
   * @tag Move File
   * @tag Google Docs
   * @tag Google Suite
   * @tag Google Sheets
   * @tag Google Docs
   * @tag Google Slides
   * @tag Share Resources
   * @tag Resources
   * @tag Google Forms
   * @tag Survey Responses
   * @tag Create File Link
   * @tag Team Drive
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google_drive.svg",
  )
  @core.TypedRoute.Post("/file")
  async createFile(
    @core.TypedBody() input: IGoogleDrive.ICreateFileGoogleDriveInput,
  ): Promise<IGoogleDrive.ICreateFileGoogleDriveOutput> {
    return await this.googleDriveProvider.createFile(input);
  }

  /**
   * 구글 드라이브에 있는 파일을 삭제합니다.
   *
   * @summary 구글 드라이브 파일 삭제.
   *
   * @param id 삭제할 파일 고유 ID.
   *
   * @tag Google-Drive
   * @tag 구글 드라이브
   * @tag 드라이브
   * @tag 저장
   * @tag 파일 저장
   * @tag 클라우드 저장
   * @tag 파일 공유
   * @tag 파일 동기화
   * @tag 파일 업데이트
   * @tag 파일 다운로드
   * @tag 파일 생성
   * @tag 파일명 수정
   * @tag 파일 삭제
   * @tag 파일 관리
   * @tag 폴더 추가
   * @tag 폴더명 수정
   * @tag 폴더 삭제
   * @tag 폴더 관리
   * @tag 문서 작성
   * @tag 문서 공유
   * @tag 사진 저장
   * @tag 사진 공유
   * @tag 동영상 저장
   * @tag 동영상 공유
   * @tag 파일 검색
   * @tag 협업
   * @tag 문서 협업
   * @tag 파일 권한 설정
   * @tag 파일 암호화
   * @tag 문서 편집
   * @tag 파일 이동
   * @tag 구글 문서
   * @tag 구글 스위트
   * @tag 구글 시트
   * @tag 구글 닥스
   * @tag 구글 슬라이드
   * @tag 자료 공유
   * @tag 자료
   * @tag 구글 폼
   * @tag 설문 응답
   * @tag 파일 링크 생성
   * @tag 팀 드라이브
   * @tag Google Drive
   * @tag Drive
   * @tag Save
   * @tag Save File
   * @tag Save to Cloud
   * @tag Share File
   * @tag Sync File
   * @tag Update File
   * @tag Download File
   * @tag Create File
   * @tag Rename File
   * @tag Delete File
   * @tag Manage File
   * @tag Add Folder
   * @tag Rename Folder
   * @tag Delete Folder
   * @tag Manage Folder
   * @tag Create Document
   * @tag Share Document
   * @tag Save Photo
   * @tag Share Photo
   * @tag Save Video
   * @tag Share Video
   * @tag Search File
   * @tag Collaborate
   * @tag Collaborate on Document
   * @tag Set File Permissions
   * @tag Encrypt File
   * @tag Edit Document
   * @tag Move File
   * @tag Google Docs
   * @tag Google Suite
   * @tag Google Sheets
   * @tag Google Docs
   * @tag Google Slides
   * @tag Share Resources
   * @tag Resources
   * @tag Google Forms
   * @tag Survey Responses
   * @tag Create File Link
   * @tag Team Drive
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google_drive.svg",
  )
  @core.TypedRoute.Delete("/file/:id")
  async deleteFile(
    @Prerequisite({
      neighbor: () => GoogleDriveController.prototype.fileList,
      array: (response): IGoogleDrive.IFileListGoogleDriveOutput["data"] =>
        response.data,
      value: (elem): string => elem?.id ?? "",
      label: (elem): string => elem?.name ?? "",
    })
    @core.TypedParam("id")
    id: string,
    @core.TypedBody()
    input: IGoogleDrive.ISecret,
  ): Promise<void> {
    return await this.googleDriveProvider.deleteFile(id, input);
  }

  /**
   * 구글 드라이브에 있는 폴더를 삭제합니다.
   *
   * @summary 구글 드라이브 폴더 삭제.
   *
   * @param id 삭제할 폴더 고유 ID.
   *
   * @tag Google-Drive
   * @tag 구글 드라이브
   * @tag 드라이브
   * @tag 저장
   * @tag 파일 저장
   * @tag 클라우드 저장
   * @tag 파일 공유
   * @tag 파일 동기화
   * @tag 파일 업데이트
   * @tag 파일 다운로드
   * @tag 파일 생성
   * @tag 파일명 수정
   * @tag 파일 삭제
   * @tag 파일 관리
   * @tag 폴더 추가
   * @tag 폴더명 수정
   * @tag 폴더 삭제
   * @tag 폴더 관리
   * @tag 문서 작성
   * @tag 문서 공유
   * @tag 사진 저장
   * @tag 사진 공유
   * @tag 동영상 저장
   * @tag 동영상 공유
   * @tag 파일 검색
   * @tag 협업
   * @tag 문서 협업
   * @tag 파일 권한 설정
   * @tag 파일 암호화
   * @tag 문서 편집
   * @tag 파일 이동
   * @tag 구글 문서
   * @tag 구글 스위트
   * @tag 구글 시트
   * @tag 구글 닥스
   * @tag 구글 슬라이드
   * @tag 자료 공유
   * @tag 자료
   * @tag 구글 폼
   * @tag 설문 응답
   * @tag 파일 링크 생성
   * @tag 팀 드라이브
   * @tag Google Drive
   * @tag Drive
   * @tag Save
   * @tag Save File
   * @tag Save to Cloud
   * @tag Share File
   * @tag Sync File
   * @tag Update File
   * @tag Download File
   * @tag Create File
   * @tag Rename File
   * @tag Delete File
   * @tag Manage File
   * @tag Add Folder
   * @tag Rename Folder
   * @tag Delete Folder
   * @tag Manage Folder
   * @tag Create Document
   * @tag Share Document
   * @tag Save Photo
   * @tag Share Photo
   * @tag Save Video
   * @tag Share Video
   * @tag Search File
   * @tag Collaborate
   * @tag Collaborate on Document
   * @tag Set File Permissions
   * @tag Encrypt File
   * @tag Edit Document
   * @tag Move File
   * @tag Google Docs
   * @tag Google Suite
   * @tag Google Sheets
   * @tag Google Docs
   * @tag Google Slides
   * @tag Share Resources
   * @tag Resources
   * @tag Google Forms
   * @tag Survey Responses
   * @tag Create File Link
   * @tag Team Drive
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google_drive.svg",
  )
  @core.TypedRoute.Delete("/folder/:id")
  async deleteFolder(
    @Prerequisite({
      neighbor: () => GoogleDriveController.prototype.folderList,
      array: (response): IGoogleDrive.IFolderListGoogleDriveOutput["data"] =>
        response.data,
      value: (elem): string => elem?.id ?? "",
      label: (elem): string => elem?.name ?? "",
    })
    @core.TypedParam("id")
    id: string,
    @core.TypedBody()
    input: IGoogleDrive.ISecret,
  ): Promise<void> {
    return await this.googleDriveProvider.deleteFolder(id, input);
  }

  /**
   * 파일 또는 폴더에 접근하기 위한 권한을 부여합니다.
   *
   * @summary 구글 드라이브 권한 부여.
   *
   * @param input 권한 부여를 위한 정보.
   *
   * @tag Google-Drive
   * @tag 구글 드라이브
   * @tag 드라이브
   * @tag 저장
   * @tag 파일 저장
   * @tag 클라우드 저장
   * @tag 파일 공유
   * @tag 파일 동기화
   * @tag 파일 업데이트
   * @tag 파일 다운로드
   * @tag 파일 생성
   * @tag 파일명 수정
   * @tag 파일 삭제
   * @tag 파일 관리
   * @tag 폴더 추가
   * @tag 폴더명 수정
   * @tag 폴더 삭제
   * @tag 폴더 관리
   * @tag 문서 작성
   * @tag 문서 공유
   * @tag 사진 저장
   * @tag 사진 공유
   * @tag 동영상 저장
   * @tag 동영상 공유
   * @tag 파일 검색
   * @tag 협업
   * @tag 문서 협업
   * @tag 파일 권한 설정
   * @tag 파일 암호화
   * @tag 문서 편집
   * @tag 파일 이동
   * @tag 구글 문서
   * @tag 구글 스위트
   * @tag 구글 시트
   * @tag 구글 닥스
   * @tag 구글 슬라이드
   * @tag 자료 공유
   * @tag 자료
   * @tag 구글 폼
   * @tag 설문 응답
   * @tag 파일 링크 생성
   * @tag 팀 드라이브
   * @tag Google Drive
   * @tag Drive
   * @tag Save
   * @tag Save File
   * @tag Save to Cloud
   * @tag Share File
   * @tag Sync File
   * @tag Update File
   * @tag Download File
   * @tag Create File
   * @tag Rename File
   * @tag Delete File
   * @tag Manage File
   * @tag Add Folder
   * @tag Rename Folder
   * @tag Delete Folder
   * @tag Manage Folder
   * @tag Create Document
   * @tag Share Document
   * @tag Save Photo
   * @tag Share Photo
   * @tag Save Video
   * @tag Share Video
   * @tag Search File
   * @tag Collaborate
   * @tag Collaborate on Document
   * @tag Set File Permissions
   * @tag Encrypt File
   * @tag Edit Document
   * @tag Move File
   * @tag Google Docs
   * @tag Google Suite
   * @tag Google Sheets
   * @tag Google Docs
   * @tag Google Slides
   * @tag Share Resources
   * @tag Resources
   * @tag Google Forms
   * @tag Survey Responses
   * @tag Create File Link
   * @tag Team Drive
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google_drive.svg",
  )
  @core.TypedRoute.Post("permission")
  async permission(
    @core.TypedBody() input: IGoogleDrive.IPermissionGoogleDriveInput,
  ): Promise<void> {
    return await this.googleDriveProvider.permission(input);
  }

  /**
   * 파일에 텍스트를 추가합니다.
   *
   * @summary 구글 드라이브 파일 텍스트 추가.
   *
   * @param id 파일 고유 ID.
   *
   * @param input 추가할 텍스트.
   *
   * @tag Google-Drive
   * @tag 구글 드라이브
   * @tag 드라이브
   * @tag 저장
   * @tag 파일 저장
   * @tag 클라우드 저장
   * @tag 파일 공유
   * @tag 파일 동기화
   * @tag 파일 업데이트
   * @tag 파일 다운로드
   * @tag 파일 생성
   * @tag 파일명 수정
   * @tag 파일 삭제
   * @tag 파일 관리
   * @tag 폴더 추가
   * @tag 폴더명 수정
   * @tag 폴더 삭제
   * @tag 폴더 관리
   * @tag 문서 작성
   * @tag 문서 공유
   * @tag 사진 저장
   * @tag 사진 공유
   * @tag 동영상 저장
   * @tag 동영상 공유
   * @tag 파일 검색
   * @tag 협업
   * @tag 문서 협업
   * @tag 파일 권한 설정
   * @tag 파일 암호화
   * @tag 문서 편집
   * @tag 파일 이동
   * @tag 구글 문서
   * @tag 구글 스위트
   * @tag 구글 시트
   * @tag 구글 닥스
   * @tag 구글 슬라이드
   * @tag 자료 공유
   * @tag 자료
   * @tag 구글 폼
   * @tag 설문 응답
   * @tag 파일 링크 생성
   * @tag 팀 드라이브
   * @tag Google Drive
   * @tag Drive
   * @tag Save
   * @tag Save File
   * @tag Save to Cloud
   * @tag Share File
   * @tag Sync File
   * @tag Update File
   * @tag Download File
   * @tag Create File
   * @tag Rename File
   * @tag Delete File
   * @tag Manage File
   * @tag Add Folder
   * @tag Rename Folder
   * @tag Delete Folder
   * @tag Manage Folder
   * @tag Create Document
   * @tag Share Document
   * @tag Save Photo
   * @tag Share Photo
   * @tag Save Video
   * @tag Share Video
   * @tag Search File
   * @tag Collaborate
   * @tag Collaborate on Document
   * @tag Set File Permissions
   * @tag Encrypt File
   * @tag Edit Document
   * @tag Move File
   * @tag Google Docs
   * @tag Google Suite
   * @tag Google Sheets
   * @tag Google Docs
   * @tag Google Slides
   * @tag Share Resources
   * @tag Resources
   * @tag Google Forms
   * @tag Survey Responses
   * @tag Create File Link
   * @tag Team Drive
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google_drive.svg",
  )
  @core.TypedRoute.Post("/file/:id/text")
  async createText(
    @Prerequisite({
      neighbor: () => GoogleDriveController.prototype.fileList,
      array: (response): IGoogleDrive.IFileListGoogleDriveOutput["data"] =>
        response.data,
      value: (elem): string => elem?.id ?? "",
      label: (elem): string => elem?.name ?? "",
    })
    @core.TypedParam("id")
    id: string,
    @core.TypedBody() input: IGoogleDrive.IAppendTextGoogleDriveInput,
  ): Promise<void> {
    return await this.googleDriveProvider.appendText(id, input);
  }

  /**
   * 파일에서 텍스트를 읽어옵니다.
   *
   * @summary 구글 드라이브 파일 텍스트 읽기.
   *
   * @param id 파일 고유 ID.
   *
   * @returns 파일 텍스트 내용.
   *
   * @tag Google-Drive
   * @tag 구글 드라이브
   * @tag 드라이브
   * @tag 저장
   * @tag 파일 저장
   * @tag 클라우드 저장
   * @tag 파일 공유
   * @tag 파일 동기화
   * @tag 파일 업데이트
   * @tag 파일 다운로드
   * @tag 파일 생성
   * @tag 파일명 수정
   * @tag 파일 삭제
   * @tag 파일 관리
   * @tag 폴더 추가
   * @tag 폴더명 수정
   * @tag 폴더 삭제
   * @tag 폴더 관리
   * @tag 문서 작성
   * @tag 문서 공유
   * @tag 사진 저장
   * @tag 사진 공유
   * @tag 동영상 저장
   * @tag 동영상 공유
   * @tag 파일 검색
   * @tag 협업
   * @tag 문서 협업
   * @tag 파일 권한 설정
   * @tag 파일 암호화
   * @tag 문서 편집
   * @tag 파일 이동
   * @tag 구글 문서
   * @tag 구글 스위트
   * @tag 구글 시트
   * @tag 구글 닥스
   * @tag 구글 슬라이드
   * @tag 자료 공유
   * @tag 자료
   * @tag 구글 폼
   * @tag 설문 응답
   * @tag 파일 링크 생성
   * @tag 팀 드라이브
   * @tag Google Drive
   * @tag Drive
   * @tag Save
   * @tag Save File
   * @tag Save to Cloud
   * @tag Share File
   * @tag Sync File
   * @tag Update File
   * @tag Download File
   * @tag Create File
   * @tag Rename File
   * @tag Delete File
   * @tag Manage File
   * @tag Add Folder
   * @tag Rename Folder
   * @tag Delete Folder
   * @tag Manage Folder
   * @tag Create Document
   * @tag Share Document
   * @tag Save Photo
   * @tag Share Photo
   * @tag Save Video
   * @tag Share Video
   * @tag Search File
   * @tag Collaborate
   * @tag Collaborate on Document
   * @tag Set File Permissions
   * @tag Encrypt File
   * @tag Edit Document
   * @tag Move File
   * @tag Google Docs
   * @tag Google Suite
   * @tag Google Sheets
   * @tag Google Docs
   * @tag Google Slides
   * @tag Share Resources
   * @tag Resources
   * @tag Google Forms
   * @tag Survey Responses
   * @tag Create File Link
   * @tag Team Drive
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google_drive.svg",
  )
  @core.TypedRoute.Post("get/file/:id")
  async readFile(
    @Prerequisite({
      neighbor: () => GoogleDriveController.prototype.fileList,
      array: (response): IGoogleDrive.IFileListGoogleDriveOutput["data"] =>
        response.data,
      value: (elem): string => elem?.id ?? "",
      label: (elem): string => elem?.name ?? "",
    })
    @core.TypedParam("id")
    id: string,
    @core.TypedBody()
    input: IGoogleDrive.ISecret,
  ): Promise<IGoogleDrive.IReadFileGoogleDriveOutput> {
    return await this.googleDriveProvider.readFile(id, input);
  }
}
