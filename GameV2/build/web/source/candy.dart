part of games;

class Candy extends Sprite {
  final List<int> colors = [Color.Red, Color.Green, Color.Gold, Color.Brown];

  Bitmap _bitmap;
  num _width;
  num _height;
  int _color;
  bool selected = false;
  bool canSwitched = false;

  Candy(num width,num height){

    this._width = width;
    this._height = height;

    // add the candy to this Sprite
    var random = new math.Random();
    /*var bitmapData = new BitmapData(width, height, colors[random.nextInt(colors.length)]);
    //var bitmapData = resourceManager.getBitmapData(key);
    this._bitmap = new Bitmap(bitmapData);
    this._bitmap.x = x;
    this._bitmap.y = y;
    this.addChild(this._bitmap);*/

    /*this.pivotX = 50;
    this.pivotY = 50;*/
    this.scaleX = 1;
    this.scaleY = 1;


    this.graphics.beginPath();
    this.graphics.rectRound(6, 6, width-10, height-10, 8, 8);
    this.graphics.closePath();
    _color = colors[random.nextInt(colors.length)];
    this.graphics.fillColor(_color);
    this.graphics.strokeColor(_color, 4);


    // add mose event handlers
    this.useHandCursor = true;
    this.mouseChildren = false;
    //this.onMouseDown.listen(_keyDown);

    //this.onMouseUp.listen(_keyUp);
    this.onMouseOver.listen(_mouseOver);
    this.onMouseOut.listen(_mouseOut);

    applyCache(0, 0, width, height);
  }

  _mouseOver(MouseEvent me)
  {
  }

  _mouseOut(MouseEvent me)
  {
  }

  void select()
  {
    if(this.selected)return;
    this.selected = true;
    this.graphics.strokeColor(Color.BlueViolet, 4);
    applyCache(0, 0, _width, _height);
  }

  void deselect()
  {
    if(!this.selected)return;
    this.selected=false;
    this.graphics.strokeColor(this._color, 4);
    applyCache(0, 0, _width, _height);
  }

  void canSwitch(bool canSwitched)
  {
    this.canSwitched = canSwitched;
    if(this.canSwitched)
      this.graphics.strokeColor(Color.BlanchedAlmond, 4);
    else
      this.graphics.strokeColor(this._color, 4);
    applyCache(0, 0, _width, _height);
  }

  Tween animateChangePosition(num x, num y)
  {
    /*this.stage.juggler.addTween(this, 0.5, Transition.linear)
      ..animate.x.to(x)
      ..animate.y.to(y);*/

    var tween = new Tween(this, 0.2, Transition.linear);
    tween.animate.x.to(x);
    tween.animate.y.to(y);
    return tween;
    //tween.onStart = () => print('tween start');
    //tween.onComplete = () => onComplete();
    //this.stage.juggler.add(tween);
  }
  /*animateTo(num scale, num alpha,int color)
  {
    /*this.stage.juggler.removeTweens(this);
    this.stage.juggler.addTween(this, 0.25, Transition.easeOutQuadratic)
      ..animate.scaleX.to(scale)
      ..animate.scaleY.to(scale)
      ..animate.alpha.to(alpha);*/
  }*/

}