part of flappyBird;

class Ground extends Sprite implements Animatable
{
  Ground()
  {
    var ground = new Bitmap(resourceManager.getBitmapData('ground'));
    ground.width = canvas.clientWidth * 2;
    ground.height =  ground.height/2;
    this.addChild(ground);
  }

  bool advanceTime(num time) {
    if(this.x + this.width / 2 <= 0) {
      this.x = 0;
    }
    else {
      this.x=this.x-1;
    }
    return true;
  }
}