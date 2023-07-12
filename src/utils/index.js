const mapPlaylistToModelWithSong = (playlistData, songsData) => ({
  playlist: {
    id: playlistData.id,
    name: playlistData.name,
    username: playlistData.username,
    songs: songsData,
  },
});

module.exports = mapPlaylistToModelWithSong;
