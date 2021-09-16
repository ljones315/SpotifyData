const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();
const express = require('express');
const path = require('path');

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(process.env.ACCESS_TOKEN);
const tracks = [];

// spotifyApi.getMyTopTracks({ limit: 50, time_range: 'medium_term' })
//   .then(function(data) {
//     let topTracks = data.body.items;
//     topTracks.forEach(function(track, index) {
//       console.log((index + 1) + " " + track.name);
//     })
//   }, function(err) {
//     console.log('Something went wrong!', err);
//   });


const app = express();
const port = 3000;
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index', {tracks : tracks});
});

app.use('/public', express.static('public'));

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })



spotifyApi.getMyTopTracks({ limit: 50, time_range: 'medium_term' })
  .then(function(data) {
    let topTracks = data.body.items;
    topTracks.forEach(function(track, index) {
      tracks.push({index : index + 1, name : track.name});
    })
  }, function(err) {
    console.log('Something went wrong!', err);
  });

  

