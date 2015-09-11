part of flappyBird;

class Game extends DisplayObjectContainer
{
  var subscriptionOnMouseClick;
  Bird bird;
  var ground;

  Game()
  {
    var background = new Bitmap(resourceManager.getBitmapData('background'));
    background.width = canvas.clientWidth;
    background.height = canvas.clientHeight;
    this.addChild(background);

    ground = new Ground();
    ground.y = canvas.clientHeight - this.ground.height;;
    this.addChild(ground);
    stage.juggler.add(ground);

    bird = new Bird();
    bird.pivotX = bird.width/2;
    bird.pivotY = bird.height/2;
    bird.x = canvas.clientWidth / 2;
    bird.y = canvas.clientHeight / 2;
    print(bird.y);
    this.addChild(bird);

    subscriptionOnMouseClick = this.onMouseClick.listen(start);
  }

  void start(MouseEvent event)
  {
    subscriptionOnMouseClick.cancel();
    this.onMouseDown.listen(jump);
    var tweenFall = new Tween(this.bird,0.5,Transition.easeInQuadratic);
    tweenFall.animate.rotation.to( math.PI / 8);
    stage.juggler.add(tweenFall);
    stage.juggler.add(this.bird);
  }

  void jump(MouseEvent event)
  {
    if(this.bird.y - (this.bird.height/2) >= 0) {
      // On note que l'oiseau est dans l'action jump
      this.bird.birdInJump=this.bird.birdInJump+1;
      // Saut
      this.bird.y = this.bird.y-20;

      // On ajoute l'animation de rotation quand l'oiseau saute
      var tweenJump = new Tween(this.bird,0.2,Transition.easeInQuadratic);
      tweenJump.animate.rotation.to( -math.PI / 8);
      tweenJump.onComplete = (){
        this.bird.birdInJump = this.bird.birdInJump - 1;
        if(this.bird.birdInJump==0) {
          var delayedAction = new DelayedCall(() {
            if (this.bird.birdInJump == 0) {
              var tweenFall = new Tween(this.bird, 0.5, Transition.easeInQuadratic);
              tweenFall.animate.rotation.to(math.PI / 2);
              stage.juggler.add(tweenFall);
            }
          }, 0.6);
          stage.juggler.add(delayedAction);
        }
      };
      stage.juggler.add(tweenJump);
    }
  }
}