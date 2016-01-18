/* 
  PLBAudioController.js - a very simple HTML5 audio controller, that's compatible with iPhone/iPad/Netscape/Chrome.  Amazing.

  
  Expects both MP3 and OGG files, in the form of...

  <audio id='audioPlayer' preload="none" loop controls autoplay>
    <source id="mp3Source" type="audio/mpeg" src="<your-path>/OceanBeach-LandsEndwFogHorn.mp3">
    <source id="oggSource" type="audio/ogg"  src="<your-path>/OceanBeach-LandsEndwFogHorn.ogg">
    Your browser does not support the audio element, please update your browser!
  </audio>

*/


var PLBAudioController = function( playerId ) {
  this.playerId = playerId;
  this.audioPlayerElement = document.getElementById( playerId );
  this.isPlaying = false;
};

PLBAudioController.prototype.loadThenPlay = function( anMP3AudioURL ) {
  var anOGGAudioURL = anMP3AudioURL.replace(".mp3", ".ogg"); // Extract .ogg filename

  document.getElementById('mp3Source').src = anMP3AudioURL;
  document.getElementById('oggSource').src = anOGGAudioURL;

  this.audioPlayerElement.load();
  this.audioPlayerElement.play();
  this.isPlaying = true;  // Playback repeats, so playback can never end.

  return true;
};

PLBAudioController.prototype.pause = function() {
  this.audioPlayerElement.pause();
  this.isPlaying = false;
  return true;
};

PLBAudioController.prototype.play = function() {
  this.audioPlayerElement.play();

  return true;
};
