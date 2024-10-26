import axios from 'axios'; import { Injectable } from '@nestjs/common'; import { ISpotify } from '../../api/structures/spotify/ISpotify'; @Injectable() export class SpotifyProvider { async createPlaylist(input: ISpotify.ICreatePlaylistInput): Promise<ISpotify.ICreatePlaylistOutput> { const response = await axios.post('https://api.spotify.com/v1/users/{user_id}/playlists', input, { headers: { Authorization: `Bearer ${accessToken}` } }); return response.data; } }