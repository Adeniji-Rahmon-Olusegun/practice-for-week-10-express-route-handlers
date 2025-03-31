// Phase 2
const {
  getAllArtists,
  getLatestArtist,
  getArtistByArtistId,
  addArtist,
  editArtistByArtistId,
  deleteArtistByArtistId,
  getAlbumsForLatestArtist,
  getAlbumsByArtistId,
  getAlbumByAlbumId,
  addAlbumByArtistId,
  editAlbumByAlbumId,
  deleteAlbumByAlbumId,
  getFilteredAlbums,
  getSongsByArtistId,
  getSongsByAlbumId,
  getSongBySongId,
  addSongByAlbumId,
  editSongBySongId,
  deleteSongBySongId
} = require('./data');

const express = require('express');
const app = express();

// Your code here
app.use(express.json());

app.use((req, res, next) => {
  console.log("Request Body:", req.body);
  next();
});

app.get('/artists', (req, res) => {
  const artists = getAllArtists();
  res.json(artists);
});

app.post('/artists', (req, res) => {
  const newData = addArtist(req.body);
  res.status(201).json(newData);
});

app.get('/artists/latest', (req, res) => {
  const latest = getLatestArtist();
  res.json(latest);
});

app.get('/artists/latest/albums', (req, res) => {
  const latestArtistAlbum = getAlbumsForLatestArtist();
  res.json(latestArtistAlbum);
});

app.get('/artists/:artistId', (req, res) => {
  const urlElements = req.url.split("/");
  urlElements[2] = Number(urlElements[2]);

  if (urlElements[1] === "artists" && typeof urlElements[2] === "number") {
    const artist = getArtistByArtistId(urlElements[2]);
    res.json(artist);
  }
});

app.put('/artists/:artistId', (req, res) => {
  const urlElements = req.url.split("/");
  urlElements[2] = Number(urlElements[2]);

  if (urlElements[1] === "artists" && typeof urlElements[2] === "number") {
    const edited = editArtistByArtistId(urlElements[2], req.body);
    res.json(edited);
  }
});

app.patch('/artists/:artistId', (req, res) => {
  const urlElements = req.url.split("/");
  urlElements[2] = Number(urlElements[2]);

  if (urlElements[1] === "artists" && typeof urlElements[2] === "number") {
    const edited = editArtistByArtistId(urlElements[2], req.body);
    res.json(edited);
  }
});

app.delete('/artists/:artistId', (req, res) => {
  const urlElements = req.url.split("/");
  urlElements[2] = Number(urlElements[2]);

  if (urlElements[1] === "artists" && typeof urlElements[2] === "number") {
    const deleted = deleteArtistByArtistId(urlElements[2]);
    res.json({message: "Successfully deleted"});
  }
});

app.get('/artists/:artistId/albums', (req, res) => {
  const urlElements = req.url.split("/");
  urlElements[2] = Number(urlElements[2]);
  const artistId = urlElements[2];

  if (urlElements[1] === "artists" && typeof artistId === "number" && urlElements[3] === "albums") {
    const albumsByArtistId = getAlbumsByArtistId(artistId);
    res.json(albumsByArtistId);
  }
});


app.get('/albums/:albumId', (req, res) => {
  const urlComponents = req.url.split("/");
  urlComponents[2] = Number(urlComponents[2]);
  const albumId = urlComponents[2];

  if (urlComponents[1] === "albums" && typeof albumId === "number") {
    const album = getAlbumByAlbumId(albumId);
    res.json(album);
  }
});

app.post('/artists/:artistId/albums', (req, res) => {
  const urlComponents = req.url.split("/");
  urlComponents[2] = Number(urlComponents[2]);
  const artistId = urlComponents[2];

  if (urlComponents[1] === "artists" && typeof artistId === "number" && urlComponents[3] === "albums") {
    const albumAdded = addAlbumByArtistId(artistId, req.body);
    res.status(201).json(albumAdded);
  }
});

app.put('/albums/:albumId', (req, res) => {
  const urlElements = req.url.split("/");
  urlElements[2] = Number(urlElements[2]);
  const albumId = urlElements[2];

  if (urlElements[1] === "albums" && typeof urlElements[2] === "number") {
    const editedAlbum = editAlbumByAlbumId(albumId, req.body);
    res.json(editedAlbum);
  }
});

app.patch('/albums/:albumId', (req, res) => {
  const urlElements = req.url.split("/");
  urlElements[2] = Number(urlElements[2]);
  const albumId = urlElements[2];

  if (urlElements[1] === "albums" && typeof urlElements[2] === "number") {
    const editedAlbum = editAlbumByAlbumId(albumId, req.body);
    res.json(editedAlbum);
  }
});

app.delete('/albums/:albumId', (req, res) => {
  const urlElements = req.url.split("/");
  urlElements[2] = Number(urlElements[2]);
  const albumId = urlElements[2];

  if (urlElements[1] === "albums" && typeof albumId === "number") {
    deleteAlbumByAlbumId(albumId);
    res.json({
      message: "Successfully deleted"
    });
  }
});

app.get('/albums', (req, res) => {
  const { startsWith } = req.query;

  const albums = getFilteredAlbums(startsWith);

  res.json(albums);
});

app.get('/songs/:songId', (req, res) => {
  const songId = req.params.songId;

  const song = getSongBySongId(songId);
  res.json(song);
});

app.post('/albums/:albumId/songs', (req, res) => {
  const albumId = req.params.albumId;

  const songAdded = addSongByAlbumId(albumId, req.body);

  res.status(201).json(songAdded);
});

app.get('/artists/:artistId/songs', (req, res) => {
  const artistId = req.params.artistId;

  const songs = getSongsByArtistId(artistId);

  res.json(songs);
});

app.get('/albums/:albumId/songs', (req, res) => {
  const albumId = req.params.albumId;

  const songs = getSongsByAlbumId(albumId);

  res.json(songs);
});

app.route('/songs/:songId')
  .put((req, res) => {
    const songId = req.params.songId;

    const editedSong = editSongBySongId(songId, req.body);
    
    res.json(editedSong);
  })
  .patch((req, res) => {
    const songId = req.params.songId;

    const editedSong = editSongBySongId(songId, req.body);
    
    res.json(editedSong);
  });

app.delete('/songs/:songId', (req, res) => {
  const songId = req.params.songId;

  deleteSongBySongId(songId);

  res.json({
    message: "Successfully deleted"
  });
});

// DO NOT MODIFY
if (require.main === module) {
  const port = 8000;
  app.listen(port, () => console.log('Server is listening on port', port));
} else {
  module.exports = app;
}