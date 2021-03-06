window.lipsyncSpeed = 1.0; // 1.0 is full speed

window.lipsyncEnum = {};
window.lipsyncEnum.spriteType = {
  LIPSYNCED : 1,
  STATIC : 2
};

window.globalAppSettings = {
  aliHead_x: 375,
  aliHead_y: 80,
  aliBody_x: 300,
  aliBody_y: 60,
  aliBody_width: 481,
  aliBody_height: 629,
  cartoonCanvasWidth: 1000,
  cartoonCanvasHeight: 750
};

var lipsMgr = new LipSyncManager( {
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
  soundFile: 'audio/ali_intro.mp3',
  lipsyncData:  externalLipsyncData,
  headId: 'aliHead-01'
} );


// Control Buttons
document.querySelector('#stopButton').addEventListener('click', function() {
  lipsMgr.stop();
});
document.querySelector('#playButton').addEventListener('click', function() {
  lipsMgr.play();
});


/////////////////


//////
// Sprite Animation Prep 
// RequestAnimationFrame for Smart Animating
//////
(function() {
  // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
  // requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
  // MIT license

    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

//////////////
// Sprite Animation Loop
// Based on work by William Malone ( http://bit.ly/UjwpCM )
//////////////

(function () {

  var bodySprite,
      bodyImage,
      headSprite,
      headImage,
      canvas;         

  function gameLoop () {
  
    window.requestAnimationFrame(gameLoop);

    headSprite.update();

    bodySprite.render();
    headSprite.render();
  }
  
  function sprite (options) {
  
    var that = {},
      frameIndex = 0,
      tickCount = 0,
      ticksPerFrame = options.ticksPerFrame || 0,
      numberOfFrames = options.numberOfFrames || 1;
    
    that.spriteType = options.spriteType;

    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;
    
    that.update = function () {
      if( that.spriteType != window.lipsyncEnum.spriteType.LIPSYNCED ) return;

      tickCount += 1;

      if (tickCount > ticksPerFrame) {
        tickCount = 0;
        if (frameIndex < numberOfFrames - 1) {  
          // Go to the next frame
          frameIndex += 1;
        } else {
          frameIndex = 0;
        }
      }
    };
    
    that.render = function () {
    
      if( options.spriteType === window.lipsyncEnum.spriteType.STATIC ) {
        // Clear the canvas
        that.context.clearRect(0, 0, window.globalAppSettings.cartoonCanvasWidth, window.globalAppSettings.cartoonCanvasWidth);


        // Draw the Ali Body
        that.context.drawImage(
          that.image,
          0, // position on source canvas
          0,
          window.globalAppSettings.aliBody_width,
          window.globalAppSettings.aliBody_height,
          window.globalAppSettings.aliBody_x,   // position to draw on canvas
          window.globalAppSettings.aliBody_y,
          window.globalAppSettings.aliBody_width,
          window.globalAppSettings.aliBody_height
        );
      } else if( options.spriteType === lipsyncEnum.spriteType.LIPSYNCED ) {

        // Draw the animated Ali Head/Mouth
        that.context.drawImage(
          that.image,
          Number( lipsMgr.getCurrentHeadId() ) * lipsMgr.headWidth, // MOUTH position on source canvas
          Number( lipsMgr.getCurrentExpressionId() ) * lipsMgr.headHeight,      // 175 * expression
          lipsMgr.headWidth,  // that.width / numberOfFrames,
          lipsMgr.headHeight, // that.height,
          window.globalAppSettings.aliHead_x,   // position to draw on canvas
          window.globalAppSettings.aliHead_y,
          lipsMgr.headWidth,
          lipsMgr.headHeight
        );
      }
    };

    return that;
  }
  
  // Get entire canvas
  canvas = document.getElementById("cartoonCanvas");
  canvas.width = 1000;
  canvas.height = 750;
  
  // Create Image
  bodyImage = new Image();

  // Load sprite sheet
  bodyImage.src = "images/ali_body.png";

  // Create Body Sprite
  bodySprite = sprite({
    spriteType: window.lipsyncEnum.spriteType.STATIC,
    context: canvas.getContext("2d"),
    width: 1400,
    height: 700,
    image: bodyImage,
    numberOfFrames: 1,
    ticksPerFrame: 0
  });


  // Create Image
  headImage = new Image();

  // Load sprite sheet
  headImage.addEventListener("load", gameLoop);
  headImage.src = "images/ali_front_faces.png";

  // Create sprite
  headSprite = sprite({
    spriteType: window.lipsyncEnum.spriteType.LIPSYNCED,
    context: canvas.getContext("2d"),
    width: 1400,
    height: 700,
    image: headImage,
    numberOfFrames: lipsMgr.phonemes,
    ticksPerFrame: 4
  });



} ());