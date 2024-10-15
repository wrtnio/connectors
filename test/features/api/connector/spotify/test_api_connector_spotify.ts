import CApi from "@wrtn/connector-api/lib/index";
import { ISpotify } from "@wrtn/connector-api/lib/structures/connector/spotify/ISpotify";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

// OK
export const test_api_connector_spotify_search_artists = async (
  connection: CApi.IConnection,
) => {
  const input: ISpotify.ISearchArtistsInput = {
    artistName: "BTS",
    secretKey: ConnectorGlobal.env.SPOTIFY_TEST_SECRET, // Spotify API 호출을 위한 시크릿 키
    limit: 5,
  };

  const res =
    await CApi.functional.connector.spotify.search_artists.searchArtists(
      connection,
      input,
    );

  typia.assert(res);
  return res;
};

// OK
export const test_api_connector_spotify_get_users_top_artists = async (
  connection: CApi.IConnection,
) => {
  const input: ISpotify.IGetUsersTopArtistsInput = {
    secretKey: ConnectorGlobal.env.SPOTIFY_TEST_SECRET, // Spotify API 호출을 위한 시크릿 키
    timeRange: "long_term", // 시간 범위
    limit: 10, // 가져올 아티스트의 수
    offset: 0, // 시작 위치
  };

  const res =
    await CApi.functional.connector.spotify.get_users_top_artists.getUsersTopArtists(
      connection,
      input,
    );

  typia.assert(res); // 타입 체크
};

// OK
// 트랙 추천 기능 테스트
export const test_api_connector_spotify_get_recommended_tracks = async (
  connection: CApi.IConnection,
) => {
  const artists = await test_api_connector_spotify_search_artists(connection);
  const input: ISpotify.IGetRecommendedTracksInput = {
    secretKey: ConnectorGlobal.env.SPOTIFY_TEST_SECRET, // Spotify API 호출을 위한 시크릿 키
    seedArtists: artists.artists.map((el) => el.id), // 추천을 위한 시드 아티스트 ID
    limit: 10, // 가져올 아티스트의 수
    offset: 0, // 시작 위치
  };

  const res =
    await CApi.functional.connector.spotify.get_recommended_tracks.getRecommendedTracks(
      connection,
      input,
    );

  typia.assert(res); // 타입 체크

  return res;
};

// OK
export const test_api_connector_spotify_get_artist = async (
  connection: CApi.IConnection,
) => {
  const artists = await test_api_connector_spotify_search_artists(connection);
  const res = await CApi.functional.connector.spotify.get_artists.getArtists(
    connection,
    {
      secretKey: ConnectorGlobal.env.SPOTIFY_TEST_SECRET, // Spotify API 호출을 위한 시크릿 키
      artistIds: artists.artists.map((el) => el.id),
    },
  );

  typia.assert(res);
  return res;
};

// OK
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
};

// 아티스트 앨범 가져오기 테스트
export const test_api_connector_spotify_get_artist_albums = async (
  connection: CApi.IConnection,
) => {
  const artists = await test_api_connector_spotify_search_artists(connection);
  const input: ISpotify.IGetArtistAlbumsInput = {
    secretKey: ConnectorGlobal.env.SPOTIFY_TEST_SECRET,
    artistId: artists.artists[0].id, // 아티스트 ID
  };

  const res =
    await CApi.functional.connector.spotify.get_artist_albums.getArtistAlbums(
      connection,
      input,
    );

  typia.assert(res);
};

// 플레이리스트 생성 테스트
export const test_api_connector_spotify_create_playlist = async (
  connection: CApi.IConnection,
) => {
  const input: ISpotify.ICreatePlaylistInput = {
    secretKey: ConnectorGlobal.env.SPOTIFY_TEST_SECRET,
    userId: "user_id_here", // 사용자 ID
    playlistName: "New Playlist", // 생성할 플레이리스트 이름
    public: false,
  };

  const res =
    await CApi.functional.connector.spotify.create_playlist.createPlaylist(
      connection,
      input,
    );

  typia.assert(res);
};
