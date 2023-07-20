const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');

router.get('/songs', playlistController.getAllSongs);
router.post('/songs', playlistController.addSong);
router.get('/songs/:title', playlistController.playSong);
router.get('/sorted-songs', playlistController.getSortedSongsByPlayCount);
router.put('/songs/:title', playlistController.updateSong);
router.delete('/songs/:title', playlistController.deleteSong);

module.exports = router;
