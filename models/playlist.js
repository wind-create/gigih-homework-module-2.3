const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(__dirname, '..', 'data/playlist.json');

let playlists = [];

class Playlist {
  constructor(title, artists, url) {
    this.title = title;
    this.artists = artists;
    this.url = url;
    this.playCount = 0;
  }

  static loadData() {
    try {
      const data = fs.readFileSync(dataFilePath, 'utf8');
      playlists = JSON.parse(data);
    } catch (error) {
      console.error('Error reading data file:', error);
      playlists = [];
    }
  }

  static saveData() {
    try {
      const data = JSON.stringify(playlists, null, 2);
      fs.writeFileSync(dataFilePath, data, 'utf8');
    } catch (error) {
      console.error('Error writing data file:', error);
    }
  }

  static getAll() {
    return playlists;
  }

  static addSong(title, artists, url) {
    const newSong = new Playlist(title, artists, url);
    playlists.push(newSong);
    Playlist.saveData();
    return newSong;
  }

  static increasePlayCount(title) {
    const song = playlists.find((item) => item.title === title);
    if (song) {
      song.playCount++;
      Playlist.saveData();
    }
  }

  static sortByPlayCount() {
    return playlists.slice().sort((a, b) => b.playCount - a.playCount);
  }

  static updateSong(title, artists, url) {
    const songIndex = playlists.findIndex((item) => item.title === title);
    if (songIndex !== -1) {
      playlists[songIndex].artists = artists;
      playlists[songIndex].url = url;
      Playlist.saveData();
      return playlists[songIndex];
    }
    return null;
  }

  static deleteSong(title) {
    const songIndex = playlists.findIndex((item) => item.title === title);
    if (songIndex !== -1) {
      const deletedSong = playlists.splice(songIndex, 1)[0];
      Playlist.saveData();
      return deletedSong;
    }
    return null;
  }
}

Playlist.loadData();

module.exports = Playlist;
