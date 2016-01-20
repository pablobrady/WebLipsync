var LipSyncManager = function( initObj ) { 
  this.currentHeadId = 0;
  this.currentHeadIndex = 0;
  this.lipsyncDataLength = 0;

  if (!this.initObj) { this.initObj={}; }

  if (initObj.hasOwnProperty('canvasId')) { this.canvasId = initObj.canvasId;  } 
  else { this.canvasId = this.getDefaults()['canvasId']; }

  if (initObj.hasOwnProperty('spriteSheetFilename')) { this.spriteSheetFilename = initObj.spriteSheetFilename;  } 
  else { this.spriteSheetFilename = this.getDefaults()['spriteSheetFilename']; }

  if (initObj.hasOwnProperty('fps')) { this.fps = initObj.fps;  } 
  else { this.fps = this.getDefaults()['fps']; }

  if (initObj.hasOwnProperty('phonemes')) { this.phonemes = initObj.phonemes;  } 
  else { this.phonemes = this.getDefaults()['phonemes']; }

  if (initObj.hasOwnProperty('headWidth')) { this.headWidth = initObj.headWidth;  } 
  else { this.headWidth = this.getDefaults()['headWidth']; }

  if (initObj.hasOwnProperty('headHeight')) { this.headHeight = initObj.headHeight;  } 
  else { this.headHeight = this.getDefaults()['headHeight']; }

  if (initObj.hasOwnProperty('spriteSheetWidth')) { this.spriteSheetWidth = initObj.spriteSheetWidth;  } 
  else { this.spriteSheetWidth = this.getDefaults()['spriteSheetWidth']; }

  if (initObj.hasOwnProperty('spriteSheetHeight')) { this.spriteSheetHeight = initObj.spriteSheetHeight;  } 
  else { this.spriteSheetHeight = this.getDefaults()['spriteSheetHeight']; }

  if (initObj.hasOwnProperty('expressions')) { this.expressions = initObj.expressions;  } 
  else { this.expressions = this.getDefaults()['expressions']; }

  if (initObj.hasOwnProperty('audioPlayerId')) { 
    this.audioPlayerId = initObj.audioPlayerId; 
  } else { 
    this.audioPlayerId = this.getDefaults()['audioPlayerId'];
  }
  this.audioPlayerElement = document.getElementById( this.audioPlayerId );

  if (initObj.hasOwnProperty('soundFile')) { this.soundFile = initObj.soundFile;  } 
  else { 
    this.soundFile = this.getDefaults()['soundFile']; 
    console.log("LipSyncManager ERROR:  No soundFile specified.  Using default '" + this.soundFile + "'.");
  }

  if (initObj.hasOwnProperty('lipsyncData')) { this.lipsyncData = initObj.lipsyncData;  } 
  else { 
    this.lipsyncData = this.getDefaults()['lipsyncData']; 
    console.log("LipSyncManager ERROR:  No LipsyncData specified.  Using default.");
  }
  this.lipsyncDataLength = this.lipsyncData.length;

  if (initObj.hasOwnProperty('headId')) { this.headId = initObj.headId;  } 
  else { 
    this.headId = this.getDefaults()['headId']; 
    console.log("LipSyncManager ERROR:  No headId specified.  Using default '" + this.headId + "'.");
  }
  this.headElement = document.getElementById( this.headId );

  if (initObj.hasOwnProperty('onReady')) { this.onReady = initObj.onReady;  } 
  else { 
    this.onReady = this.getDefaults()['onReady']; 
    console.log("LipSyncManager WARNING:  No 'onReady' function specified.");
  }

  console.log("LipSyncManager::canvasId = " + this.canvasId );
  console.log("LipSyncManager::fps = " + Number(this.fps) );
  console.log("LipSyncManager::phonemes = " + Number(this.phonemes) );
  console.log("LipSyncManager::headWidth = " + Number(this.headWidth) );
  console.log("LipSyncManager::headHeight = " + Number(this.headHeight) );
  console.log("LipSyncManager::expressions = " + Number(this.expressions) );
  console.log("LipSyncManager::audioPlayerId = " + this.audioPlayerId );

  console.log("LipSyncManager::soundFile = " + this.soundFile );
  console.log("LipSyncManager::lipsyncData = " + this.lipsyncData );
  console.log("LipSyncManager::headId = " + this.headId );

  // !!!!! remove - var spriteManager = new SpriteManager();

  this.loadAudio(this.soundFile);
  // this.audioPlayerElement.play();

  // this.onReady(); //  -- Call this after LIPS and .MP3 have loaded.
};

LipSyncManager.prototype.getDefaults = function() {
  console.log("getDefault arrival.");
  return {
    canvasId: 'cartoonCanvas',
    spriteSheetFilename: 'images/ali_front_faces.png',
    fps: 12,
    phonemes: 6,
    headWidth: 200,
    headHeight: 175,
    spriteSheetWidth: 1400,
    spriteSheetHeight: 700,
    expressions: 0,
    audioPlayerId: 'audioPlayerId',
    soundFile: 'audio/defaultAudio.mp3',
    lipsyncData:  [ [1,0] ],
    headId: 'headId',
    onReady: function( cb ) {
      console.log("Default onReady callback!  Will play ASAP.");
      this.play( this.headIdStr );
    }
  }
}

LipSyncManager.prototype.loadAudio = function( anMP3AudioURL ) {
  console.log("MP3 Audio:  " + anMP3AudioURL);
  var anOGGAudioURL = anMP3AudioURL.replace(".mp3", ".ogg"); // Extract .ogg filename

  document.getElementById('mp3Source').src = anMP3AudioURL;
  // document.getElementById('oggSource').src = anOGGAudioURL;

  this.audioPlayerElement.load();
  this.play()
  return true;
};

LipSyncManager.prototype.setSpriteSheetFilename = function( spriteSheetFilename ) { 
  this.setSpriteSheetFilename = spriteSheetFilename;

}

LipSyncManager.prototype.setFrame = function( frameNum, expressionNum ) { 
  console.log("setFrame arrival!!!!!");
  // this.headElement.style["transform"] = "rotate(70deg)";
  // this.headElement.

}

LipSyncManager.prototype.play = function() { 
  // One headId per soundfile.  We handle only a single headId for now.
  console.log("LipSyncManager::play!");

  // Start Audio
  // this.audioPlayerElement.playbackRate = 0.5; // !!!!!
  this.audioPlayerElement.play(); // Play the HTML element

  // Start Head Animation
  this.currentHeadIndex = 0;
  this.currentHeadId = 0;
  this.startTimerTick();
};

//// 

LipSyncManager.prototype.startTimerTick = function () {
  if ( window.lipsyncManagerTimeout ) { clearTimeout( window.lipsyncManagerTimeout ); }

  var scope = this;
  window.lipsyncManagerTimeout = setTimeout( scope.updateTimedHeadIndex.bind(scope) , 1000 / this.fps ); 

};


LipSyncManager.prototype.updateTimedHeadIndex = function() {
  this.currentHeadIndex = this.currentHeadIndex + 1;
  if( this.currentHeadIndex < this.lipsyncDataLength ) {
    this.startTimerTick(); // Do another tick...
    return;
  }
}

//// 

LipSyncManager.prototype.getCurrentHeadId = function () {
  if ( this.currentHeadIndex >= this.lipsyncDataLength ) { return this.lipsyncData[0][0]; } // Guard

  console.log("LIP SYNC INDEX: " + (this.currentHeadIndex + 80) + " --> " + this.lipsyncData[this.currentHeadIndex][0] );

  // console.log("[" + this.lipsyncData[this.currentHeadIndex][0] + "," + this.lipsyncData[this.currentHeadIndex][1] + "]" );

  return this.lipsyncData[this.currentHeadIndex][0];
}

LipSyncManager.prototype.getCurrentExpressionId = function () {
  if ( this.currentHeadIndex >= this.lipsyncDataLength ) { return this.lipsyncData[0][1]; } // Guard

  return this.lipsyncData[this.currentHeadIndex][1];
}




