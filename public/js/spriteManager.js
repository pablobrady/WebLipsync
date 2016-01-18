
var SpriteManager = function( initObj ) { 
console.log("SpriteManager ARRIVAL....", initObj);

  // Get canvas
  this.canvas = document.getElementById("cartoonCanvas");
  this.canvas.width = 200;
  this.canvas.height = 175;
  
  // Create sprite sheet
  this.spriteSheet = new Image();
  
  // Create sprite
  window.headSprite = new Sprite({
    context: this.canvas.getContext("2d"),
    width: 1400,
    height: 700,
    image: this.spriteSheet,
    numberOfFrames: 7,
    ticksPerFrame: 4
  });

  // Load sprite sheet
  this.spriteSheet.addEventListener("load", SpriteManager.prototype.gameLoop );
  this.spriteSheet.src = "images/ali_front_faces.png";

};

SpriteManager.prototype.gameLoop = function() {
    window.requestAnimationFrame( SpriteManager.prototype.gameLoop );

    window.headSprite.update();
    window.headSprite.render();
};

