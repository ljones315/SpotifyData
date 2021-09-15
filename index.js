const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(process.env.SPOTIFY_ACCESS_TOKEN);

spotifyApi.getMyTopTracks({ limit: 50, time_range: 'medium_term' })
  .then(function(data) {
    let topTracks = data.body.items;
    topTracks.forEach(function(track, index) {
      console.log((index + 1) + " " + track.name);
    })
  }, function(err) {
    console.log('Something went wrong!', err);
  });
