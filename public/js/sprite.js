
/*
var Sprite = function (options) {

  var that = {},
    frameIndex = 0,
    tickCount = 0,
    ticksPerFrame = options.ticksPerFrame || 0,
    numberOfFrames = options.numberOfFrames || 1;

  that.context = options.context;
  that.width = options.spriteSheetWidth;
  that.height = options.spriteSheetHeight;
  that.image = options.image;
  that.lipsyncData = [ [0,0], [1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [0,0], [1,0], [2,0], [3,0], [4,0], [5,0], [6,0] ];  // !!!!! // options.lipsyncData;
  var lipsyncDataLen = that.lipsyncData.length;


console.log("CHKPT 1: " + options.lipsyncData);
console.log("CHKPT 2: " + that.lipsyncData);

console.log("CHKPT 3: " + options.headWidth);
console.log("CHKPT 4: " + that.headWidth);

  that.update = function () {
    tickCount += 1;

    if (tickCount > ticksPerFrame) {
      tickCount = 0;

      // If the current frame index is in range
      if (frameIndex < numberOfFrames - 1) {  
        // Go to the next frame
        frameIndex += 1;
      } else {
        frameIndex = 0;
      }
    }
  };

  that.render = function () {

    // Clear the canvas
    that.context.clearRect(0, 0, that.width, that.height);

// console.log("HEAD: ", options.lipsyncData[frameIndex][0] + " that.width = " + that.width + " numberOfFrames = " + numberOfFrames);
/// console.log("LOCALS: " + frameIndex + " * " + that.width + "/" + numberOfFrames );
/// console.log("drawImage:: -, " + frameIndex * that.width / numberOfFrames + ", -0-, " + that.width / numberOfFrames + ", " + that.height)

    // Draw the animation
    that.context.drawImage(
      that.image,
      frameIndex * that.width / numberOfFrames,
      0,
      that.width / numberOfFrames,
      that.height,
      0,
      0,
      that.width / numberOfFrames,
      that.height);

  };

  return that;
};
*/