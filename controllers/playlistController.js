const Playlist = require('../models/playlist');

exports.getAllSongs = (req, res) => {
  const songs = Playlist.getAll();
  res.json(songs);
};

exports.addSong = (req, res) => {
  const { title, artists, url } = req.body;
  if (!title || !artists || !url) {
    return res.status(400).json({ error: 'Please provide title, artists, and URL for the song' });
  }

  const newSong = Playlist.addSong(title, artists, url);
  res.json(newSong);
};

exports.playSong = (req, res) => {
  const { title } = req.params;
  Playlist.increasePlayCount(title);
  res.json({ message: `${title} is now being played` });
};

exports.getSortedSongsByPlayCount = (req, res) => {
  const sortedSongs = Playlist.sortByPlayCount();
  res.json(sortedSongs);
};

exports.updateSong = (req, res) => {
  const { title } = req.params;
  const { artists, url } = req.body;
  const updatedSong = Playlist.updateSong(title, artists, url);
  if (!updatedSong) {
    return res.status(404).json({ error: 'Song not found' });
  }
  res.json(updatedSong);
};

exports.updatePlayCount = (req, res) => {
  const { title } = req.params;
  Playlist.increasePlayCount(title);
  res.json({ message: `${title} play count updated` });
};

exports.deleteSong = (req, res) => {
  const { title } = req.params;
  const deletedSong = Playlist.deleteSong(title);
  if (!deletedSong) {
    return res.status(404).json({ error: 'Song not found' });
  }
  res.json(deletedSong);
};
