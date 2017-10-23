  var trackList;
  var linktoSong;
(function(ENV) {
  const client_id = ENV.client_id;

  // Set Variables
  var firstTrack;
  // var trackList;
  var currentTrack;
  var imgURL;
  var trackName;
  // var linktoSong;

  // Auth with
  SC.initialize({
    client_id: client_id
  });

  //get tracks I want
  SC.get('/tracks', {
    q: 'Anthony Brown',
    genres: 'gospel'
  }).then(function(tracks) {
    trackList = tracks;
    x = 0;
    firstTrack = trackList[x].id;




    SC.stream('/tracks/' + firstTrack).then(function(player) {

      //Grab Song Permalink
      linktoSong = trackList[x].permalink_url;
      document.querySelector('a.link').href = linktoSong;

      //Grab and Display Art
      imgURL = trackList[x].artwork_url;
      (function() {
        if (!imgURL) {
          return './img/empty.png';
          document.body.style.backgroundColor = "#000";
        } else {
          document.querySelector('.art').src = imgURL;
          document.body.style.background = "url(" + imgURL + ") no-repeat";
        };
      })();
      //Grab and Display Track Name
      trackName = trackList[x].title;
      document.querySelector('.name').innerHTML = "<a href=" + linktoSong + " target='_blank'>" + trackName; + "</a>";

      //Buttons
      (function btns() {
        function playSongs() {
          player.play();
          document.querySelector('.eq').classList.add('visible')
        }
        var playBtn = document.querySelector('.play');
        playBtn.addEventListener('click', playSongs);

        function pauseSongs() {
          player.pause();
          document.querySelector('.eq').classList.remove('visible')
        }
        var pauseBtn = document.querySelector('.pause');
        pauseBtn.addEventListener('click', pauseSongs);

        function stopSongs() {
          player.pause();
          player.seek(0);
          document.querySelector('.eq').classList.remove('visible')
        }
        var stopBtn = document.querySelector('.stop');
        stopBtn.addEventListener('click', stopSongs);
      })();

      function nextSong() {
        x++;
        SC.stream('/tracks/' + trackList[x++].id).then(function(player) {
          //Grab and Display Art
          imgURL = trackList[x].artwork_url;
          (function() {
            if (!imgURL) {
              return './img/empty.png';
              document.body.style.backgroundColor = "#000";
            } else {
              document.querySelector('.art').src = imgURL;
              document.body.style.background = "url(" + imgURL + ") no-repeat";
            };
          })();
          //Grab and Display Track Name
          trackName = trackList[x].title;
          document.querySelector('.name').innerHTML = "<a href=" + linktoSong + " target='_blank'>" + trackName; + "</a>";

          player.play();
          document.querySelector('.eq').classList.add('visible')

          //Buttons
          function playSongs() {
            player.play();
            document.querySelector('.eq').classList.add('visible');
          }
          var playBtn = document.querySelector('.play');
          playBtn.addEventListener('click', playSongs);

          function pauseSongs() {
            player.pause();
            document.querySelector('.eq').classList.remove('visible');
          }
          var pauseBtn = document.querySelector('.pause');
          pauseBtn.addEventListener('click', pauseSongs);

          function stopSongs() {
            player.pause();
            player.seek(0);
            document.querySelector('.eq').classList.remove('visible');
          }
          var stopBtn = document.querySelector('.stop');
          stopBtn.addEventListener('click', stopSongs);

        }); //close nested SC stream
      }

      var nextBtn = document.querySelector('.next');
      nextBtn.addEventListener('click', nextSong);
    }); // close SC.stream wrapper


  }); // close SC.get
})(ENV)
