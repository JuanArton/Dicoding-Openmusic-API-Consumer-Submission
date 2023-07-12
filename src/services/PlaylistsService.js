const { Pool } = require('pg');
const mapPlaylistToModelWithSong = require('../utils');

class NotesService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistSong(id) {
    const queryPlaylist = {
      text: `SELECT playlists.id, playlists.name FROM playlists
      LEFT JOIN users ON playlists.owner = users.id WHERE playlists.id = $1`,
      values: [id],
    };

    const querySong = {
      text: `SELECT songs.id, songs.title, songs.performer FROM playlist_songs
      JOIN songs on playlist_songs.song_id = songs.id WHERE playlist_id = $1`,
      values: [id],
    };

    const resultPlaylist = await this._pool.query(queryPlaylist);
    const resultSong = await this._pool.query(querySong);

    return mapPlaylistToModelWithSong(resultPlaylist.rows[0], resultSong.rows);
  }
}

module.exports = NotesService;
