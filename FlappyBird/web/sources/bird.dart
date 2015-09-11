part of flappyBird;

class Bird extends Sprite implements Animatable
{
  int birdInJump = 0;

  int flyOffset  = 10;
  FlipBook flipbook;
  Bird()
  {
    var atlas = resourceManager.getTextureAtlas("bird");
   /* var bitmapData = atlas.getBitmapData("bird1");
    var bitmap = new Bitmap(bitmapData);
    bitmap.width = bitmap.width / 13;
    bitmap.height = bitmap.height / 13;
    this.addChild(bitmap);*/

    var bitmapDatas = atlas.getBitmapDatas("bird");
    flipbook = new FlipBook(bitmapDatas, 10);
    flipbook.play();
    flipbook.width = flipbook.width / 13;
    flipbook.height = flipbook.height / 13;

    /*this.graphics.beginPath();
    this.graphics.rectRound(0, 0,flipbook.width,flipbook.height, 0, 0);
    this.graphics.closePath();
    this.graphics.fillColor(Color.Beige);

    this.graphics.beginPath();
    this.graphics.circle(this.pivotX, this.pivotY, 2);
    this.graphics.closePath();
    this.graphics.fillColor(Color.Chocolate);

    applyCache(0, 0, width, height);*/

    this.addChild(flipbook);
    stage.juggler.add(flipbook);

  }

  bool advanceTime(num time) {
    if(this.birdInJump == 0)
    {
      if(y>stage.height-50)
      {
      }
      else
      {
        y = y + 2;
      }
    }
    return true;
  }


}