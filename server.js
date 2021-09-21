const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();

const express = require('express');
const path = require('path');
const open = require('open');

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(process.env.ACCESS_TOKEN);
const tracks = [];
const artists = [];

const app = express();
const port = 3000;
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index', {tracks : tracks, artists: artists});
});

app.use('/public', express.static('public'));

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })



spotifyApi.getMyTopTracks({ limit: 50, time_range: 'short_term' })
  .then(function(data) {
    let topTracks = data.body.items;
    topTracks.forEach(function(track, index) {
      tracks.push({index : index + 1, name : track.name, artist: track.artists[0].name});
    })
  }, function(err) {
    console.log('Something went wrong!', err);
  });

  spotifyApi.getMyTopArtists({ limit: 50, time_range: 'short_term'})
  .then(function(data) {
    let topArtists = data.body.items;
    topArtists.forEach(function(artist, index) {
      artists.push({index : index + 1, name : artist.name, image : artist.images[2].url});
    })
    console.log(topArtists[0].images[0].url);
  }, function(err) {
    console.log('Something went wrong!', err);
  });


open('http://localhost:3000');

