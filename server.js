const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();

const express = require('express');
const path = require('path');
const open = require('open');

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(process.env.ACCESS_TOKEN);
const tracks1 = []; 
const tracks2 = [];
const tracks3 = []; 
const artists1 = []; 
const artists2 = []; 
const artists3 = [];

const app = express();
const port = 3000;
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index', {tracks1 : tracks1, artists1: artists1, tracks2 : tracks2, artists2: artists2, 
    tracks3 : tracks3, artists3: artists3});
});

app.use('/public', express.static('public'));

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })



spotifyApi.getMyTopTracks({ limit: 50, time_range: 'short_term' })
  .then(function(data) {
    let topTracks = data.body.items;
    topTracks.forEach(function(track, index) {
      tracks1.push({index : index + 1, name : track.name, artist: track.artists[0].name, image : track.album.images[2].url});
    })
  }, function(err) {
    console.log('Something went wrong!', err);
  });

  spotifyApi.getMyTopArtists({ limit: 50, time_range: 'short_term'})
  .then(function(data) {
    let topArtists = data.body.items;
    topArtists.forEach(function(artist, index) {
      artists1.push({index : index + 1, name : artist.name, image : artist.images[2].url});
    })
    console.log(topArtists[0].images[0].url);
  }, function(err) {
    console.log('Something went wrong!', err);
  });

  spotifyApi.getMyTopTracks({ limit: 50, time_range: 'medium_term' })
  .then(function(data) {
    let topTracks = data.body.items;
    topTracks.forEach(function(track, index) {
      tracks2.push({index : index + 1, name : track.name, artist: track.artists[0].name, image : track.album.images[2].url});
    })
  }, function(err) {
    console.log('Something went wrong!', err);
  });

  spotifyApi.getMyTopArtists({ limit: 50, time_range: 'medium_term'})
  .then(function(data) {
    let topArtists = data.body.items;
    topArtists.forEach(function(artist, index) {
      artists2.push({index : index + 1, name : artist.name, image : artist.images[2].url});
    })
    console.log(topArtists[0].images[0].url);
  }, function(err) {
    console.log('Something went wrong!', err);
  });

  spotifyApi.getMyTopTracks({ limit: 50, time_range: 'long_term' })
  .then(function(data) {
    let topTracks = data.body.items;
    topTracks.forEach(function(track, index) {
      tracks3.push({index : index + 1, name : track.name, artist: track.artists[0].name, image : track.album.images[2].url});
    })
  }, function(err) {
    console.log('Something went wrong!', err);
  });

  spotifyApi.getMyTopArtists({ limit: 50, time_range: 'long_term'})
  .then(function(data) {
    let topArtists = data.body.items;
    topArtists.forEach(function(artist, index) {
      artists3.push({index : index + 1, name : artist.name, image : artist.images[2].url});
    })
    console.log(topArtists[0].images[0].url);
  }, function(err) {
    console.log('Something went wrong!', err);
  });

open('http://localhost:3000');

