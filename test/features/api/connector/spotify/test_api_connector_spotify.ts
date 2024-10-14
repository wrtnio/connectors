import CApi from "@wrtn/connector-api/lib/index";
import { ISpotify } from "@wrtn/connector-api/lib/structures/connector/spotify/ISpotify";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

// 사용자 플레이리스트 가져오기 테스트
export const test_api_connector_spotify_get_user_playlists = async (
  connection: CApi.IConnection,
) => {
  const input: ISpotify.IGetUserPlaylistsInput = {
    secretKey: ConnectorGlobal.env.SPOTIFY_TEST_SECRET, // Spotify API 호출을 위한 시크릿 키
    limit: 10, // 가져올 플레이리스트의 수
    offset: 0, // 시작 위치
  };

  const res =
    await CApi.functional.connector.spotify.get_user_playlists.getUserPlaylists(
      connection,
      input,
    );

  typia.assert(res);
  console.log("사용자 플레이리스트:", res.playlists);
};

// 아티스트 앨범 가져오기 테스트
export const test_api_connector_spotify_get_artist_albums = async (
  connection: CApi.IConnection,
) => {
  const input: ISpotify.IGetArtistAlbumsInput = {
    secretKey: ConnectorGlobal.env.SPOTIFY_TEST_SECRET,
    artistId: "artist_id_here", // 아티스트 ID
  };

  const res =
    await CApi.functional.connector.spotify.get_artist_albums.getArtistAlbums(
      connection,
      input,
    );

  typia.assert(res);
  console.log("아티스트 앨범:", res.albums);
};

// 현재 재생 중인 트랙 가져오기 테스트
export const test_api_connector_spotify_get_current_playing_track = async (
  connection: CApi.IConnection,
) => {
  const input: ISpotify.IGetCurrentPlayingTrackInput = {
    secretKey: ConnectorGlobal.env.SPOTIFY_TEST_SECRET,
  };

  const res =
    await CApi.functional.connector.spotify.get_current_playing_track.getCurrentPlayingTrack(
      connection,
      input,
    );

  typia.assert(res);
  console.log("현재 재생 중인 트랙:", res.track);
};

// 플레이리스트 생성 테스트
export const test_api_connector_spotify_create_playlist = async (
  connection: CApi.IConnection,
) => {
  const input: ISpotify.ICreatePlaylistInput = {
    secretKey: ConnectorGlobal.env.SPOTIFY_TEST_SECRET,
    userId: "user_id_here", // 사용자 ID
    playlistName: "New Playlist", // 생성할 플레이리스트 이름
  };

  const res =
    await CApi.functional.connector.spotify.create_playlist.createPlaylist(
      connection,
      input,
    );

  typia.assert(res);
  console.log("생성된 플레이리스트 ID:", res.playlistId);
};

// 추천 트랙 가져오기 테스트
export const test_api_connector_spotify_get_recommendations = async (
  connection: CApi.IConnection,
) => {
  const input: ISpotify.IGetRecommendationsInput = {
    secretKey: ConnectorGlobal.env.SPOTIFY_TEST_SECRET,
    seedTracks: ["track_id_1", "track_id_2"], // 추천을 위한 시드 트랙 ID
  };

  const res =
    await CApi.functional.connector.spotify.get_recommendations.getRecommendations(
      connection,
      input,
    );

  typia.assert(res);
  console.log("추천 트랙:", res.tracks);
};
