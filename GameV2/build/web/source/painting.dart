part of games;

class Painting extends DisplayObjectContainer {
  final List<int> colors = [Color.Red, Color.Green, Color.Blue, Color.Brown];

  Painting() {
    var background = new BitmapData(400, 300, Color.BlanchedAlmond);
    var backgroundBitmap = new Bitmap(background);
    addChild(backgroundBitmap);

    for(var i = 0; i < colors.length; i++) {
      var box = new BitmapData(100, 100, colors[i]);
      var boxBitmap = new Bitmap(box);
      boxBitmap.x = 80 + i * 50;
      boxBitmap.y = 60 + i * 30;
      addChild(boxBitmap);
    }
  }
}